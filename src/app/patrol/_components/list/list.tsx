"use client";
import CustomDataTable from "@/app/_components/custom-data-table/custom-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { columns } from "../data-table/columns";
import { ViewSize } from "@/types/history/histroy";
import { Patrol } from "@prisma/client";
import { usePatrolStore } from "@/stores/patrol-store";
import { ListLoading, ListModel } from "@/types/list-type";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/app/_components/custom-pagination/custom-pagination";
import { usePatrolFilterStore } from "@/stores/patrol-filter-store";
import { CustomSelect } from "@/app/_components/custom-select/custom-select";
import { useApiStore } from "@/stores/api-store";
import { useRouter } from "next/navigation";
import { onPatrolExportData } from "@/hooks/patrol/excel";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const List = () => {
  const { patrol, setCurrentPatrol } = usePatrolStore();
  const { page, viewSize, setPage, setViewSize } = usePatrolFilterStore();
  const router = useRouter();
  const { queryParams } = useApiStore();
  const [isPagination, setIsPagination] = useState<boolean>(false);

  useEffect(() => {
    //로딩중
    if (patrol === ListLoading) {
      return;
    }
    if (patrol !== ListLoading) {
      if (
        Math.ceil(
          (patrol as ListModel<Patrol>).meta.totalItemCount / viewSize
        ) > 1
      ) {
        setIsPagination(true);
        return;
      }
      setIsPagination(false);
      return;
    }
  }, [patrol, viewSize]);

  //view 개수 변경 핸들러
  const onSelectViewNum = (value: any) => {
    const params = new URLSearchParams(queryParams);
    params.set("viewSize", value);
    params.set("page", "1");
    setPage(1);
    setViewSize(value);
    router.push(`?${params}`);
  };

  const onExport = async () => {
    await onPatrolExportData({
      title: "순찰이력",
      worksheetname: "순찰이력",
      datas: (patrol as ListModel<Patrol>).data,
    });
  };

  return (
    <Card className="w-full mb-10 min-h-[100]">
      <CardHeader>
        <CardTitle>순찰 이력</CardTitle>
      </CardHeader>
      <CardDescription className={`flex justify-between  px-6`}>
        {patrol === ListLoading ? (
          <Skeleton className="h-9 w-80" />
        ) : isPagination ? (
          <Pagination
            activePage={page}
            totalItemCount={(patrol as ListModel<Patrol>).meta.totalItemCount}
            viewSize={viewSize}
            pageRangeDisplayed={5}
            onChange={setPage}
          />
        ) : (
          <div></div>
        )}
        {patrol === ListLoading ? (
          <Skeleton className="h-9 w-20" />
        ) : (
          <div className="flex gap-6">
            <CustomSelect
              className="w-20"
              values={ViewSize}
              defaultValue={viewSize}
              onChange={onSelectViewNum}
            />
            {(patrol as ListModel<Patrol>).meta.totalItemCount < 1 ? null : (
              <Button className="cursor-pointer" onClick={onExport}>
                <Download />
                <span>Excel</span>
              </Button>
            )}
          </div>
        )}
      </CardDescription>

      <CardContent className="h-full">
        {patrol === ListLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <div className="rounded-md border h-full overflow-y-auto">
            <CustomDataTable<Patrol, any>
              columns={columns}
              data={(patrol as ListModel<Patrol>).data}
              onClickRow={setCurrentPatrol}
              viewSize={20}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default List;
