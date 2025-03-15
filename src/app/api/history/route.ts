import { prisma } from "@/lib/_server/db";
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema"
import { ParkingState } from "@prisma/client";

/**
 * 히스토리 전체 조회
 * @returns 
 */
export async function GET() {
    const res = await prisma.history.findMany();
    return NextResponse.json(res);
}

/**
 * 데이터 입력
 * @returns
 */
export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    const res = await gateLogTypeCheck(body);

    //입출차 검사 실패 경우
    if (res === null) {
        return NextResponse.json('잘못된 요청');
    }

    //입차
    if (res === ParkingState.IN) {

    }

    //출차
    if (res === ParkingState.OUT) {

    }

    return NextResponse.json(res);
}

//타입 검사
const gateLogTypeCheck = async (requestBody: any): Promise<ParkingState | null> => {
    //입차
    if (schema.inGateLogSchema.safeParse(requestBody).success) {
        return ParkingState.IN;
    }
    //출차
    if (schema.outGateLogSchema.safeParse(requestBody).success) {
        return ParkingState.OUT;
    }
    return null
}