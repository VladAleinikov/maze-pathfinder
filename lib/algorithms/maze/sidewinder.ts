import { MAX_COLS, MAX_ROWS } from "@/lib/constants";
import { createWall } from "@/lib/create-wall";
import { destroyWall } from "@/lib/destroy-wall";
import { GridType, SpeedType, TileStates, TileType } from "@/lib/types";
import { getRndNum, isEqualRowCol, isEqualTiles, sleep } from "@/lib/utils";

export const sidewinder = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
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

  for (let row = 1; row < MAX_ROWS; row += 2) {
    for (let col = 1; col < MAX_COLS - 1; col += 2) {
      if (isEqualRowCol(endTile, row, col)) {
        await destroyWall(grid, row, col, "top", speed);
        continue;
      } else if (row === 1) {
        if (col === MAX_COLS - 2) {
          continue;
        }
        await destroyWall(grid, row, col, "right", speed);
      } else {
        let rndRightCol = getRndNum(col, MAX_COLS - 1);
        let topRndCol = getRndNum(col, rndRightCol);

        if (rndRightCol % 2 === 0) {
          rndRightCol -= 1;
        }
        if (topRndCol % 2 === 0) {
          topRndCol -= 1;
        }

        await destroyWall(grid, row, topRndCol, "top", speed);

        for (; col < rndRightCol; col += 2) {
          if (isEqualRowCol(endTile, row, col)) {
            continue;
          }
          await destroyWall(grid, row, col, "right", speed);
        }
      }
    }
  }
};
