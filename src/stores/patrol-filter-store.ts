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
  setPage: (page: number | null) => void;
  setViewSize: (num: number | null) => void;
  setFilterReset: () => void;
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
      if (carNumber) return set({ carNumber: carNumber });

      set({ carNumber: "" });
    },
    /**
     * 현재 페이지
     * @param page
     */
    setPage: (page) => {
      if (!page) {
        set({ page: 1 });
      } else {
        set({ page: page });
      }
    },
    /**
     * 뷰 개수
     * @param num
     */
    setViewSize: (num) => {
      console.log("상태관리 뷰 사이즈 : ", num);
      if (!num) {
        set({ viewSize: 20 });
      } else {
        set({ viewSize: num });
      }
    },
    setFilterReset: () => {
      set({
        state: null,
        duration: null,
        carNumber: "",
        page: 1,
        viewSize: 20,
      });
    },
  }))
);
