import { usePathfindingState } from "@/hooks/use-pathfinding-state";
import { MAX_ROWS } from "@/lib/constants";
import { checkIfStartOrEnd, cn, createNewGrid } from "@/lib/utils";
import { Tile } from "./tile";
import { MutableRefObject, useState } from "react";

interface GridProps {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

export const Grid = ({ isVisualizationRunningRef }: GridProps) => {
  const { grid, setGrid } = usePathfindingState();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);

    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center mt-4 border-sky-300 ",
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        `lg:w-[${MAX_ROWS * 17}px] md:w-[${MAX_ROWS * 15}px] xs:w-[${
          MAX_ROWS * 8
        }px] w-[${MAX_ROWS * 7}px]`
      )}
    >
      {grid.map((row, id) => (
        <div key={id} className="flex">
          {row.map((tile, tileId) => (
            <Tile
              key={tileId}
              {...tile}
              handleMouseDown={()=>handleMouseDown(tile.row, tile.col)}
              handleMouseEnter={()=>handleMouseEnter(tile.row, tile.col)}
              handleMouseUp={()=>handleMouseUp(tile.row, tile.col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
