import { CarUnionType, ParkingStateUnionType } from "@/types/history/histroy";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface FilterState {
  //입출유형
  carType: CarUnionType | null;
  //주차상태
  parkingState: ParkingStateUnionType | null;
  //차량번호
  carNumber: string | null;
  //기간
  startDate: Date | null;
  endDate: Date | null;
  //동
  dong: string | null;
  //호
  ho: string | null;

  setCarType: (type: CarUnionType) => void;
  setParkingState: (state: ParkingStateUnionType) => void;
  setCarNumber: (number: string) => void;
  setStartDate: (start: Date) => void;
  setEndDate: (end: Date) => void;
  setDong: (dong: string) => void;
  setHo: (ho: string) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools((set, get) => ({
    carType: null,
    parkingState: null,
    carNumber: null,
    startDate: null,
    endDate: null,
    dong: null,
    ho: null,
    setCarType: (type) => {
      if (type === "전체") {
        set({ parkingState: null });
        return;
      }

      console.log("타입 변경 : ", type);
      set({ carType: type });
    },
    setParkingState: (state) => {
      if (state === "전체") {
        set({ parkingState: null });
        return;
      }
      console.log("주차상태 변경 : ", state);
      set({ parkingState: state });
    },
    setCarNumber: (number) => {
      if (number === null) {
        set({ carNumber: null });
        return;
      }

      console.log("차량번호 변경 : ", number);
      set({ carNumber: number });
    },
    setStartDate: (start) => {
      console.log("시작날짜 변경 : ", start);
    },
    setEndDate: (end) => {
      console.log("끝날짜 변경 : ", end);
    },
    setDong: (dong) => {
      if (dong === null) {
        set({ dong: null });
        return;
      }

      console.log("동 변경 : ", dong);
      set({ dong: dong });
    },
    setHo: (ho) => {
      if (ho === null) {
        set({ ho: null });
        return;
      }

      set({ ho: ho });
      console.log("호 변경 : ", ho);
    },
  }))
);
