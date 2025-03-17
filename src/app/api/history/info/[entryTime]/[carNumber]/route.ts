import { prisma } from "@/lib/_server/db";
import { addDays, sub } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

/**
 * 최근 7일 조회
 * @param history
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entryTime: string; carNumber: string }> }
) {
  const entry = new Date((await params).entryTime);
  const carNumber = (await params).carNumber;
  const res = await prisma.gateLog.findMany({
    where: {
      time: {
        lte: entry,
        gte: sub(entry, { days: 7 }),
      },
      carNumber: carNumber,
    },
  });

  return NextResponse.json({ success: true, data: res }, { status: 200 });
}
