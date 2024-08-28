import { wallFollower } from "./algorithms/pathfinding/wall-follower";
import { AlgorithmType, GridType, TileType } from "./types";

export const runPathfindingAlgorithm = (
  algorithm: AlgorithmType,
  grid: GridType,
  startTile: TileType,
  endTile: TileType
): { traversedTiles: TileType[]; path: TileType[] }  => {
  switch (algorithm) {
    case AlgorithmType.WALL_FOLLOWER:
      return wallFollower(grid, startTile, endTile);
  
    default:
      return wallFollower(grid, startTile, endTile);
  }
}