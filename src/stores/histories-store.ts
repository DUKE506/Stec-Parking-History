import { GateLog, History } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import dayjs from "dayjs";

interface HistoriesState {
  histories: History[];
  currentHistory: History | null;
  currentHistoryLog: GateLog[] | null;
  setHistories: (newHistories: History[]) => void;
  setCurrentHistory: (selected: History | null) => void;
  setHistoryNote: (history: History) => void;
  fetchHistories: () => Promise<void>;
  fetchWeekLogs: (history: History) => Promise<void>;
}

export const useHistoryStore = create<HistoriesState>()(
  devtools(
    (set, get) => ({
      histories: [],
      currentHistory: null,
      currentHistoryLog: null,
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
      fetchHistories: async () => {
        try {
          const res = await fetch("/api/history");
          const data = await res.json();
          set({ histories: data.histories });
        } catch (err) {
          console.error(err);
        }
      },
      /**
       * 최근 7일 조회
       * @param history
       */
      fetchWeekLogs: async (history) => {
        const formatDate = dayjs(history.entryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const res = await fetch(
          `/api/history/info/${formatDate.split(" ")[0]}/${history.carNumber}`
        );
        const data = await res.json();

        set({ currentHistoryLog: data.data as GateLog[] });
      },
    }),
    { name: "history-store" } // DevTools에서 보이는 Store 이름(선택사항)
  )
);
