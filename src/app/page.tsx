"use client";
import { DataTableArea } from "./_components/custom-data-table/custom-data-table";
import FilterArea from "./_components/filter-area/filter-area";

import HistoryInfoArea from "./_components/history-info-area/history-info-area";
import Navigation from "./_components/nav/nav";

import { useQuerySync } from "@/hooks/history_hooks";

export default function Home() {
  useQuerySync();

  return (
    <div className="h-dvh">
      <div className="flex flex-col w-full gap-10  h-full">
        <Navigation />
        <FilterArea />
        <div className="flex px-10 gap-10  flex-1 min-h-0 pb-10">
          <DataTableArea title="입출차 조회" />
          <HistoryInfoArea />
        </div>
      </div>
    </div>
  );
}
