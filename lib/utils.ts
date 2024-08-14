import { twMerge } from "tailwind-merge";
import { END_TILE, MAX_COLS, MAX_ROWS, START_TILE } from "./constants";
import { GridType, TileStates, TileType } from "./types";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
  const currentRow: TileType[] = [];

  for (let col = 0; col < MAX_COLS; col++) {
    let tileState: TileStates = TileStates.IS_DEFAULT;
    if (row === endTile.row && col === endTile.col) {
      tileState = TileStates.IS_END;
    } else if (row === startTile.row && col === startTile.col) {
      tileState = TileStates.IS_START;
    }
    currentRow.push({
      row,
      col,
      state: tileState,
      distance: Infinity,
      parent: null,
    });
  }

  return currentRow;
};

export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }

  return grid;
};

export const checkIfStartOrEnd = (row: number, col: number) => {
  return (
    (row === START_TILE.row && col === START_TILE.col) ||
    (row === END_TILE.row && col === END_TILE.col)
  );
};

export const createNewGrid = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    state: TileStates.IS_WALL
  };
  newGrid[row][col] = newTile;

  return newGrid;
}