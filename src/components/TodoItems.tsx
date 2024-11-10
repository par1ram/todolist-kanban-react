import { Circle, CircleCheck, Trash } from 'lucide-react'

interface TodoItemsProps {
	text: string | undefined
	isComplete: boolean
	deleteTodo: () => void
	toggle: () => any
}

export default function TodoItems({
	text,
	isComplete,
	deleteTodo,
	toggle,
}: TodoItemsProps) {
	return (
		<div className='w-full flex my-2 justify-between items-center'>
			<button
				className='flex justify-start items-center px-6 gap-2'
				onClick={toggle}
			>
				{isComplete ? <CircleCheck /> : <Circle />}
				<p className={`${isComplete ? `line-through` : `font-semibold`}`}>
					{text}
				</p>
			</button>
			<Trash
				size={20}
				onClick={deleteTodo}
				className='cursor-pointer mr-6 hover:opacity-50 transition-opacity'
			/>
		</div>
	)
}
