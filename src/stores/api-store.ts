import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface ApiState {
  aptName: string;
  baseUrl: string;
  apiVersion: string;
  queryParams: string;
  text: number;
  setAptName: (value: string) => Promise<number>;
  setQueryParams: (query: string) => void;
  getAptName: () => Promise<void>;
  increase: () => void;
}

export const useApiStore = create<ApiState>()(
  devtools(
    persist(
      (set, get) => ({
        //
        aptName: "",
        //env로 관리 예정
        baseUrl: "http://123.2.156.148:5255/",
        apiVersion: "v1",
        queryParams: "",
        text: 0,
        increase: () => set((state) => ({ text: state.text + 1 })),
        getAptName: async () => {
          const { baseUrl } = get();
          const res = await fetch(`${baseUrl}api/APTName/v1/GetName`);
          const name = await res.json();

          if (res.ok) set({ aptName: name.data.aptName });
        },
        setAptName: async (value: string): Promise<number> => {
          const { baseUrl, getAptName } = get();
          const res = await fetch(`${baseUrl}api/APTName/v1/SetName`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aptName: value }),
          });

          const result = await res.json();

          await getAptName();
          return result.code;
        },
        setQueryParams: (query) => {
          set({ queryParams: query });
        },
      }),
      {
        name: "api-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
