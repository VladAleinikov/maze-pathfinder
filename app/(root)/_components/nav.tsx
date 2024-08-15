import { Select } from "@/components/ui/select";
import { usePathfindingState } from "@/hooks/use-pathfinding-state";
import { useSpeed } from "@/hooks/use-speed";
import { useTileState } from "@/hooks/use-tile-state";
import { MAZES } from "@/lib/constants";
import { runMaze } from "@/lib/runMaze";
import { MazeType } from "@/lib/types";
import { createGrid } from "@/lib/utils";
import { useState } from "react";

export const Nav = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { maze, setMaze, grid, setGrid, setIsGraphVisualized } =
    usePathfindingState();
  const { startTile, endTile } = useTileState();
  const { speed } = useSpeed();

  const handleGenerateMaze = async (newMaze: MazeType) => {
    setMaze(newMaze);

    if (newMaze === MazeType.NONE) {
      setGrid(createGrid(startTile, endTile));
      return;
    }

    setIsDisabled(true);
    await runMaze(newMaze, grid, startTile, endTile, speed);
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
    setIsDisabled(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[25rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1 ">
          Maze Pathfinding
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Лабиринт"
            value={maze}
            options={MAZES}
            onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};
