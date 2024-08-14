import { MAX_ROWS, TILE_STYLE } from "@/lib/constants";
import { TileType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TileProps extends TileType {
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseEnter: () => void;
}

export const Tile = ({ row, col, state, handleMouseDown, handleMouseEnter, handleMouseUp }: TileProps) => {
  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";
  const tyleStyle = TILE_STYLE[state];
  return (
    <div
      className={cn(tyleStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    />
  );
};
