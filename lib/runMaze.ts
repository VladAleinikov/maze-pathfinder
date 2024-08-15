import { binaryTree } from "./algorithms/maze/binary-tree";
import { MazeType, SpeedType, TileType } from "./types";
import { GridType } from '@/lib/types';

export const runMaze = async (
  maze: MazeType,
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
) => {
  switch (maze) {
    case MazeType.BINARY_TREE:
      await binaryTree(grid, startTile, endTile, speed);
      break;

    default:
      break;
  }
};