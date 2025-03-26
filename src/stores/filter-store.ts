import {
  CarType,
  CarUnionType,
  ParkingStateUnionType,
} from "@/types/history/histroy";
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface FilterState {
  //입출유형
  carType: CarUnionType | null;
  //주차상태
  parkingState: ParkingStateUnionType | null;
  //차량번호
  carNumber: string;
  //기간
  duration: DateRange | null;

  //동
  dong: string;
  //호
  ho: string;
  //페이지
  page: number;
  //view수
  viewSize: number;
  setCarType: (type: CarUnionType) => void;
  setParkingState: (state: ParkingStateUnionType) => void;
  setCarNumber: (number: string | null) => void;
  setDuration: (duration: DateRange | null) => void;
  setDong: (dong: string | null) => void;
  setHo: (ho: string | null) => void;
  setPage: (page: number | null) => void;
  setViewSize: (num: number | null) => void;
  setFilterReset: () => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist<FilterState>(
      (set) => ({
        carType: null,
        parkingState: null,
        carNumber: "",
        duration: null,
        dong: "",
        ho: "",
        page: 1,
        viewSize: 20,
        /**
         * 차량 구분
         * @param type
         * @returns
         */
        setCarType: (type) => {
          if (type === CarType.ALL) {
            set({ carType: null });
            return;
          }

          set({ carType: type });
        },
        /**
         * 입출차 상태
         * @param state
         * @returns
         */
        setParkingState: (state) => {
          if (state === "전체") {
            set({ parkingState: null });
            return;
          }

          set({ parkingState: state });
        },
        /**
         * 차량번호
         * @param number
         * @returns
         */
        // setCarNumber: (number) => {
        //   if (number === null) {
        //     set({ carNumber: "" });
        //     return;
        //   }

        //   set({ carNumber: number });
        // },
        setCarNumber: (number) => {
          // 불필요한 상태 업데이트 방지
          if (number === null) {
            set((state) =>
              state.carNumber !== "" ? { carNumber: "" } : state
            );
            return;
          }

          // 현재 상태와 다른 경우에만 업데이트
          set((state) =>
            state.carNumber !== number ? { carNumber: number } : state
          );
        },
        setDuration: (duration) => {
          if (duration) set({ duration: duration });
          else set({ duration: null });
        },
        /**
         * 동
         * @param dong
         * @returns
         */
        setDong: (dong) => {
          if (dong === null) {
            set({ dong: "" });
            return;
          }

          set({ dong: dong });
        },
        /**
         * 호
         * @param ho
         * @returns
         */
        setHo: (ho) => {
          if (ho === null) {
            set({ ho: "" });
            return;
          }

          set({ ho: ho });
        },
        /**
         * 현재 페이지
         * @param page
         */
        setPage: (page) => {
          if (!page) {
            set({ page: 1 });
          } else {
            set({ page: page });
          }
        },
        /**
         * 뷰 개수
         * @param num
         */
        setViewSize: (num) => {
          if (!num) {
            set({ viewSize: 20 });
          } else {
            set({ viewSize: num });
          }
        },
        setFilterReset: () => {
          set({
            carType: null,
            parkingState: null,
            carNumber: "",
            duration: null,
            dong: "",
            ho: "",
            page: 1,
            viewSize: 20,
          });
        },
      }),
      { name: "filter-store" }
    )
  )
);
