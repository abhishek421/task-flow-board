
import React, { useState } from "react";
import { createTask } from "./api";

interface AddTaskModalProps {
  isOpen: boolean;
  boardId: string;
  columnOptions: { id: string; name: string }[];
  onClose: () => void;
  onTaskAdded: (task: any) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  boardId,
  columnOptions,
  onClose,
  onTaskAdded,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(columnOptions[0]?.id || "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const task = await createTask({
      title,
      description,
      status,
      boardId,
    });
    onClose();
    setTitle("");
    setDescription("");
    setStatus(columnOptions[0]?.id || "");
    onTaskAdded(task);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-30 inset-0 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow-lg p-7 w-[96vw] max-w-[350px]"
      >
        <h2 className="text-lg font-semibold mb-5">Add New Task</h2>
        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="task-title" className="text-sm text-gray-600">Title</label>
          <input
            type="text"
            id="task-title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded px-3 py-2 text-md"
            autoFocus
          />
        </div>
        <div className="mb-3 flex flex-col gap-1">
          <label className="text-sm text-gray-600">Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border rounded px-3 py-2 text-md"
          />
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="status" className="text-sm text-gray-600">Column</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {columnOptions.map(col =>
              <option key={col.id} value={col.id}>{col.name}</option>
            )}
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 font-medium"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
