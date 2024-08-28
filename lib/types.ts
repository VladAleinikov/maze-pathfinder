export enum AlgorithmType {
  WALL_FOLLOWER = "WALL_FOLLOWER",
  SHORTEST_PATH_FINDER = "SHORTEST_PATH_FINDER",
}
export enum MazeType {
  NONE = "NONE",
  BINARY_TREE = "BINARY_TREE",
  SIDEWINDER = "SIDEWINDER",
  ELLERS_ALGORITHM = "ELLERS_ALGORITHM",
  WILLIAMS_ALGORITHM = "WILLIAMS_ALGORITHM",
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

export type SpeedType = 2 | 1 | 0.5;

export type GridType = TileType[][];

export type DirectionType = "top" | "left" | "right" | "bottom"
