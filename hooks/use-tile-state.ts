import { END_TILE, START_TILE } from "@/lib/constants";
import { TileType } from "@/lib/types";
import { create } from "zustand";

interface TileStateStore {
  startTile: TileType;
  setStartTile: (startTile: TileType) => void;
  endTile: TileType;
  setEndTile: (endTile: TileType) => void;
}

export const useTileState = create<TileStateStore>((set) => ({
  startTile: START_TILE,
  setStartTile: (startTile: TileType) => set({ startTile }),
  endTile: END_TILE,
  setEndTile: (endTile: TileType) => set({ endTile }),
}));
