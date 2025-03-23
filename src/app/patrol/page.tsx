"use client";
import React from "react";
import Navigation from "../_components/nav/nav";
import Filter from "./_components/filter/filter";
import List from "./_components/list/list";
import { usePatrolQuerySync } from "@/hooks/patrol_hooks";
import { PatrolDetail } from "./_components/patrol-detail/patrol-detail";
import { usePatrolStore } from "@/stores/patrol-store";

const Page = () => {
  const { currentPatrol } = usePatrolStore();

  usePatrolQuerySync();
  return (
    <div className="h-full min-h-[100vh]">
      <div className="flex flex-col w-full gap-10  h-full">
        <Navigation />
        <div className="flex px-10 gap-10 h-full">
          <div className="flex flex-col gap-10 relative w-[350px]">
            <Filter />
            {currentPatrol ?
              <PatrolDetail data={currentPatrol} />
              : null
            }
          </div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Page;
