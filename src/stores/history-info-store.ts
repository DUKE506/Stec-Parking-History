import { GateLog, History } from "@prisma/client";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface HistoryInfoState {
  currentHistoryLog: GateLog[] | null;
  loading: boolean;
  fetchWeekLogs: (history: History) => Promise<void>;
}

export const useHistoryInfoStore = create<HistoryInfoState>()(
  devtools((set, get) => ({
    currentHistoryLog: null,
    loading: false,
    fetchWeekLogs: async (history) => {
      set({ loading: true });
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      const formatDate = dayjs(history.entryTime).format("YYYY-MM-DD HH:mm:ss");
      const res = await fetch(
        `/api/history/info/${formatDate.split(" ")[0]}/${history.carNumber}`
      );
      const data = await res.json();

      set({ currentHistoryLog: data.data as GateLog[] });
      set({ loading: false });
    },
  }))
);
