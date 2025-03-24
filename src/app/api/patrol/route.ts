import { prisma } from "@/lib/_server/db";
import { ListMeta, ListModel } from "@/types/list-type";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { PatrolState } from "@prisma/client";

/**
 * 순찰 데이터 조회
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    //페이지값이 없는 경우 1
    const page = parseInt(searchParams.get("page") ?? "1");

    //viewSize가 없으면 20개
    const viewSize = parseInt(searchParams.get("viewSize") ?? "20");

    //기간
    const start = searchParams.get("startDate") ?? null;
    let startDate = null;
    if (start) startDate = new Date(start);
    startDate?.setUTCHours(0, 0, 0, 0);

    const end = searchParams.get("endDate") ?? null;
    let endDate = null;
    if (end) endDate = new Date(end);
    endDate?.setUTCHours(23, 59, 59, 59);

    //순찰상태
    const codeName = (searchParams.get("state") as PatrolState) ?? null;
    //차량번호
    const carNumber = searchParams.get("carNumber") ?? null;

    console.log("순찰상태 : ", codeName);
    console.log("차량번호 : ", carNumber);
    console.log("시작기간 :", startDate);
    console.log("종료기간 : ", endDate);

    const [data, totalCount] = await prisma.$transaction([
      prisma.patrol.findMany({
        where: {
          ...(startDate &&
            endDate && {
              time: {
                gte: startDate,
                lte: endDate,
              },
            }),
          ...(codeName && { codeName }),
          ...(carNumber && {
            carNumber: {
              contains: carNumber,
            },
          }),
        },
        skip: (page - 1) * viewSize,
        take: viewSize,
      }),
      prisma.patrol.count({
        where: {
          ...(startDate &&
            endDate && {
              time: {
                lte: startDate,
                gte: endDate,
              },
            }),
          ...(codeName && { codeName }),
          ...(carNumber && {
            carNumber: {
              contains: carNumber,
            },
          }),
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
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

/**
 * 순찰데이터 밀어넣기
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await Promise.all(
    body.map(async (patrol: object) => {
      return await patrolSchemaCheck(patrol);
    })
  );

  console.log(result);

  const patrols = await Promise.all(
    body.map(async (patrol: any) => {
      return await prisma.patrol.create({
        data: {
          parkId: patrol.PARK_ID,
          userName: patrol.PATROL_USER_NM,
          time: new Date(patrol.PATROL_DTM),
          code: patrol.PATROL_CODE,
          codeName: patrol.PATROL_NAME,
          carNumber: patrol.CAR_NUM,
          img: patrol.PATROL_IMG,
          note: patrol.PATROL_REMARK,
        },
      });
    })
  );

  return NextResponse.json({ patrols }, { status: 200 });
}

const patrolSchemaCheck = (data: object) => {
  if (schema.patrolSchema.safeParse(data).success) {
    return true;
  } else return false;
};
