import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import KanbanBoard from './components/KanbanBoard.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/kanban',
		element: <KanbanBoard />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
