import { Eraser } from 'lucide-react'
import { Id, Task } from '../types'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskCardProps {
	task: Task
	deleteTask: (id: Id) => void
	updateTask: (id: Id, content: string) => void
}

export default function TaskCard({
	task,
	deleteTask,
	updateTask,
}: TaskCardProps) {
	const [mouseIsOver, setMouseIsOver] = useState(false)
	const [editMode, setEditMode] = useState(false)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: 'Task',
			task,
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
				className='font-bold text-sm min-h-24 max-h-24 flex relative cursor-grab border-2 border-rose-300 p-2 rounded-lg'
			></div>
		)
	}

	const toggleEditMode = () => {
		setEditMode((prev) => !prev)
		setMouseIsOver(false)
	}

	if (editMode) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				className='relative cursor-grab hover:ring-2 hover:ring-inset ring-rose-300 border border-stone-600 p-2 rounded-lg'
			>
				<textarea
					autoFocus
					value={task.content}
					onBlur={() => toggleEditMode()}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && e.shiftKey) toggleEditMode()
					}}
					onChange={(e) => updateTask(task.id, e.target.value)}
					className='text-sm font-bold bg-transparent min-h-[72px] h-full w-full resize-none border-none rounded-lg focus:outline-none'
				></textarea>
			</div>
		)
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={() => toggleEditMode()}
			onMouseEnter={() => setMouseIsOver(true)}
			onMouseLeave={() => setMouseIsOver(false)}
			className='font-bold text-sm min-h-24 max-h-24 flex relative cursor-grab hover:ring-2 hover:ring-inset ring-rose-300 border border-stone-600 p-2 rounded-lg'
		>
			<p className='h-full w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
				{task.content}
			</p>
			{mouseIsOver && (
				<button onClick={() => deleteTask(task.id)}>
					<Eraser
						size={20}
						color='pink'
						className='hover:opacity-100 opacity-50 transition-opacity bg-transparent absolute -translate-y-1/2 right-5'
					/>
				</button>
			)}
		</div>
	)
}
