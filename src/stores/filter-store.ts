import {
  CarType,
  CarUnionType,
  ParkingStateUnionType,
  ViewSize,
} from "@/types/history/histroy";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

interface FilterState {
  //입출유형
  carType: CarUnionType | null;
  //주차상태
  parkingState: ParkingStateUnionType | null;
  //차량번호
  carNumber: string;
  //기간
  duration: DateRange | null;
  startDate: Date | null;
  endDate: Date | null;
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
  setStartDate: (start: Date) => void;
  setEndDate: (end: Date) => void;
  setDong: (dong: string | null) => void;
  setHo: (ho: string | null) => void;
  setPage: (page: number | null) => void;
  setViewSize: (num: number | null) => void;
  setFilterReset: () => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set, get) => ({
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
      setCarNumber: (number) => {
        if (number === null) {
          set({ carNumber: "" });
          return;
        }

        set({ carNumber: number });
      },
      setDuration: (duration) => {
        console.log("기간 : ", duration);
        if (duration) set({ duration: duration });
        else set({ duration: null });
      },
      /**
       * 시작 기간
       * @param start
       */
      setStartDate: (start) => {
        console.log("시작날짜 변경 : ", start);
      },
      /**
       * 종료 기간
       * @param end
       */
      setEndDate: (end) => {
        console.log("끝날짜 변경 : ", end);
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
);
