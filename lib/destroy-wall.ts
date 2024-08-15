import { SPEEDS, TILE_STYLE } from "./constants";
import { GridType, SpeedType, TileStates } from "./types";
import { sleep } from "./utils";

const animateWall = async (
  grid: GridType,
  row: number,
  col: number,
  speed: SpeedType
) => {
  grid[row][col].state = TileStates.IS_DEFAULT;
  document.getElementById(`${row}-${col}`)!.className = TILE_STYLE.IS_DEFAULT;
  await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
};

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  dir: "top" | "right" | "bottom" | "left" | string,
  speed: SpeedType
) => {
  if (dir === "right" && grid[row][col + 1]) {
    animateWall(grid, row, col + 1, speed);
  } else if (dir === "bottom" && grid[row + 1]) {
    animateWall(grid, row + 1, col, speed);
  } else if (dir === "top" && grid[row - 1]) {
    animateWall(grid, row - 1, col, speed);
  } else if (dir === "left" && grid[row][col - 1]) {
    animateWall(grid, row, col - 1, speed);
  } else {
    animateWall(grid, row, col, speed);
  }
};
