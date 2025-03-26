"use client";
import { useApiStore } from "@/stores/api-store";
import { usePatrolFilterStore } from "@/stores/patrol-filter-store";
import { usePatrolStore } from "@/stores/patrol-store";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function usePatrolQuerySync() {
  const searchParams = useSearchParams();
  const { fetchPatrolData } = usePatrolStore();
  const { setQueryParams } = useApiStore();
  const { setState, setCarNumber, setDuration, setPage, setViewSize } =
    usePatrolFilterStore();

  useEffect(() => {
    // console.log(
    //   "쿼리 파라미터 : ",
    //   new URLSearchParams(searchParams).toString()
    // );
    if (!searchParams) return; //

    //순찰상태
    setState(searchParams.get("patrolNm") ?? "");

    //차량번호
    setCarNumber(searchParams.get("carNumber") ?? "");

    //기간
    const from = searchParams.get("startDate") ?? "";
    const to = searchParams.get("endDate") ?? "";
    setDuration({ from: new Date(from) ?? null, to: new Date(to) ?? null });

    //뷰 개수
    setViewSize(parseInt(searchParams.get("pageSize") ?? "20"));
    //페이지
    setPage(parseInt(searchParams.get("pageNumber") ?? "1"));

    setQueryParams(new URLSearchParams(searchParams).toString());
    fetchPatrolData();
  }, [searchParams]);
}
