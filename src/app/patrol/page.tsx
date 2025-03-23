"use client";
import React from "react";
import Navigation from "../_components/nav/nav";
import Filter from "./_components/filter/filter";
import List from "./_components/list/list";
import { usePatrolQuerySync } from "@/hooks/patrol/patrol_hooks";
import { PatrolDetail } from "./_components/patrol-detail/patrol-detail";
import { usePatrolStore } from "@/stores/patrol-store";
import { ArrowUp } from "lucide-react";

const Page = () => {
  const { currentPatrol } = usePatrolStore();
  usePatrolQuerySync();

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-full min-h-[100vh]">
      <div className="flex flex-col w-full gap-10  h-full">
        <Navigation />
        <div className="flex px-10 gap-10 h-full">
          <div className="flex flex-col  gap-10 relative w-[350px]">
            <Filter />
            {currentPatrol ? <PatrolDetail data={currentPatrol} /> : null}
          </div>
          <List />
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

export default Page;
