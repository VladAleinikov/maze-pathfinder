import { MAX_COLS, MAX_ROWS } from "@/lib/constants";
import { createWall } from "@/lib/create-wall";
import { destroyWall } from "@/lib/destroy-wall";
import { GridType, SpeedType, TileStates, TileType } from "@/lib/types";
import { getRndNum, isEqualTiles, sleep } from "@/lib/utils";

const isTileInTree = (tree: TileType[], tile: TileType) => {
  return tree.find((treeTile) => isEqualTiles(treeTile, tile)) !== undefined;
};

const getRndTile = (grid: GridType, mainTree: TileType[]): TileType => {
  const notMainTreeTiles = [];

  for (const row of grid) {
    for (const tile of row) {
      if (tile.row % 2 ===1 && tile.col % 2 === 1) {
        if (!isTileInTree(mainTree, tile)) {
          notMainTreeTiles.push(tile);
        }
      }
    }
  }

  const rndTileId = getRndNum(0, notMainTreeTiles.length - 1);
  return notMainTreeTiles[rndTileId];
};

const getDirection = (
  tile1: TileType,
  tile2: TileType
): "top" | "right" | "bottom" | "left" => {
  if (tile1.row > tile2.row) {
    return "top";
  } else if (tile1.row < tile2.row) {
    return "bottom";
  } else if (tile1.col > tile2.col) {
    return "left";
  } else if (tile1.col < tile2.col) {
    return "right";
  } else {
    return "bottom";
  }
};

const destroyWalls = (grid: GridType, tree: TileType[], speed: SpeedType) => {
  tree.map((tile, index, tree) => {
    if (index !== tree.length - 1) {
      destroyWall(
        grid,
        tile.row,
        tile.col,
        getDirection(tile, tree[index + 1]),
        speed
      );
    }
  });
};

const getTileByDirectioin = (
  grid: GridType,
  tile: TileType,
  direction: string
): TileType => {
  switch (direction) {
    case "top":
      if (tile.row === 1) {
        return getTileByDirectioin(grid, tile, "bottom");
      }
      return grid[tile.row - 2][tile.col];
    case "right":
      if (tile.col === MAX_COLS - 2) {
        return getTileByDirectioin(grid, tile, "left");
      }
      return grid[tile.row][tile.col + 2];
    case "bottom":
      if (tile.row === MAX_ROWS - 2) {
        return getTileByDirectioin(grid, tile, "top");
      }
      return grid[tile.row + 2][tile.col];
    case "left":
      if (tile.col === 1) {
        return getTileByDirectioin(grid, tile, "right");
      }
      return grid[tile.row][tile.col - 2];
    default:
      return getTileByDirectioin(grid, tile, "bottom");
  }
};

export const williamsAlgorithm = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  for (const row of grid) {
    for (const tile of row) {
      if (tile.row % 2 === 0 || tile.col % 2 === 0) {
        if (!isEqualTiles(tile, startTile) && !isEqualTiles(tile, endTile)) {
          tile.state = TileStates.IS_WALL;
        }
      }
    }
  }

  const mainTree: TileType[] = [startTile];

  while (mainTree.length !== ((MAX_COLS - 1) / 2) * ((MAX_ROWS - 1) / 2)) {
    const newTree: TileType[] = [getRndTile(grid, mainTree)];

    while (!isTileInTree(mainTree, newTree[newTree.length - 1])) {
      const rndDir = ["top", "right", "bottom", "left"][getRndNum(0, 4)];
      const newTile = getTileByDirectioin(
        grid,
        newTree[newTree.length - 1],
        rndDir
      );
      
      if (isTileInTree(newTree, newTile)) {
        newTree.splice(
          newTree.findIndex((tile) => isEqualTiles(tile, newTile))
        );
      }

      newTree.push(newTile);
    }
    destroyWalls(grid, newTree, speed);
    newTree.pop();
    mainTree.push(...newTree);
    
  }
};
