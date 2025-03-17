import { CarType, ParkingState } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 차량구분 한글 -> Type
 * @param ticket_tp_nm
 * @returns
 */
export const switchCarType = (ticket_tp_nm: string): CarType | null => {
  switch (ticket_tp_nm) {
    case "방문차량":
      return CarType.VISIT;
    case "정기차량":
      return CarType.REGULAR;
    case "예약차량":
      return CarType.RESERVED;
    default:
      return null;
  }
};

/**
 * 차량구분 한글화
 * @param carType
 * @returns
 */
export const switchCarTypeKR = (carType: CarType) => {
  switch (carType) {
    case CarType.VISIT:
      return "방문차량";
    case CarType.REGULAR:
      return "정기차량";
    case CarType.RESERVED:
      return "예약차량";
    default:
      return "Unknown";
  }
};

/**
 * 차량구분 한글화
 * @param carType
 * @returns
 */
export const switchParkingStateKR = (carType: ParkingState) => {
  switch (carType) {
    case ParkingState.IN:
      return "입차";
    case ParkingState.OUT:
      return "출차";
    default:
      return "Unknown";
  }
};

/**
 * time
 */
