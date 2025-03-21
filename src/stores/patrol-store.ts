import { ListBaseType, ListLoading } from "@/types/list-type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { usePatrolFilterStore } from "./patrol-filter-store";

interface PatrolState {
  //데이터
  patrol: ListBaseType;

  //데이터 조회(페이지네이션)
  fetchPatrolData: () => Promise<void>;
}

export const usePatrolStore = create<PatrolState>()(
  devtools((set, get) => ({
    patrol: ListLoading,
    fetchPatrolData: () => {
      set({ patrol: ListLoading });

      const { page, viewSize } = usePatrolFilterStore.getState();
    },
  }))
);
