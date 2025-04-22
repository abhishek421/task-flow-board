# Task Management App - Backend

This is the backend for the Task Management application, built with Node.js, Express, and PostgreSQL with Prisma ORM.

## API Endpoints

### Boards

- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a board by ID (includes tasks)
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Tasks

- `GET /api/tasks/board/:boardId` - Get all tasks for a board
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Setup

1. Set up a PostgreSQL database and update the DATABASE_URL in the .env file
2. Install dependencies: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. Create database tables: `npx prisma migrate dev --name init`
5. Start development server: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanagement?schema=public"
PORT=5000
```

Replace username, password, and other parameters as needed.
