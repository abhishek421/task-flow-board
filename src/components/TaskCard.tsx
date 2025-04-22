
import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  // Style for completed tasks
  const isDone =
    (task.status?.toLowerCase?.() ?? "") === "done" ||
    (task.status?.toUpperCase?.() ?? "") === "DONE";

  return (
    <div
      className={
        "rounded-lg shadow border mb-3 p-4 flex flex-col min-h-[60px] animate-fade-in hover-scale relative bg-white" +
        (isDone
          ? " bg-[#F2FCE2] border-green-200 text-[#8E9196] line-through"
          : "")
      }
    >
      <div className="flex justify-between items-center gap-2">
        <span className={`font-medium text-gray-900 ${isDone ? "text-[#8E9196]" : ""}`}>{task.title}</span>
        <div className="flex gap-1 opacity-80">
          {onEdit && (
            <button
              onClick={onEdit}
              className="rounded p-1 hover:bg-gray-100"
              title="Edit Task"
              type="button"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded p-1 hover:bg-gray-100"
              title="Delete Task"
              type="button"
            >
              <Trash2 size={16} className="text-orange-500" />
            </button>
          )}
        </div>
      </div>
      {task.description && (
        <span className="text-sm mt-1 text-gray-500">{task.description}</span>
      )}
    </div>
  );
};
