
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./Column";
import { AddTaskModal } from "./AddTaskModal";
import { getBoard, getTasks, updateTask } from "./api";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface ColumnInfo {
  id: string;
  name: string;
}

interface BoardData {
  id: string;
  name: string;
  columns: ColumnInfo[];
  // (possibly more)
}

interface KanbanBoardProps {
  boardId: string;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  boardId,
  onEditTask,
  onDeleteTask,
}) => {
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Board info and columns
  useEffect(() => {
    getBoard(boardId).then(board => {
      setColumns(board.columns ?? [
        { id: "todo", name: "To Do" },
        { id: "inprogress", name: "In Progress" },
        { id: "done", name: "Done" },
      ]);
    });
  }, [boardId]);

  // Fetch tasks
  useEffect(() => {
    getTasks(boardId).then(setTasks);
  }, [boardId]);

  const tasksByColumn = columns.reduce<Record<string, Task[]>>((acc, col) => {
    acc[col.id] = [];
    return acc;
  }, {});
  for (const t of tasks) {
    if (tasksByColumn[t.status]) tasksByColumn[t.status].push(t);
    else {
      // Unrecognized status: add to first column
      tasksByColumn[columns[0]?.id || "todo"]?.push(t);
    }
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const movedTask = tasks.find((t) => t.id === draggableId);
    if (!movedTask) return;

    // Update UI optimistically
    let newTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(newTasks);

    // Update backend
    await updateTask(draggableId, { ...movedTask, status: destination.droppableId });
  };

  const handleTaskAdded = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition font-semibold"
        >
          + Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((col) => (
            <Column
              key={col.id}
              columnId={col.id}
              title={col.name}
              tasks={tasksByColumn[col.id] || []}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>
      <AddTaskModal
        isOpen={showModal}
        boardId={boardId}
        columnOptions={columns}
        onClose={() => setShowModal(false)}
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
};
