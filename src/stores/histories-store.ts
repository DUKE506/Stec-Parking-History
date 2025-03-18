import { GateLog, History } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import dayjs from "dayjs";

interface HistoriesState {
  //입출차 목록
  histories: History[];
  //입출차 클릭항목
  currentHistory: History | null;
  //View 사이즈
  historyViewSize: number;

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
      histories: [],
      currentHistory: null,
      historyViewSize: 20,
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

        get().fetchHistories();
      },
      /**
       * 입출차 이력 뷰 개수
       * @param num
       */
      setHistoryViewSize: (num) => {
        console.log("설정 개수 : " + num);
        set({ historyViewSize: num });
      },

      /**
       * 입출차 이력 페이지네이션
       */
      setPagination: async (page) => {
        set({ activePage: page });
        //현재페이지
        const curPage = get().activePage;
        console.log("변경 페이지 : " + curPage);
        //view개수
        const viewSize = get().historyViewSize;
        console.log("뷰 수 : " + viewSize);

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
