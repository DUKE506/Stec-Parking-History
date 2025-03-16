import { prisma } from "@/lib/_server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
// import { CarType, ParkingState } from "@/types/history/histroy";
import { CarType, ParkingState } from "@prisma/client";

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
    return NextResponse.json("잘못된 요청");
  }

  //입차
  if (res === ParkingState.IN) {
    const history = await prisma.history.create({
      data: {
        parkingSeq: body.IO_SEQ,
        carType: CarType.REGULAR,
        parkingState: ParkingState.IN,
        carNumber: body.CAR_NUM,
        entryTime: body.IN_DTM,
        exitTime: "",
        totalTime: "",
        parkingAreaName: body.PARK_ID,
        entryArea: body.IN_GATE_NM,
        exitArea: "",
        dong: body.DONG,
        ho: body.HO,
        isBlack: body.BLACK_LIST_INFO.IS_BLACK_LIST === "0" ? false : true,
        note: "",
      },
    });

    await prisma.gateLog.create({
      data: {
        seq: body.IO_SEQ,
        //주차장 id
        parkingAreaId: body.PARK_ID,
        //차량번호
        carNumber: body.CAR_NUM,
        //입출상태
        state: body.IO_STATUS_TP,
        //입출상태명
        stateName: body.IO_STATUS_TP_NM,
        //게이트id
        gateId: body.IN_GATE_ID,
        //게이트명
        gateName: body.IN_GATE_NM,
        //라인번호
        lineNumber: body.IN_LINE_NUM,
        //입출차 시각
        time: body.IN_DTM,
        //lpr상태
        lprState: body.IN_LPR_STATUS,
        //lpr상태명
        lprStateName: body.IN_LPR_STATUS_NM,
        //차량구분명
        carTypeName: body.IN_TICKET_TP,
        //블랙리스트여부
        isBlack: body.BLACK_LIST_INFO.IS_BLACK_LIST === "0" ? false : true,
        //블랙리스트사유
        blackDescription: body.BLACK_LIST_INFO.BLACK_LIST_REASON,
        //등록일시
        addTime: body.BLACK_LIST_INFO.REG_DTM,
        //이미지 경로
        imagePath: body.IMG_PATH,
        //동
        dong: body.DONG,
        //호
        ho: body.HO,
        //예약차량여부
        isResevation: body.IS_RESERVATION === "0" ? false : true,
        //대기여부
        isWait: body.IS_WAIT === "0" ? false : true,
        //대기사유
        waitDescription: body.IS_WAIT_REASON,
        //총 주차시간
        totalTime: 0,
        //방문포인트사용시간
        visitPointTime: 0,
        //기타 사유 - 예약차량 경우 예약사유
        etc: body.ETC,
        historyId: history.id,
      },
    });
  }

  //출차
  if (res === ParkingState.OUT) {
    const history = await prisma.history.update({
      where: {
        parkingSeq: body.IO_SEQ,
      },
      data: {
        parkingState: ParkingState.OUT,
        exitTime: body.OUT_DTM,
        totalTime: body.PARK_DURATION,
        exitArea: body.OUT_GATE_NM,
      },
    });
    await prisma.gateLog.create({
      data: {
        seq: body.IO_SEQ,
        //주차장 id
        parkingAreaId: body.PARK_ID,
        //차량번호
        carNumber: body.CAR_NUM,
        //입출상태
        state: body.IO_STATUS_TP,
        //입출상태명
        stateName: body.IO_STATUS_TP_NM,
        //게이트id
        gateId: body.OUT_GATE_ID,
        //게이트명
        gateName: body.OUT_GATE_NM,
        //라인번호
        lineNumber: body.OUT_LINE_NUM,
        //입출차 시각
        time: body.OUT_DTM,
        //lpr상태
        lprState: body.OUT_LPR_STATUS,
        //lpr상태명
        lprStateName: body.OUT_LPR_STATUS_NM,
        //차량구분명
        carTypeName: body.OUT_TICKET_TP,
        //블랙리스트여부
        isBlack: body.BLACK_LIST_INFO.IS_BLACK_LIST === "0" ? false : true,
        //블랙리스트사유
        blackDescription: body.BLACK_LIST_INFO.BLACK_LIST_REASON,
        //등록일시
        addTime: body.BLACK_LIST_INFO.REG_DTM,
        //이미지 경로
        imagePath: body.IMG_PATH,
        //동
        dong: body.DONG,
        //호
        ho: body.HO,
        //예약차량여부
        isResevation: body.IS_RESERVATION === "0" ? false : true,
        //대기여부
        isWait: false,
        //대기사유
        waitDescription: "",
        //총 주차시간
        totalTime: body.PARK_DURATION,
        //방문포인트사용시간
        visitPointTime: body.VISIT_TIME,
        //기타 사유 - 예약차량 경우 예약사유
        etc: body.ETC,
        historyId: history.id,
      },
    });
  }

  return NextResponse.json(res);
}

//타입 검사
const gateLogTypeCheck = async (
  requestBody: any
): Promise<ParkingState | null> => {
  //입차
  if (schema.inGateLogSchema.safeParse(requestBody).success) {
    return ParkingState.IN;
  }
  //출차
  if (schema.outGateLogSchema.safeParse(requestBody).success) {
    return ParkingState.OUT;
  }
  return null;
};
