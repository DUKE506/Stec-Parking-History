import { prisma } from "@/lib/_server/db";
import { addDays, sub } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

/**
 * 최근 7일 조회
 * @param history
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entryTime: string }> }
) {
  const date = new Date((await params).entryTime);
  const res = await prisma.gateLog.findMany({
    where: {
      time: {
        lte: date,
        gte: sub(date, { days: 7 }),
      },
    },
  });

  return NextResponse.json({ success: true, data: res }, { status: 200 });
}
