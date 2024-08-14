"use client";

import { usePathfindingState } from "@/hooks/use-pathfinding-state";
import { MAX_ROWS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Tile } from "./tile";

export const Grid = () => {
  const grid = usePathfindingState((state) => state.grid);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border-sky-300 ",
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        `lg:w-[${MAX_ROWS * 17}px] md:w-[${MAX_ROWS * 15}px] xs:w-[${
          MAX_ROWS * 8
        }px] w-[${MAX_ROWS * 7}px]`
      )}
    >
      {grid.map((row, id) => (
        <div key={id} className="flex">
          {row.map((tile, tileId) => (
            <Tile {...tile} key={tileId} />
          ))}
        </div>
      ))}
    </div>
  );
};
