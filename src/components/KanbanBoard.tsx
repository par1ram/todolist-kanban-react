import Navbar from './Navbar'
import { CirclePlus } from 'lucide-react'
import { Column, Id, Task } from '../types'
import ColumnContainer from './ColumnContainer'
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { useState, useMemo } from 'react'
import TaskCard from './TaskCard'

export default function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>([])
	const [tasks, setTasks] = useState<Task[]>([])

	const columnsId = useMemo(() => columns.map((el) => el.id), [columns])

	const [activeColumn, setActiveColumn] = useState<Column | null>(null)
	const [activeTask, setActiveTask] = useState<Task | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 1,
			},
		})
	)

	const generateId = () => {
		return Math.floor(Math.random() * 10000)
	}

	const createNewColumn = () => {
		const newColumn: Column = {
			id: generateId(),
			title: `Column ${columns.length + 1}`,
		}
		setColumns([...columns, newColumn])
	}

	const deleteColumn = (id: Id) => {
		setColumns((prevColumns) => {
			return prevColumns.filter((col) => col.id !== id)
		})

		const newTasks = tasks.filter((t) => t.columnId !== id)
		setTasks(newTasks)
	}

	const updateColumn = (id: Id, title: string) => {
		const newColumns = columns.map((col) => {
			if (col.id !== id) return col
			return { ...col, title }
		})

		setColumns(newColumns)
	}

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.column)
			return
		}

		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task)
			return
		}
	}

	const onDragEnd = (event: DragEndEvent) => {
		setActiveColumn(null)
		setActiveTask(null)

		const { active, over } = event
		if (!over) return

		const activeColumnId = active.id
		const overColumnId = over.id

		if (activeColumnId === overColumnId) return

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(col) => col.id === activeColumnId
			)

			const overColumnIndex = columns.findIndex(
				(col) => col.id === overColumnId
			)

			return arrayMove(columns, activeColumnIndex, overColumnIndex)
		})
	}

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return

		const isActiveTask = active.data.current?.type === 'Task'
		const isOverTask = over.data.current?.type === 'Task'

		if (!isActiveTask) return

		if (isActiveTask && isOverTask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId)
				const overIndex = tasks.findIndex((t) => t.id === overId)

				tasks[activeIndex].columnId = tasks[overIndex].columnId

				return arrayMove(tasks, activeIndex, overIndex)
			})
		}

		// Если другая колонка пустая
		const isOverColumn = over.data.current?.type === 'Column'

		if (isActiveTask && isOverColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId)

				tasks[activeIndex].columnId = overId

				return arrayMove(tasks, activeIndex, activeIndex)
			})
		}
	}

	const createTask = (columnId: Id) => {
		const newTask: Task = {
			id: generateId(),
			columnId,
			content: `Task ${tasks.length - 1}`,
		}

		setTasks([...tasks, newTask])
	}

	const deleteTask = (id: Id) => {
		const newTasks = tasks.filter((task) => task.id !== id)
		setTasks(newTasks)
	}

	const updateTask = (id: Id, content: string) => {
		const newTasks = tasks.map((task) => {
			if (task.id !== id) return task
			return { ...task, content }
		})

		setTasks(newTasks)
	}

	return (
		<div className='bg-stone-900'>
			<div>
				<Navbar />
			</div>

			<div className='m-auto flex items-center min-h-screen w-full px-20 overflow-y-hidden overflow-x-auto'>
				<DndContext
					sensors={sensors}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					onDragOver={onDragOver}
				>
					<div className='m-auto flex gap-4'>
						<div className='flex gap-4'>
							<SortableContext items={columnsId}>
								{columns.map((el) => (
									<ColumnContainer
										key={el.id}
										column={el}
										deleteColumn={() => deleteColumn(el.id)}
										updateColumn={updateColumn}
										createTask={() => createTask(el.id)}
										tasks={tasks.filter((task) => task.columnId === el.id)}
										deleteTask={deleteTask}
										updateTask={updateTask}
									/>
								))}
							</SortableContext>
						</div>

						{/* ADD COLUMN */}
						<button
							onClick={() => createNewColumn()}
							className='flex justify-between items-center h-16 p-2 w-64 min-w-64 border border-solid border-stone-600 rounded-lg ring-rose-300 hover:ring-2 bg-stone-800'
						>
							<span className='text-xl font-bold'>Add column</span>
							<CirclePlus size={30} />
						</button>
					</div>

					{/* OVERLAY */}
					{createPortal(
						<DragOverlay>
							{activeColumn && (
								<ColumnContainer
									column={activeColumn}
									deleteColumn={() => deleteColumn(activeColumn.id)}
									updateColumn={updateColumn}
									createTask={createTask}
									tasks={tasks.filter(
										(task) => task.columnId === activeColumn.id
									)}
									deleteTask={deleteTask}
									updateTask={updateTask}
								/>
							)}
							{activeTask && (
								<TaskCard
									task={activeTask}
									deleteTask={deleteTask}
									updateTask={updateTask}
								/>
							)}
						</DragOverlay>,
						document.body
					)}
				</DndContext>
			</div>
		</div>
	)
}
