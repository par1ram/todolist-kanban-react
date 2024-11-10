import { ListTodo, CirclePlus } from 'lucide-react'
import TodoItems from './TodoItems'
import { useEffect, useRef, useState } from 'react'

interface Todo {
	id: number
	text: string | undefined
	isComplete: boolean
}

export default function Todo() {
	const [todoList, setTodolist] = useState<Todo[]>(() => {
		// Проверка на клиентский компонент
		if (typeof window !== 'undefined') {
			const storedTodos = localStorage.getItem('todos')
			return storedTodos ? (JSON.parse(storedTodos) as Todo[]) : []
		}
		return []
	})

	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todoList))
	}, [todoList])

	const addTodo = () => {
		const inputText = inputRef.current?.value.trim()

		if (!inputRef.current?.value) return

		const newTodo: Todo = {
			id: Date.now(),
			text: inputText,
			isComplete: false,
		}

		setTodolist((prev) => [...prev, newTodo])
		inputRef.current.value = ''
	}

	const deleteTodo = (id: number) => {
		setTodolist((prevTodos) => {
			return prevTodos.filter((el) => el.id !== id)
		})
	}

	const toggle = (id: number) => {
		setTodolist((prevTodos) => {
			return prevTodos.map((el) => {
				if (el.id === id) {
					return { ...el, isComplete: !el.isComplete }
				}
				return el
			})
		})
	}

	const sortTodoList = () => {
		const sortedList = [...todoList].sort((a, b) => {
			return Number(b.isComplete) - Number(a.isComplete)
		})
		setTodolist(sortedList)
	}

	return (
		<div className='max-w-md place-self-center flex flex-col items-center p-6 w-full min-h-[600px] rounded-2xl border border-solid border-stone-700 bg-stone-800'>
			<div className='flex items-center gap-2'>
				<ListTodo size={35} />
				<h1 className='text-3xl font-bold'>To-Do list</h1>
				<button
					onClick={() => sortTodoList()}
					className='font-bold rounded-2xl border border-solid border-stone-600 p-2 hover:bg-stone-600 transition-colors'
				>
					sort
				</button>
			</div>

			<div className='flex items-center justify-between w-11/12 bg-stone-700 my-4 rounded-2xl border border-solid border-stone-600'>
				<input
					ref={inputRef}
					type='text'
					placeholder='Добавьте задачу'
					className='w-full bg-transparent outline-none p-2 rounded-2xl mr-2'
				/>
				<button
					onClick={() => addTodo()}
					className='p-2 hover:opacity-50 transition-opacity'
				>
					<CirclePlus />
				</button>
			</div>

			<div className='w-full'>
				{todoList.map((el, index) => (
					<TodoItems
						key={index}
						text={el.text}
						isComplete={el.isComplete}
						deleteTodo={() => deleteTodo(el.id)}
						toggle={() => toggle(el.id)}
					/>
				))}
			</div>
		</div>
	)
}
