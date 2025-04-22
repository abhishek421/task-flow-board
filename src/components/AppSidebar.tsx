
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutList } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Board {
  id: string;
  name: string;
  [key: string]: any;
}

interface AppSidebarProps {
  boards: Board[];
  selectedBoardId?: string;
  onBoardSelect: (id: string) => void;
}

export function AppSidebar({ boards, selectedBoardId, onBoardSelect }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="font-semibold text-sm">Boards</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton
                    isActive={board.id === selectedBoardId}
                    onClick={() => onBoardSelect(board.id)}
                  >
                    <span>
                      <LayoutList
                        size={18}
                        className="inline-block mr-2 align-middle"
                      />
                      {board.name}
                    </span>
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
