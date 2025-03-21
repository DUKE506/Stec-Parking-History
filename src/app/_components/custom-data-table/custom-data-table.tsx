"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHistoryStore } from "@/stores/histories-store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { History } from "@prisma/client";
import { columns } from "./columns";
import { CustomSelect } from "../custom-select/custom-select";
import { ViewSize } from "@/types/history/histroy";
import Pagination from "../custom-pagination/custom-pagination";
import { ListLoading, ListModel } from "@/types/list-type";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useApiStore } from "@/stores/api-store";
import { useFilterStore } from "@/stores/filter-store";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { onHistoryExportData } from "@/hooks/excel_hooks";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const CustomDataTable = <TData, TValue>({
  columns,
}: // data,
// data,
DataTableProps<TData, TValue>) => {
  //입출차 목록 store
  const { histories, currentHistory, setCurrentHistory } = useHistoryStore();
  const { viewSize } = useFilterStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: histories as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: viewSize,
      },
    },
  });

  return (
    <Table className="w-full h-full ">
      <TableHeader className="position-sticky top-0 ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="bg-accent">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={`${
                (row.original as History).parkingSeq ===
                currentHistory?.parkingSeq
                  ? "bg-accent"
                  : null
              }`}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => {
                setCurrentHistory(row.original as History);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-xs">
              데이터 없음
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const DataTableArea = ({ title }: { title: string }) => {
  const router = useRouter();
  const { histories, historyTotalCount } = useHistoryStore();

  const { page, viewSize, setPage, setViewSize } = useFilterStore();

  const { queryParams } = useApiStore();

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
    console.log("익스포트");
    await onHistoryExportData({
      title: "입출차이력",
      worksheetname: "입출차이력",
      datas: histories,
    });
  };

  return (
    <div className="container max-w-full flex-3 ">
      <Card className="p-8 h-full">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardDescription>
          <div className="flex justify-between gap-4 items-center">
            {
              //페이지수가 1개이면 안보이개
              Math.ceil(historyTotalCount / viewSize) <= 1 ? null : (
                <Pagination
                  activePage={page}
                  totalItemCount={historyTotalCount}
                  viewSize={viewSize}
                  pageRangeDisplayed={5}
                  onChange={setPage}
                />
              )
            }
            <div className="flex gap-6">
              {/* {
                //페이지수가 1개이면 안보이개
                Math.ceil(historyTotalCount / viewSize) <= 1 ? null : (
                  <Pagination
                    activePage={page}
                    totalItemCount={historyTotalCount}
                    viewSize={viewSize}
                    pageRangeDisplayed={5}
                    onChange={setPage}
                  />
                )
              } */}

              <CustomSelect
                className="w-20"
                values={ViewSize}
                defaultValue={viewSize}
                onChange={onSelectViewNum}
              />
              {historyTotalCount < 1 ? null : (
                <Button className="cursor-pointer" onClick={onExport}>
                  <Download />
                  <span>Excel</span>
                </Button>
              )}
            </div>
          </div>
        </CardDescription>

        {histories === ListLoading ? (
          <div className="flex flex-col gap-6 h-full">
            <Skeleton className="h-full w-full rounded-xl bg-input" />
          </div>
        ) : (
          <CardContent className="p-0 h-full gap-2 overflow-hidden">
            <div className="rounded-md border h-full overflow-y-auto">
              <CustomDataTable columns={columns} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CustomDataTable;
