import { History } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import { useApiStore } from "./api-store";
import { useFilterStore } from "./filter-store";

interface HistoriesState {
  //입출차 목록
  histories: ListBaseType;
  //입출차 클릭항목
  currentHistory: History | null;

  //전체 사이즈
  historyTotalCount: number;

  setHistories: (newHistories: History[]) => void;

  //입출차 클릭 핸들러
  setCurrentHistory: (selected: History | null) => void;

  //입출차 정보 비고 작성 핸들러
  setHistoryNote: (history: History) => void;

  //pagination
  setPagination: () => Promise<void>;
}

export const useHistoryStore = create<HistoriesState>()(
  devtools(
    (set, get) => ({
      histories: ListLoading,
      currentHistory: null,
      historyTotalCount: 0,
      setHistories: (newHistories) => set({ histories: newHistories }),
      setCurrentHistory: (selected) => {
        set({ currentHistory: selected });
      },
      setHistoryNote: async (history) => {
        const res = await fetch("/api/history/info", {
          method: "POST",
          body: JSON.stringify(history),
        });

        if (!res.ok) {
          console.error("Failed to update history:", res.statusText);
          return;
        }

        const page = useFilterStore.getState().page;

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

        const baseUrl = useApiStore.getState().baseUrl;
        const query = useApiStore.getState().queryParams;
        //서버 변경시 base붙임
        // const fullUrl = baseUrl + `?page=${curPage}&viewSize=${viewSize}` + query;

        let fullUrl = `/api/history/pagination?page=${curPage}&viewSize=${viewSize}`;

        if (query) {
          fullUrl = fullUrl + `&${query}`;
        }

        // const res = await fetch(
        //   `/api/history/pagination?page=${curPage}&viewSize=${viewSize}`
        // );
        const res = await fetch(fullUrl);

        const getData = await res.json();

        set({ historyTotalCount: getData.meta.totalItemCount });
        set({ histories: getData.data as ListModel<History> });

        try {
        } catch (err) {
          console.error(err);
        }
      },
    }),
    { name: "history-store" } // DevTools에서 보이는 Store 이름(선택사항)
  )
);
