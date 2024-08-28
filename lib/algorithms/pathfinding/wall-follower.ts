import { getDirection } from "@/lib/get-direction";
import { getUntraversedNeighbors } from "@/lib/get-untraversed-neighbors";
import { isTileInTiles } from "@/lib/is-tile-in-tiles";
import { DirectionType, GridType, TileStates, TileType } from "@/lib/types";
import { isEqualTiles } from "@/lib/utils";

export const wallFollower = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
): { traversedTiles: TileType[]; path: TileType[] } => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.state = TileStates.IS_TRAVERSED;
  const unTraversed = [base];
  const directions: DirectionType[] = [
    "right",
    "bottom",
    "left",
    "top",
    "right",
    "bottom",
    "left",
    "top",
    "right",
  ];
  const tileWithNeighbours: TileType[] = [];

  while (unTraversed.length) {
    const tile = unTraversed.shift()!;
    if (tile.state === TileStates.IS_WALL) continue;
    if (tile.distance === Infinity) break;

    tile.state = TileStates.IS_TRAVERSED;
    traversedTiles.push(tile);

    if (isEqualTiles(tile, endTile)) break;
    const currentDirection = getDirection(tile);
    const priorityDirections = directions.slice(
      directions.indexOf(currentDirection) + 3,
      directions.indexOf(currentDirection) + 7
    );

    const neighbors = getUntraversedNeighbors(grid, tile);

    neighbors.sort(
      (n1, n2) =>
        priorityDirections.indexOf(getDirection(n1, tile)) -
        priorityDirections.indexOf(getDirection(n2, tile))
    );

    if (!neighbors.length) {
      unTraversed.push(tileWithNeighbours.pop()!);
    }
    if (neighbors.length > 1) {
      tileWithNeighbours.push(tile);
    }

    for (let i = 0; i < neighbors.length; i++) {
      if (!isTileInTiles(unTraversed, neighbors[i])) {
        const neighbor = neighbors[i];
        neighbor.distance = tile.distance + 1;
        neighbor.parent = tile;
        unTraversed.push(neighbor);
        break;
      }
    }
  }

  const path = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null) {
    tile.state = TileStates.IS_PATH;
    path.unshift(tile);
    tile = tile.parent!;
  }

  return { traversedTiles, path };
};
