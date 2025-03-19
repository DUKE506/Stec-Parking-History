import { History } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";

interface HistoriesState {
  //입출차 목록
  histories: ListBaseType;
  //입출차 클릭항목
  currentHistory: History | null;
  //View 사이즈
  historyViewSize: number;
  //전체 사이즈
  historyTotalCount: number;
  //현재페이지
  activePage: number;

  setHistories: (newHistories: History[]) => void;

  //입출차 클릭 핸들러
  setCurrentHistory: (selected: History | null) => void;

  //입출차 정보 비고 작성 핸들러
  setHistoryNote: (history: History) => void;

  //view 사이즈 핸들러
  setHistoryViewSize: (num: number) => void;

  //pagination
  setPagination: (page: number) => Promise<void>;

  //입출차 조회
  fetchHistories: () => Promise<void>;
}

export const useHistoryStore = create<HistoriesState>()(
  devtools(
    (set, get) => ({
      histories: ListLoading,
      currentHistory: null,
      historyViewSize: 20,
      historyTotalCount: 0,
      activePage: 1,
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

        const page = get().activePage;

        get().setPagination(page);
      },
      /**
       * 입출차 이력 뷰 개수
       * @param num
       */
      setHistoryViewSize: (num) => {
        set({ historyViewSize: num });
        const page = get().activePage;

        get().setPagination(page);
      },

      /**
       * 입출차 이력 페이지네이션
       */
      setPagination: async (page) => {
        set({ histories: ListLoading });
        set({ activePage: page });
        //현재페이지
        const curPage = get().activePage;
        //view개수
        const viewSize = get().historyViewSize;

        const res = await fetch(
          `/api/history/pagination?page=${curPage}&viewSize=${viewSize}`
        );

        const data = await res.json();
        console.log("스토어 결과 : ", data as ListModel<History>);
        set({ historyTotalCount: data.meta.totalItemCount });
        set({ histories: data });

        try {
        } catch (err) {
          console.error(err);
        }
      },
      fetchHistories: async () => {
        try {
          const res = await fetch("/api/history");
          const data = await res.json();
          set({ histories: data.histories });
        } catch (err) {
          console.error(err);
        }
      },
    }),
    { name: "history-store" } // DevTools에서 보이는 Store 이름(선택사항)
  )
);
