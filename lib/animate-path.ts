import { EXTENDED_SLEEP_TIME, SLEEP_TIME, SPEEDS, TILE_STYLE } from "./constants";
import { SpeedType, TileType } from "./types";
import { isEqualTiles } from "./utils";

export const animatePath = (
  traversedTiles: TileType[],
  path: TileType[],
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
) => {
  const delay = SPEEDS.find((s) => s.value === speed)!.value;
  
  for (let i = 0; i < traversedTiles.length; i++) {
    setTimeout(() => {
      const tile = traversedTiles[i];
      if (!isEqualTiles(tile, startTile) && !isEqualTiles(tile, endTile)) {
        document.getElementById(`${tile.row}-${tile.col}`)!.className = `${TILE_STYLE.IS_TRAVERSED} animate-traversed`;
      }
    }, SLEEP_TIME * i*delay);
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const tile = path[i];
        if (!isEqualTiles(tile, startTile) && !isEqualTiles(tile, endTile)) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${TILE_STYLE.IS_PATH} animate-path`;
        }
      }, EXTENDED_SLEEP_TIME * i * delay);
    }
  }, SLEEP_TIME * traversedTiles.length * delay);
}