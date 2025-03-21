"use client";
import CustomDataTable from "@/app/_components/custom-data-table/custom-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { columns } from "../data-table/columns";
import { ViewSize } from "@/types/history/histroy";
import { Patrol } from "@prisma/client";

const List = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>순찰 이력</CardTitle>
      </CardHeader>

      <CardContent className="">
        <div className="rounded-md border h-full overflow-y-auto">
          <CustomDataTable<Patrol, any>
            columns={columns}
            data={[]}
            onClickRow={() => {}}
            viewSize={20}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default List;
