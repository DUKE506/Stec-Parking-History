import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface ApiState {
  aptName: string;
  baseUrl: string;
  theHamBizIp: string | null;
  apiVersion: string;
  queryParams: string;
  text: number;
  setAptName: (value: string) => Promise<number>;
  setTheHamBizIp: (ip: string) => Promise<number>;
  setQueryParams: (query: string) => void;
  getAptName: () => Promise<void>;
  getTheHamBizIp: () => Promise<void>;
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
        theHamBizIp: null,
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
        setTheHamBizIp: async (ip) => {
          const { baseUrl, getTheHamBizIp } = get();
          const res = await fetch(`${baseUrl}api/IpSetting/v1/SetIpAddress`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ IpAddress: ip }),
          });

          const result = await res.json();

          await getTheHamBizIp();

          return result.code;
        },
        getTheHamBizIp: async () => {
          const { baseUrl } = get();
          const res = await fetch(`${baseUrl}api/IpSetting/v1/GetIpAddress`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          const ip = await res.json();

          if (res.ok) set({ theHamBizIp: ip.data.ipAddress });
          const { theHamBizIp } = get();
        },
      }),
      {
        name: "api-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
