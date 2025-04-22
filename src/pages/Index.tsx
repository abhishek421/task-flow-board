
import React, { useState, useEffect } from "react";
import { BoardSwitcher } from "../components/BoardSwitcher";
import { KanbanBoard } from "../components/KanbanBoard";
import { CreateBoardModal } from "../components/CreateBoardModal";
import { getBoards } from "../components/api";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Index() {
  const [boards, setBoards] = useState<{ id: string; name: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
      if (data.length > 0) setSelectedBoard(data[0].id);
    });
  }, []);

  const handleBoardCreated = (newBoard: any) => {
    setBoards([...boards, newBoard]);
    setSelectedBoard(newBoard.id);
  };

  return (
    <div className="bg-[#F1F0FB] min-h-screen w-full md:px-0 px-3 py-10">
      <div className="mb-8 px-4 flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <span className="text-lg font-bold text-[#8B5CF6]">Boards</span>
        {boards.length > 0 && (
          <BoardSwitcher
            boards={boards}
            selectedId={selectedBoard}
            onChange={setSelectedBoard}
          />
        )}
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="ml-auto"
          size="sm"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Create Board
        </Button>
      </div>
      <div className="container max-w-7xl mx-auto">
        {selectedBoard ? (
          <KanbanBoard boardId={selectedBoard} />
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 bg-white p-10 rounded-lg shadow max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">No Boards Found</h2>
            <p className="text-gray-600 mb-6 text-center">
              You don't have any boards yet. Create your first board to get started.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Your First Board
            </Button>
          </div>
        )}
      </div>
      <CreateBoardModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onBoardCreated={handleBoardCreated}
      />
    </div>
  );
}
