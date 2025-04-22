
import React from "react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
  };
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="rounded-lg bg-white shadow border mb-3 p-4 flex flex-col min-h-[60px] animate-fade-in hover-scale">
      <span className="font-medium text-gray-900">{task.title}</span>
      {task.description && (
        <span className="text-sm mt-1 text-gray-500">{task.description}</span>
      )}
    </div>
  );
};
