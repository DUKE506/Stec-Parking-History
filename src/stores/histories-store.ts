import { History } from "@/types/history/histroy";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ListBaseType,
  ListLoading,
  ListMeta,
  ListModel,
} from "@/types/list-type";
import { useApiStore } from "./api-store";
import { useFilterStore } from "./filter-store";

interface HistoriesState {
  //입출차 목록
  histories: ListBaseType;
  //export 데이터
  exportData: History;
  //입출차 클릭항목
  currentHistory: History | null;

  //전체 데이터 수수
  historyTotalCount: number;

  //입출차 클릭 핸들러
  setCurrentHistory: (selected: History | null) => void;

  //입출차 정보 비고 작성 핸들러
  setHistoryNote: (history: History) => void;

  //pagination
  setPagination: () => Promise<void>;

  //export 데이터
  getExportData: () => Promise<History>;
}

export const useHistoryStore = create<HistoriesState>()(
  devtools(
    (set, get) => ({
      histories: ListLoading,
      exportData: [],
      currentHistory: null,
      historyTotalCount: 0,
      setCurrentHistory: (selected) => {
        set({ currentHistory: selected });
      },
      setHistoryNote: async (history) => {
        const { baseUrl } = useApiStore.getState();

        const res = await fetch(`${baseUrl}api/InOut/v1/UpdateViewMemo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pId: history.pId, memo: history.memo }),
        });

        if (!res.ok) {
          console.error("Failed to update history:", res.statusText);
          return;
        }

        get().setPagination();
      },

      /**
       * 입출차 이력 페이지네이션
       */
      setPagination: async () => {
        set({ histories: ListLoading });

        //현재페이지
        const curPage = useFilterStore.getState().page;
        //view개수
        const viewSize = useFilterStore.getState().viewSize;

        const { baseUrl, queryParams } = useApiStore.getState();
        //서버 변경시 base붙임
        // const fullUrl = baseUrl + `?page=${curPage}&viewSize=${viewSize}` + query;

        // let fullUrl = `/api/history/pagination?page=${curPage}&viewSize=${viewSize}`;
        let fullUrl = `api/InOut/v1/ViewList?pageNumber=${curPage}&pageSize=${viewSize}`;

        if (queryParams) {
          fullUrl = fullUrl + `&${queryParams}`;
        }

        const res = await fetch(baseUrl + fullUrl);

        const getData = await res.json();

        if (getData.meta) {
          set({ historyTotalCount: (getData.meta as ListMeta).totalCount });
        }

        set({ histories: getData as ListModel<History> });
        try {
        } catch (err) {
          console.error(err);
        }
      },
      getExportData: async (): Promise<History> => {
        const { baseUrl, queryParams } = useApiStore.getState();
        const searchParams = new URLSearchParams(queryParams);
        if (
          queryParams.includes("pageNumber") ||
          queryParams.includes("pageSize")
        ) {
          searchParams.delete("pageNumber");
          searchParams.delete("pageSize");
        }

        let fullUrl = `api/InOut/v1/AllList`;
        if (searchParams.size > 0) {
          fullUrl = fullUrl + `?${searchParams}`;
        }

        const res = await fetch(baseUrl + fullUrl);

        const getData = await res.json();

        if (getData.data && res.ok) {
          // console.log("데이터 : ", getData.data);
          set({ exportData: getData.data as History });
        }

        return getData.data as History;
      },
    }),
    { name: "history-store" } // DevTools에서 보이는 Store 이름(선택사항)
  )
);
