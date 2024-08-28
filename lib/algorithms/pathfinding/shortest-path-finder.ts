import { getDirection } from "@/lib/get-direction";
import { getUntraversedNeighbors } from "@/lib/get-untraversed-neighbors";
import { isTileInTiles } from "@/lib/is-tile-in-tiles";
import { DirectionType, GridType, TileStates, TileType } from "@/lib/types";
import { isEqualTiles } from "@/lib/utils";

export const shortestPathFinder = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
): { traversedTiles: TileType[]; path: TileType[] } => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.state = TileStates.IS_TRAVERSED;
  const unTraversed = [base];

  while (unTraversed.length) {
    const tile = unTraversed.shift()!;
    if (tile.state === TileStates.IS_WALL) continue;
    if (tile.distance === Infinity) break;

    tile.state = TileStates.IS_TRAVERSED;
    traversedTiles.push(tile);

    if (isEqualTiles(tile, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, tile);

    for (let i = 0; i < neighbors.length; i++) {
      if (!isTileInTiles(unTraversed, neighbors[i])) {
        const neighbor = neighbors[i];
        neighbor.distance = tile.distance + 1;
        neighbor.parent = tile;
        unTraversed.push(neighbor);
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
