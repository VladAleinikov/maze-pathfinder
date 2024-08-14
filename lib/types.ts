export enum AlgorithmType {
  WALL_FOLLOWER = "WALL_FOLLOWER",
}
export enum MazeType {
  NONE = "NONE",
}

export enum TileStates {
  IS_DEFAULT = "IS_DEFAULT",
  IS_END = "IS_END",
  IS_START = "IS_START",
  IS_WALL = "IS_WALL",
  IS_PATH = "IS_PATH",
  IS_TRAVERSED = "IS_TRAVERSED",
}

export type TileType = {
  row: number;
  col: number;
  distance: number;
  parent: TileType | null;
  state:  TileStates;
};

export type GridType = TileType[][];
