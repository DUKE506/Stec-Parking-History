"use client";
import { GateLog } from "@/types/history/history-info";
import { History } from "@/types/history/histroy";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useApiStore } from "./api-store";

interface HistoryInfoState {
  currentHistoryLog: GateLog[] | null;
  loading: boolean;
  fetchWeekLogs: (history: History) => Promise<void>;
}

export const useHistoryInfoStore = create<HistoryInfoState>()(
  devtools((set) => ({
    currentHistoryLog: null,
    loading: false,
    fetchWeekLogs: async (history) => {
      set({ loading: true });
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      const formatDate = dayjs(history.inDtm).format("YYYY-MM-DD HH:mm:ss");
      const { baseUrl } = useApiStore.getState();
      const res = await fetch(
        `${baseUrl}api/InOut/v1/ViewLastWeeks?carNumber=${
          history.carNum
        }&searchDate=${formatDate.split(" ")[0]}`
      );
      const data = await res.json();

      set({ currentHistoryLog: data.data as GateLog[] });
      set({ loading: false });
    },
  }))
);
