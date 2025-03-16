import { prisma } from "@/lib/_server/db";
import { History } from "@prisma/client"
import { createStore } from 'zustand/vanilla'
import { create } from 'zustand';

export type HistoriesState = {
    histories: History[];
    loading: boolean;
    error: string | null;
    fetchHistories: () => Promise<void>;
}

// export type HistoriesActions = {
//     addHistory: (newHistory: History[]) => void
//     //비고 수정 예상
//     updateHistory: () => void
// }

// export type HistoriesStore = HistoriesState & HistoriesActions




//상태 초기화
// export const defaultInitState: HistoriesState = {
//     histories: [],
//     loading : false,
//     fetchHistories: async (get,set) => {

//     }
// }

export const useHistoriesStore = create<HistoriesState>()((set) => ({
    histories: [],
    loading: false,
    error: null,
    fetchHistories: async () => {
        try {
            set({ loading: true });
            const response = await fetch('/api/history'); // API 호출
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to fetch histories');

            set({ histories: data.histories, loading: false });
        } catch (err) {
            if (err instanceof Error) {
                set({ error: err.message, loading: false })
            } else {
                set({ error: String(err) })
            }
        }
    },

}))