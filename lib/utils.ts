import { twMerge } from "tailwind-merge";
import { MAX_COLS, MAX_ROWS } from "./constants";
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
    }
    else if (row === startTile.row && col === startTile.col) {
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
