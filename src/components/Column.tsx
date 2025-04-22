
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface ColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({
  columnId,
  title,
  tasks,
  onEditTask,
  onDeleteTask,
}) => (
  <div className="flex flex-col bg-[#F1F0FB] rounded-lg p-3 min-w-[270px] max-w-xs shadow-sm">
    <h2 className="font-semibold text-lg mb-3 px-1 text-gray-700">{title}</h2>
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            "flex-1 min-h-[60px] transition-all" +
            (snapshot.isDraggingOver ? " bg-purple-100" : "")
          }
        >
          {tasks.map((task, index) => (
            <Draggable draggableId={task.id} index={index} key={task.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  className="mb-2"
                >
                  <TaskCard
                    task={task}
                    onEdit={() => onEditTask && onEditTask(task)}
                    onDelete={() => onDeleteTask && onDeleteTask(task)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);
