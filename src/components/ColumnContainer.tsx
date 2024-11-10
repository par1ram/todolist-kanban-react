import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, Id, Task } from '../types'
import { CirclePlus, Grip, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
import TaskCard from './TaskCard'

interface ColumnContainerProps {
	column: Column
	tasks: Task[]
	deleteColumn: () => void
	updateColumn: (id: Id, title: string) => void
	createTask: (columnId: Id) => void
	deleteTask: (id: Id) => void
	updateTask: (id: Id, content: string) => void
}

export default function ColumnContainer({
	column,
	tasks,
	deleteColumn,
	updateColumn,
	createTask,
	deleteTask,
	updateTask,
}: ColumnContainerProps) {
	const [editMode, setEditMode] = useState(false)

	const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: 'Column',
			column,
		},
		disabled: editMode,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='ring-rose-300 ring-2 bg-opacity-50 flex flex-col w-64 h-[468px] p-2 bg-stone-800 rounded-lg'
			></div>
		)
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='flex flex-col w-64 bg-stone-800 border-2 border-solid border-stone-600 rounded-lg'
		>
			{/* TITLE */}
			<div
				onClick={() => setEditMode(true)}
				{...attributes}
				{...listeners}
				className='h-10 flex justify-between items-center font-bold bg-stone-700 p-2 rounded-md border-b-2 border-solid border-stone-600 rounded-b-none'
			>
				<div className='flex items-center'>
					<Grip size={18} className='mr-1 opacity-50' />
					{!editMode && column.title}
					{editMode && (
						<input
							value={column.title}
							onChange={(e) => updateColumn(column.id, e.target.value)}
							autoFocus
							onBlur={() => setEditMode(false)}
							onKeyDown={(e) => {
								if (e.key !== 'Enter') return
								setEditMode(false)
							}}
							className='bg-transparent focus:border-rose-300 border rounded-lg outline-none px-1 mx-auto w-[85%]'
						/>
					)}
				</div>

				<button
					onClick={deleteColumn}
					className='opacity-50 hover:opacity-100 transition-opacity'
				>
					<Trash size={20} />
				</button>
			</div>

			{/* TASKS CONTAINER */}
			<div className='p-2 h-96 flex flex-col gap-2 overflow-x-hidden overflow-y-autox'>
				<SortableContext items={tasksIds}>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							deleteTask={deleteTask}
							updateTask={updateTask}
						/>
					))}
				</SortableContext>
			</div>

			{/* ADD TASK */}
			<button
				onClick={() => createTask(column.id)}
				className='hover:bg-stone-700 transition-colors h-10 flex items-center justify-between p-2 rounded-t-none rounded-md border-t-2 border-solid border-stone-600 '
			>
				<span className='font-bold'>Add task</span>
				<CirclePlus />
			</button>
		</div>
	)
}
