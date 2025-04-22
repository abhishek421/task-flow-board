
import React from "react";

interface Board {
  id: string;
  name: string;
}

interface BoardSwitcherProps {
  boards: Board[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const BoardSwitcher: React.FC<BoardSwitcherProps> = ({
  boards,
  selectedId,
  onChange,
}) => {
  return (
    <select
      value={selectedId}
      onChange={e => onChange(e.target.value)}
      className="rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-300 px-3 py-2 text-base font-medium bg-white"
    >
      {boards.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
};
