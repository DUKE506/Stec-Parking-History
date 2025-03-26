import {
  ListBaseType,
  ListLoading,
  ListMeta,
  ListModel,
} from "@/types/list-type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { usePatrolFilterStore } from "./patrol-filter-store";
import { useApiStore } from "./api-store";
import { Patrol } from "@/types/patrol/patrol";

interface PatrolState {
  //데이터
  patrol: ListBaseType;
  //export 데이터
  exportData: Patrol;

  currentPatrol: Patrol | null;
  patrolTotalCount: number;
  //순찰 선택
  setCurrentPatrol: (patrol: Patrol) => void;
  //데이터 조회(페이지네이션)
  fetchPatrolData: () => Promise<void>;
  //export 데이터
  getExportData: () => Promise<Patrol>;
}

export const usePatrolStore = create<PatrolState>()(
  devtools((set) => ({
    patrol: ListLoading,
    exportData: [],
    currentPatrol: null,
    setCurrentPatrol: (patrol) => {
      set({ currentPatrol: patrol });
    },
    fetchPatrolData: async () => {
      set({ patrol: ListLoading });
      const query = new URLSearchParams();
      const { page, viewSize } = usePatrolFilterStore.getState();
      const { baseUrl, queryParams } = useApiStore.getState();
      query.append("pageNumber", page.toString());
      query.append("pageSize", viewSize.toString());

      let fullUrl = `api/Patrol/v1/ViewList?${query}`;
      if (queryParams) {
        fullUrl = fullUrl + `&${queryParams}`;
      }

      const res = await fetch(`${baseUrl}${fullUrl}`);
      const getData = await res.json();

      if (getData.meta)
        set({ patrolTotalCount: (getData.meta as ListMeta).totalCount });
      set({ patrol: getData as ListModel<Patrol> });
    },
    getExportData: async (): Promise<Patrol> => {
      const { baseUrl, queryParams } = useApiStore.getState();
      const searchParams = new URLSearchParams(queryParams);
      if (
        queryParams.includes("pageNumber") ||
        queryParams.includes("pageSize")
      ) {
        searchParams.delete("pageNumber");
        searchParams.delete("pageSize");
      }

      let fullUrl = `api/Patrol/v1/AllList`;
      if (searchParams.size > 0) {
        fullUrl = fullUrl + `?${searchParams}`;
      }

      const res = await fetch(baseUrl + fullUrl);

      const getData = await res.json();

      if (getData.data && res.ok) {
        // console.log("데이터 : ", getData.data);
        set({ exportData: getData.data as Patrol });
      }

      return getData.data as Patrol;
    },
  }))
);
