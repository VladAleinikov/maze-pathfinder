import { TileType } from "./types";

export const MAX_ROWS = 50;
export const MAX_COLS = 50;

export const START_TILE: TileType = {
  row: 0,
  col: 0,
  isStart: true,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  parent: null
};
export const END_TILE: TileType = {
  row: 50,
  col: 50,
  isStart: false,
  isEnd: true,
  isWall: false,
  isPath: false,
  distance: 0,
  parent: null,
};