# TodoList Kanban React

## Todo List Screenshot
<img src="./assets/todolist.png" width="300" height="500"/>

## Kanban Screenshot
<img src="./assets/kanban.png" width="500" height="500"/>

A Kanban-style and todo list application built with React, allowing users to manage tasks in both a traditional todo list and a Kanban board view.

## Features

*   **Todo List View:**
    *   Create, edit, and delete tasks.
    *   Mark tasks as complete.
    *   Automatically sorts completed tasks to the bottom.
    *   Persists data to local storage.

*   **Kanban Board View:**
    *   Create, edit, and delete tasks within columns.
    *   Create, delete, and rename columns.
    *   Drag and drop tasks between columns.
    *   Drag and drop columns to reorder the board.


## Getting Started

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2.  Install dependencies:
    ```bash
    cd todolist-kanban-react
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

*   `src/`: Contains the source code for the application.
    *   `components/`: React components.
        *   `KanbanBoard.tsx`: The Kanban board component.
        *   `ColumnContainer.tsx`:  Manages individual columns on the Kanban board.
        *   `TaskCard.tsx`: Represents a single task on the Kanban board.
        *   `Todo.tsx`: The traditional todo list component.
        *   `TodoItems.tsx`:  Represents a single task in the todo list.
        *   `Navbar.tsx`:  Navigation between views.

    *   `types.ts`: Type definitions.
    *   `App.tsx`: Main application component.
*   `vite.config.ts`: Vite configuration file.
*   `vite-env.d.ts`: Vite environment type declarations.

## Data Persistence

*   **Todo List:**  Uses local storage to persist tasks. Data is saved automatically whenever the todo list changes.
*   **Kanban Board:** Currently, *no* persistence mechanism is implemented for the Kanban board.  Data will be lost on page refresh.  This is a key area for future improvement.

## Technologies Used

*   React
*   TypeScript
*   Vite
*   Lucide React (for icons)
*   dnd-kit (for drag and drop functionality)
