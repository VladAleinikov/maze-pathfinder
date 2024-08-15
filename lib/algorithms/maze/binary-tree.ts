import { MAX_COLS, MAX_ROWS } from "@/lib/constants";
import { createWall } from "@/lib/create-wall";
import { destroyWall } from "@/lib/destroy-wall";
import { GridType, SpeedType, TileStates, TileType } from "@/lib/types"
import { getRndNum, isEqualRowCol, isEqualTiles, sleep } from "@/lib/utils";


export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  for (const row of grid) {
    for (const tile of row) {
      if (tile.row % 2 === 0 || tile.col % 2 === 0) {
        if (!isEqualTiles(tile, startTile) && !isEqualTiles(tile, endTile)) {
          tile.state = TileStates.IS_WALL;
        }
      }
    }
  }

  for (let row = 1; row < MAX_ROWS; row+=2) {
    for (let col = 1; col < MAX_COLS; col += 2) {
      if (isEqualRowCol(endTile, row, col)) {
        continue;
      } else if (row === MAX_ROWS - 2) {
        await destroyWall(grid, row, col, 1, speed);
      } else if (col === MAX_COLS - 2) {
        await destroyWall(grid, row, col, 0, speed);
      } else {
        await destroyWall(grid, row, col, getRndNum(0, 2), speed);
     }
    }
  }
};