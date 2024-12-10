# TodoList Kanban React

A simple Kanban-style todo list application built with React, allowing users to manage tasks in both a traditional todo list and a Kanban board view.

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

## Future Enhancements

*   **Kanban Board Persistence:** Implement data persistence for the Kanban board (e.g., local storage, backend integration).
*   **Task Details:** Add more detailed information to tasks (descriptions, due dates, subtasks, assignees).
*   **User Authentication:** Allow users to log in and manage their own boards and tasks.
*   **Improved Styling and UI/UX:** Enhance the visual appeal and user experience.
*   **Collaboration Features:**  Enable multiple users to collaborate on boards.


## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
