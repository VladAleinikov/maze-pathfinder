import { TileType } from "./types";
import { isEqualTiles } from "./utils";

export const isTileInTiles = (tiles: TileType[], tile: TileType) => {
  return tiles.find((tileItem) => isEqualTiles(tileItem, tile)) !== undefined;
};
