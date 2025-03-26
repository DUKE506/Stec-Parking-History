"use client";
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
    setCarType,
    setParkingState,
    setCarNumber,

    setDuration,
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
    if (!searchParams) return; //

    setCarType(
      (searchParams.get("ioTicketTpNm") as CarUnionType) ?? CarType.ALL
    );
    setParkingState(
      (searchParams.get("ioStatusTpNm") as ParkingStateUnionType) ??
        ParkingState.ALL
    );
    setCarNumber(searchParams.get("carNumber") ?? "");

    const from = searchParams.get("startDate") ?? "";
    const to = searchParams.get("endDate") ?? "";
    setDuration({ from: new Date(from) ?? null, to: new Date(to) ?? null });

    setDong(searchParams.get("dong") ?? "");
    setHo(searchParams.get("ho") ?? "");

    setViewSize(parseInt(searchParams.get("pageSize") ?? "20"));
    setPage(parseInt(searchParams.get("pageNumber") ?? "1"));

    setQueryParams(new URLSearchParams(searchParams).toString());
    setPagination();
  }, [searchParams]);
}
