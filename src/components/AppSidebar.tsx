
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  boards: { id: string; name: string }[];
  selectedBoardId: string;
  onBoardSelect: (id: string) => void;
}

export function AppSidebar({ boards, selectedBoardId, onBoardSelect }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-4">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=40&q=80"
            alt="App Logo"
            className="w-10 h-10 rounded mr-3"
          />
          <span className="text-lg font-bold">
            KanBan for <span className="text-purple-600">Argon.ai</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Boards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton
                    isActive={board.id === selectedBoardId}
                    onClick={() => onBoardSelect(board.id)}
                  >
                    <span>{board.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
