"use client";
import { columns } from "./_components/custom-data-table/columns";
import CustomDataTable from "./_components/custom-data-table/custom-data-table";

import FilterArea from "./_components/custom-select/custom-select";
import HistoryInfoArea from "./_components/history-info-area/history-info-area";
import Navigation from "./_components/nav/nav";

export default function Home() {
  return (
    <div className="h-dvh">
      <div className="flex flex-col w-full gap-10  h-full">
        <Navigation />
        <FilterArea />
        <div className="flex px-10 gap-10  flex-1 min-h-0 pb-10">
          <CustomDataTable columns={columns} />
          <HistoryInfoArea />
        </div>
      </div>
    </div>
  );
}
