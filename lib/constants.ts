import { TileStates, TileType } from "./types";

export const MAX_ROWS = 50;
export const MAX_COLS = 50;

const DEFAULT_TILE_STYLE =
  "lg:w-tile-lg md:w-tile-md xs:w-tile-xs w-tile lg:h-tile-lg md:h-tile-md xs:h-tile-xs h-tile border-t border-r border-sky-200";

const START_TILE_STYLE = DEFAULT_TILE_STYLE + " bg-green-400";
const END_TILE_STYLE = DEFAULT_TILE_STYLE + " bg-red-400";
const WALL_TILE_STYLE = DEFAULT_TILE_STYLE + " bg-gray-400";
const PATH_TILE_STYLE = DEFAULT_TILE_STYLE + " bg-green-500";
const TRAVERSED_TILE_STYLE = DEFAULT_TILE_STYLE + " bg-cyan-400";

export const TILE_STYLE: { [key in TileStates]: string } = {
  IS_DEFAULT: DEFAULT_TILE_STYLE,
  IS_START: START_TILE_STYLE,
  IS_END: END_TILE_STYLE,
  IS_PATH: PATH_TILE_STYLE,
  IS_WALL: WALL_TILE_STYLE,
  IS_TRAVERSED: TRAVERSED_TILE_STYLE,
};

export const START_TILE: TileType = {
  row: 0,
  col: 0,
  state: TileStates.IS_START,
  distance: 0,
  parent: null,
};

export const END_TILE: TileType = {
  row: 49,
  col: 49,
  state: TileStates.IS_END,
  distance: 0,
  parent: null,
};
