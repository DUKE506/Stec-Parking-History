import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { usePatrolFilterStore } from "./patrol-filter-store";
import { useApiStore } from "./api-store";
import { Patrol } from "@prisma/client";

interface PatrolState {
  //데이터
  patrol: ListBaseType;
  currentPatrol: Patrol | null;
  //순찰 선택
  setCurrentPatrol: (patrol: Patrol) => void
  //데이터 조회(페이지네이션)
  fetchPatrolData: () => Promise<void>;
}

export const usePatrolStore = create<PatrolState>()(
  devtools((set, get) => ({
    patrol: ListLoading,
    currentPatrol: null,
    setCurrentPatrol: (patrol) => {
      console.log(patrol)
      set({ currentPatrol: patrol })
    },
    fetchPatrolData: async () => {
      set({ patrol: ListLoading });
      const query = new URLSearchParams();
      const { page, viewSize } = usePatrolFilterStore.getState();
      const { baseUrl, queryParams } = useApiStore.getState();
      query.append("page", page.toString());
      query.append("viewSize", viewSize.toString());

      let fullUrl = `/api/patrol?${query}`;
      if (queryParams) {
        fullUrl = fullUrl + `&${queryParams}`;
      }

      const res = await fetch(fullUrl);
      const getData = await res.json();
      console.log(getData);
      set({ patrol: getData as ListModel<Patrol> });
    },
  }))
);
