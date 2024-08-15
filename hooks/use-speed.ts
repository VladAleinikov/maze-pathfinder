import { SpeedType } from "@/lib/types";
import { create } from "zustand";

interface SpeedStateStore {
  speed: SpeedType;
  setSpeed: (speed: SpeedType) => void;
}

export const useSpeed = create<SpeedStateStore>((set) => ({
  speed: 2,
  setSpeed: (speed: SpeedType) => set({ speed }),
}));
