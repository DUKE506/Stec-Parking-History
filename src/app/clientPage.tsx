"use client";

import { ArrowUp } from "lucide-react";
import FilterArea from "./_components/filter-area/filter-area";

import HistoryInfoArea from "./_components/history-info-area/history-info-area";
import { DataTableArea } from "./_components/history-table-area/history-table-area";
import Navigation from "./_components/nav/nav";

import { useQuerySync } from "@/hooks/history/history_hooks";

const ClientPage = () => {
  useQuerySync();
  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="h-full min-h-[100vh]">
      <div className="flex flex-col w-full gap-6 h-full">
        <Navigation />
        <FilterArea />
        <div className="flex px-10 gap-6 flex-1 min-h-0 pb-10">
          <section className="flex-1">
            <DataTableArea title="입출차 이력" />
          </section>

          <section>
            <HistoryInfoArea />
          </section>
        </div>
      </div>
      <ArrowUp
        className="fixed right-5 bottom-5 bg-black text-white rounded-full p-1 : hover:bg-muted-foreground hover:cursor-pointer hover:duration-150"
        size={30}
        onClick={onScrollToTop}
      />
    </div>
  );
};

export default ClientPage;
