import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ApiState {
  baseUrl: string;
  apiVersion: string;
  queryParams: string;
  setQueryParams: (query: string) => void;
  setBaseUrl: (url: string) => void;
  setApiVersion: (version: string) => void;
}

export const useApiStore = create<ApiState>()(
  devtools(
    (set, get) => ({
      //env로 관리 예정
      baseUrl: "http:localhost/api/",
      apiVersion: "v1",
      queryParams: "",
      setQueryParams: (query) => {
        set({ queryParams: query });
      },
    }),
    { name: "api-store" }
  )
);
