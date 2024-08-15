import { MAX_COLS, MAX_ROWS, SPEEDS, TILE_STYLE } from "./constants";
import { SpeedType, TileType } from "./types";
import { isEqualRowCol } from "./utils";

export const createWall = (
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
) => {
  const delay = SPEEDS.find((s) => s.value === speed)!.value - 1;

  for (let row = 0; row < MAX_ROWS; row++) {
    setTimeout(() => {
      for (let col = 0; col < MAX_COLS; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          if (
            !isEqualRowCol(startTile, row, col) &&
            !isEqualRowCol(endTile, row, col)
          ) {
            setTimeout(() => {
              document.getElementById(
                `${row}-${col}`
              )!.className = `${TILE_STYLE.IS_WALL} animate-wall`;
            }, delay * col);
          }
        }
      }
    }, delay * (MAX_ROWS / 2) * row);
  }
};
