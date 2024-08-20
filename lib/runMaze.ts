import { binaryTree } from "./algorithms/maze/binary-tree";
import { ellersAlgorithm } from "./algorithms/maze/ellers-algorithm";
import { sidewinder } from "./algorithms/maze/sidewinder";
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
    case MazeType.SIDEWINDER:
      await sidewinder(grid, startTile, endTile, speed);
    case MazeType.ELLERS_ALGORITHM:
      await ellersAlgorithm(grid, startTile, endTile, speed);
    default:
      break;
  }
};