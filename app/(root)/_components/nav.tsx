import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { usePathfindingState } from "@/hooks/use-pathfinding-state";
import { useSpeed } from "@/hooks/use-speed";
import { useTileState } from "@/hooks/use-tile-state";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "@/lib/constants";
import { runPathfindingAlgorithm } from "@/lib/run-pathfinding-algorithm";
import { runMaze } from "@/lib/run-maze";
import { AlgorithmType, MazeType, SpeedType } from "@/lib/types";
import { createGrid } from "@/lib/utils";
import { MutableRefObject, useState } from "react";
import { animatePath } from "@/lib/animate-path";

interface NavProps {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

export const Nav = ({ isVisualizationRunningRef }: NavProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    setIsGraphVisualized,
    isGraphVisualized,
  } = usePathfindingState();
  const { algorithm, setAlgorithm } = usePathfindingState();
  const { startTile, endTile } = useTileState();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = async (newMaze: MazeType) => {
    setMaze(newMaze);
    setGrid(createGrid(startTile, endTile));

    if (newMaze === MazeType.NONE) {
      return;
    }

    setIsDisabled(true);
    await runMaze(newMaze, grid, startTile, endTile, speed);
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
    setIsDisabled(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      setGrid(createGrid(startTile, endTile));
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm(
      algorithm,
      grid,
      startTile,
      endTile
    );

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    const delay =
      SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
      EXTENDED_SLEEP_TIME *
        (path.length + 60) *
      SPEEDS.find((s) => s.value === speed)!.value;
    
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(false);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, delay);
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
          <Select
            label="Поиск пути"
            value={algorithm}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            disabled={isDisabled}
          />
          <Select
            label="Скорость"
            value={speed}
            options={SPEEDS}
            onChange={(e) => setSpeed(parseFloat(e.target.value) as SpeedType)}
            disabled={isDisabled}
          />
          <Button
            disabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            onClick={handleRunVisualizer}
          />
        </div>
      </div>
    </div>
  );
};
