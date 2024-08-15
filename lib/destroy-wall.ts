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
  isRight: number,
  speed: SpeedType
) => {
  if (isRight && grid[row][col + 1]) {
    animateWall(grid, row, col + 1, speed);
  } else if (grid[row + 1]) {
    animateWall(grid, row + 1, col, speed);
  } else {
    animateWall(grid, row, col, speed);
  }
};
