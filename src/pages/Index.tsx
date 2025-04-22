
import React, { useState, useEffect } from "react";
import { BoardSwitcher } from "../components/BoardSwitcher";
import { KanbanBoard } from "../components/KanbanBoard";
import { getBoards } from "../components/api";

export default function Index() {
  const [boards, setBoards] = useState<{ id: string; name: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
      if (data.length > 0) setSelectedBoard(data[0].id);
    });
  }, []);

  if (!selectedBoard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F0FB]">
        <div className="text-2xl text-gray-700 mb-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F0FB] min-h-screen w-full md:px-0 px-3 py-10">
      <div className="mb-8 px-4 flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <span className="text-lg font-bold text-[#8B5CF6]">Boards</span>
        <BoardSwitcher
          boards={boards}
          selectedId={selectedBoard}
          onChange={setSelectedBoard}
        />
      </div>
      <div className="container max-w-7xl mx-auto">
        <KanbanBoard boardId={selectedBoard} />
      </div>
    </div>
  );
}
