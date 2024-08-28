import { DirectionType, TileType } from "./types";

export const getDirection = (tile: TileType, parent?: TileType): DirectionType => {
  if (!tile.parent && !parent) {
    return "bottom";
  } else if (!tile.parent) {
    tile.parent = parent!;
  }

  if (tile.parent.row > tile.row) {
    return "top";
  }
  if (tile.parent.col > tile.col) {
    return "left";
  }
  if (tile.parent.row < tile.row) {
    return "bottom";
  }
  if (tile.parent.col < tile.col) {
    return "right";
  }

  return "bottom";
};
