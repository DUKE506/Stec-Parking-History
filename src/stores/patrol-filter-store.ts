import { PatrolState, PatrolStateUnionType } from "@/types/patrol/patrol";
import { DateRange } from "react-day-picker";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PatrolFilterState {
  state: PatrolStateUnionType | null;
  duration: DateRange | null;
  carNumber: string;
  page: number;
  viewSize: number;
  setState: (state: PatrolStateUnionType) => void;
  setDuration: (duration: DateRange | null) => void;
  setCarNumber: (carNumber: string | null) => void;
}

export const usePatrolFilterStore = create<PatrolFilterState>()(
  devtools((set, get) => ({
    state: null,
    duration: null,
    carNumber: "",
    page: 1,
    viewSize: 20,
    /**
     * 순찰상태
     * @param state
     * @returns
     */
    setState: (state) => {
      if (state === PatrolState.ALL) {
        set({ state: null });
        return;
      }
      set({ state: state });
    },
    /**
     * 순찰 상태
     * @param duration
     */
    setDuration: (duration) => {
      if (duration) set({ duration: duration });
      else set({ duration: null });
    },
    /**
     * 차량번호
     * @param carNumber
     */
    setCarNumber: (carNumber) => {
      if (carNumber) set({ carNumber: carNumber });
    },
  }))
);
