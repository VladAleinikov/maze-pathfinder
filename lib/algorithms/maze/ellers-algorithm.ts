import { MAX_COLS, MAX_ROWS } from "@/lib/constants";
import { createWall } from "@/lib/create-wall";
import { destroyWall } from "@/lib/destroy-wall";
import { GridType, SpeedType, TileStates, TileType } from "@/lib/types";
import { isEqualTiles, sleep } from "@/lib/utils";

function* generateNum() {
  for (let num = 1; num < MAX_COLS * MAX_ROWS; num++) {
    yield num;
  }
}

const replaceNum = (
  nums: number[],
  prevNum: number,
  newNum: number
): number[] => {
  return nums.map((num) => (num === prevNum ? newNum : num));
};

const isNumLast = (nums: number[], num: number, col: number): boolean => {
  return nums.findLastIndex((n) => n === num) === (col - 1) / 2;
};

const isNotWallBefore = (
  grid: GridType,
  row: number,
  nums: number[],
  currentNum: number
): boolean => {
  let result = false;

  for (
    let i = nums.findIndex((num) => num === currentNum);
    i < nums.findLastIndex((num) => num === currentNum);
    i++
  ) {
    if (grid[row+1][i * 2 + 1].state !== TileStates.IS_WALL) {
      result = true;
    }
  }

  return result;
};

export const ellersAlgorithm = async (
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

  const getNum = generateNum();
  const colNums: number[][] = [];

  for (let row = 1; row < MAX_ROWS; row += 2) {
    colNums[row] = new Array((MAX_COLS - 1) / 2).map((e, i) => {
      if (grid[row - 1][i * 2 + 1].state === TileStates.IS_WALL) {
        return getNum.next().value;
      } else {
        return colNums[row - 2][i];
      }
    }) as number[];

    for (let col = 1; col < MAX_COLS - 3; col += 2) {
      const destroyRight = Math.round(Math.random());
      if (
        destroyRight === 1 ||
        (destroyRight === 0 &&
          colNums[row][(col - 1) / 2] !== colNums[row][(col + 1) / 2])
      ) {
        colNums[row] = replaceNum(
          colNums[row],
          colNums[row][(col + 1) / 2],
          colNums[row][(col - 1) / 2]
        );
        await destroyWall(grid, row, col, "right", speed);
      }
    }

    for (let col = 1; col < MAX_COLS - 1 && row !== MAX_ROWS-2; col += 2) {
      const destroyBottom = Math.round(Math.random());

      if (
        destroyBottom === 1 ||
        (destroyBottom === 0 &&
          (isNumLast(colNums[row], colNums[row][(col - 1) / 2], col) &&
            isNotWallBefore(
              grid,
              row,
              colNums[row],
              colNums[row][(col - 1) / 2]
            )))
      ) {
        await destroyWall(grid, row, col, "bottom", speed);
      }
    }

    if (row === MAX_ROWS - 2) {
      for (let col = 1; col < MAX_COLS - 1; col += 2) {
        if (colNums[row][(col - 1) / 2] !== colNums[row][(col + 1) / 2]) {
          await destroyWall(grid, row, col, "right", speed);

          colNums[row] = replaceNum(
            colNums[row],
            colNums[row][(col + 1) / 2],
            colNums[row][(col - 1) / 2]
          );
        }
      }
    }
  }
};
