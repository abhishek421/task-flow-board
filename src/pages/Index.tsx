import React, { useState, useEffect } from "react";
import { BoardSwitcher } from "../components/BoardSwitcher";
import { KanbanBoard } from "../components/KanbanBoard";
import { CreateBoardModal } from "../components/CreateBoardModal";
import { getBoards, deleteBoard } from "../components/api";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "../components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Index() {
  const [boards, setBoards] = useState<{ id: string; name: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

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

  // Simple edit handler
  const handleEditBoard = (boardId: string) => {
    alert(`Edit board: ${boardId}`);
  };

  // Delete board handler with confirmation dialog
  const openDeleteConfirmation = (boardId: string) => {
    setBoardToDelete(boardId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBoard = async () => {
    if (!boardToDelete) return;
    
    try {
      // Delete from backend
      await deleteBoard(boardToDelete);
      
      // Update UI
      const newBoards = boards.filter((b) => b.id !== boardToDelete);
      setBoards(newBoards);
      
      // If deleted the selected board, select another one
      if (boardToDelete === selectedBoard) {
        setSelectedBoard(newBoards.length > 0 ? newBoards[0].id : "");
      }
      
      toast.success("Board deleted successfully");
    } catch (error) {
      toast.error("Failed to delete board");
      console.error("Delete board error:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setBoardToDelete(null);
    }
  };

  const selectedBoardObj = boards.find((b) => b.id === selectedBoard);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#F1F0FB]">
        <AppSidebar
          boards={boards}
          selectedBoardId={selectedBoard}
          onBoardSelect={setSelectedBoard}
        />
        <SidebarInset>
          <SidebarTrigger className="m-3" />
          <div className="w-full md:px-0 px-3 py-10">
            <div className="mb-8 px-4 flex flex-col md:flex-row items-center gap-3 md:gap-5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {selectedBoardObj && (
                    <>
                      <BreadcrumbSeparator>
                        <ChevronRight size={15} />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedBoardObj.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
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
              {selectedBoardObj && (
                <div className="flex gap-1 ml-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEditBoard(selectedBoardObj.id)}
                    title="Edit Board"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openDeleteConfirmation(selectedBoardObj.id)}
                    title="Delete Board"
                  >
                    <Trash2 className="w-4 h-4 text-orange-500" />
                  </Button>
                </div>
              )}
            </div>
            <div className="container max-w-7xl mx-auto">
              {selectedBoard ? (
                <KanbanBoard
                  boardId={selectedBoard}
                  onEditTask={(task) => alert("Edit Task: " + task.title)}
                  onDeleteTask={(task) => console.log("Delete Task: " + task.title)}
                />
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

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the board and all its tasks. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteBoard} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
