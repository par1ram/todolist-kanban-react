import './App.css'
import Todo from './components/Todo'
import Navbar from './components/Navbar'

function App() {
	return (
		<>
			<div>
				<Navbar />
			</div>
			<div className='grid bg-stone-900 min-h-screen'>
				<Todo />
			</div>
		</>
	)
}

export default App
