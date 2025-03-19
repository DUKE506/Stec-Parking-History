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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const CustomDataTable = <TData, TValue>({
  columns,
  data,
}: // data,
DataTableProps<TData, TValue>) => {
  //입출차 목록 store
  const { currentHistory, historyViewSize, setCurrentHistory } =
    useHistoryStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: Array.isArray(data) ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    //Sorting --
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: historyViewSize,
      },
    },
    //Sorting --
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
  const {
    histories,
    activePage,
    historyTotalCount,
    historyViewSize,
    setHistoryViewSize,
    setPagination,
  } = useHistoryStore();

  useEffect(() => {
    setPagination(activePage);
  }, []);

  return (
    <div className="container max-w-full flex-3 ">
      <Card className="p-8 h-full">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        {histories === ListLoading ? (
          <div className="flex flex-col gap-6 h-full">
            <div className="flex justify-end">
              <Skeleton className=" h-9 w-[350px] rounded-xl bg-input" />
            </div>
            <Skeleton className="h-full w-full rounded-xl bg-input" />
          </div>
        ) : (
          <>
            <CardDescription>
              <div className="flex justify-end gap-4">
                <Pagination
                  activePage={activePage}
                  totalItemCount={historyTotalCount}
                  viewSize={historyViewSize}
                  pageRangeDisplayed={5}
                  onChange={setPagination}
                />
                <CustomSelect
                  className="w-20"
                  values={ViewSize}
                  defaultValue={historyViewSize}
                  onChange={setHistoryViewSize}
                />
              </div>
            </CardDescription>

            <CardContent className="p-0 h-full gap-2 overflow-hidden">
              <div className="rounded-md border h-full overflow-y-auto">
                <CustomDataTable
                  columns={columns}
                  data={(histories as ListModel<History>).data}
                />
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default CustomDataTable;
