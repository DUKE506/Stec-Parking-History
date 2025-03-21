import { prisma } from "@/lib/_server/db";
import { ListMeta, ListModel } from "@/types/list-type";
import { CarType, ParkingState } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  //페이지값이 없는 경우 1
  const page = parseInt(searchParams.get("page") ?? "1");

  //viewSize가 없으면 20개
  const viewSize = parseInt(searchParams.get("viewSize") ?? "20");

  const carType = (searchParams.get("carType") as CarType) ?? null;
  const parkingState =
    (searchParams.get("parkingState") as ParkingState) ?? null;
  const carNumber = searchParams.get("carNumber") ?? null;
  const dong = searchParams.get("dong") ?? null;
  const ho = searchParams.get("ho") ?? null;
  const start = searchParams.get("startDate") ?? null;
  const end = searchParams.get("endDate") ?? null;
  let startDate = null;
  let endDate = null;
  if (start) startDate = new Date(start);
  if (end) endDate = new Date(end);

  let dateWhere = {};

  if (start && end) {
    console.log("시작");
    if (parkingState == null) {
      console.log("1");
      dateWhere = {
        OR: [
          {
            entryTime: {
              gte: startDate,
              lte: endDate,
            },
            exitTime: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      };
    } else if (parkingState === "입차") {
      console.log("2");
      dateWhere = {
        entryTime: {
          gte: startDate,
          lte: endDate,
        },
      };
    } else if (parkingState === "출차") {
      console.log("3");
      dateWhere = {
        entryTime: {
          gte: startDate,
          lte: endDate,
        },
      };
    }
  }

  const [data, totalCount] = await prisma.$transaction([
    prisma.history.findMany({
      where: {
        ...(carType && { carType }),
        ...(parkingState && { parkingState }),
        ...(carNumber && {
          carNumber: {
            contains: carNumber,
          },
        }),
        ...(dong && { dong }),
        ...(ho && { ho }),
        ...dateWhere,
      },
      skip: (page - 1) * viewSize,
      take: viewSize,
    }),
    prisma.history.count({
      where: {
        ...(carType && { carType }),
        ...(parkingState && { parkingState }),
        ...(carNumber && { carNumber }),
        ...(dong && { dong }),
        ...(ho && { ho }),
        ...dateWhere,
      },
    }),
  ]);

  //메타 데이터
  const meta = new ListMeta({
    totalItemCount: totalCount,
    pageSize: viewSize,
    activePage: page,
  });

  const response = new ListModel({
    meta: meta,
    data: data,
  });

  console.log(response.meta);
  //new url줄수도있음
  return NextResponse.json({ ...response }, { status: 200 });
}
