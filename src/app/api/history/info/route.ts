import { prisma } from "@/lib/_server/db";
import { NextRequest, NextResponse } from "next/server";
import { History } from "@prisma/client";

/**
 * 비고 작성
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = body as History;

  const res = await prisma.history.update({
    where: { id: data.id },
    data: {
      note: data.note,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
