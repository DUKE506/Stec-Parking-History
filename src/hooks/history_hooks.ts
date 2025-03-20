import { useApiStore } from "@/stores/api-store";
import { useFilterStore } from "@/stores/filter-store";
import { useHistoryStore } from "@/stores/histories-store";
import {
  CarType,
  CarUnionType,
  ParkingState,
  ParkingStateUnionType,
} from "@/types/history/histroy";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useQuerySync() {
  const searchParams = useSearchParams();
  const { setPagination } = useHistoryStore();
  const { setQueryParams } = useApiStore();
  const {
    page,
    setCarType,
    setParkingState,
    setCarNumber,
    setStartDate,
    setEndDate,
    setDong,
    setHo,
    setPage,
    setViewSize,
  } = useFilterStore();

  useEffect(() => {
    // console.log(
    //   "쿼리 파라미터 : ",
    //   new URLSearchParams(searchParams).toString()
    // );
    setCarType((searchParams.get("carType") as CarUnionType) ?? CarType.ALL);
    setParkingState(
      (searchParams.get("parkingState") as ParkingStateUnionType) ??
        ParkingState.ALL
    );
    setCarNumber(searchParams.get("carNumber") ?? "");
    setDong(searchParams.get("dong") ?? "");
    setHo(searchParams.get("ho") ?? "");

    setViewSize(parseInt(searchParams.get("viewSize") ?? "20"));
    setPage(parseInt(searchParams.get("page") ?? "1"));

    setQueryParams(new URLSearchParams(searchParams).toString());
    setPagination();
  }, [searchParams]);
}
