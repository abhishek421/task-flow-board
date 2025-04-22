
/**
 * Simple API utility to fetch boards and tasks from user backend.
 * Make sure to set `VITE_API_BASE_URL` in your .env for CORS proxy if needed.
 */
const BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function getBoards() {
  const res = await fetch(`${BASE}/api/boards`);
  if (!res.ok) throw new Error("Failed to fetch boards");
  return res.json();
}

export async function getBoard(boardId: string) {
  const res = await fetch(`${BASE}/api/boards/${boardId}`);
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
}

export async function getTasks(boardId: string) {
  const res = await fetch(`${BASE}/api/tasks/board/${boardId}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(data: any) {
  const res = await fetch(`${BASE}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: string, data: any) {
  const res = await fetch(`${BASE}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}
