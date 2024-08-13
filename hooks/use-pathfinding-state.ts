import { END_TILE, START_TILE } from "@/lib/constants";
import { AlgorithmType, GridType, MazeType } from "@/lib/types";
import { createGrid } from "@/lib/utils";
import { create } from "zustand";

interface PathfindingStateStore {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  maze: MazeType;
  setMaze: (maze: MazeType) => void;
  grid: GridType;
  setGrid: (grid: GridType) => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

export const usePathfindingState = create<PathfindingStateStore>((set) => ({
  algorithm: AlgorithmType.WALL_FOLLOWER,
  setAlgorithm: (algorithm: AlgorithmType) => set({algorithm}),
  maze: MazeType.NONE,
  setMaze: (maze: MazeType) => set({maze}),
  grid: createGrid(START_TILE, END_TILE),
  setGrid: (grid: GridType) => set({grid}),
  isGraphVisualized: false,
  setIsGraphVisualized: (isGraphVisualized: boolean) => set({isGraphVisualized}),
}))