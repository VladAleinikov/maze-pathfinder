export enum AlgorithmType {
  WALL_FOLLOWER,
}
export enum MazeType{
  NONE,
}

export type TileType = {
  row: number,
  col: number,
  isEnd: boolean,
  isStart: boolean
  isWall: boolean,
  isPath: boolean,
  distance: number,
  parent: TileType | null
}

export type GridType = TileType[][]