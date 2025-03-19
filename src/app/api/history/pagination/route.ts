import { prisma } from "@/lib/_server/db";
import { ListMeta, ListModel } from "@/types/list-type";
import { type NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  console.log("searchParams : ", searchParams);

  //페이지값이 없는 경우 1
  const page = parseInt(searchParams.get("page") ?? "1");

  //viewSize가 없으면 20개
  const viewSize = parseInt(searchParams.get("viewSize") ?? "20");

  const [data, totalCount] = await prisma.$transaction([
    prisma.history.findMany({
      skip: (page - 1) * viewSize,
      take: viewSize,
    }),
    prisma.history.count(),
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
