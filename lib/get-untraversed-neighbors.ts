import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileStates, TileType } from "./types";

export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
  const { row, col } = tile;
  const neighbors = [];

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col -1]);
  }
  if (row < MAX_ROWS - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col < MAX_COLS-1) {
    neighbors.push(grid[row][col +1]);
  }
  
  return neighbors.filter(
    (neighbor) =>
      neighbor.state !== TileStates.IS_TRAVERSED &&
      neighbor.state !== TileStates.IS_WALL
  );
}