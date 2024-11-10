import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className='flex justify-center bg-stone-900'>
			<div className='flex gap-4 bg-stone-800 p-2 rounded-b-xl font-bold border-b border-r border-l border-solid border-stone-700'>
				<Link to='/' className=' hover:opacity-50 transition-opacity'>
					To-Do list
				</Link>
				<Link to='/kanban' className='hover:opacity-50 transition-opacity'>
					Kanban
				</Link>
			</div>
		</div>
	)
}
