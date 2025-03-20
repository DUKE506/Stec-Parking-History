import { NextRequest, NextResponse } from "next/server";
import { gateLogTypeCheck } from "../../history/route";
import { prisma } from "@/lib/_server/db";
import { switchCarType } from "@/lib/utils";
import { CarType, ParkingState } from "@prisma/client";

/**
 * 입차 데이터 밀어넣기
 * @param req
 * @returns
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ state: string }> }
) {
  const body = await req.json();
  const state = (await params).state;

  console.log(body.length);

  const results = await Promise.all(
    body.map(async (history: object) => {
      return await gateLogTypeCheck(history);
    })
  );

  console.log(results);
  console.log(state);
  switch (state) {
    case "입차":
      const histories = await Promise.all(
        body.map(async (history: any) => {
          console.log(history.IN_TICKET_TP_NM as CarType);
          return await prisma.history.create({
            data: {
              parkingSeq: history.IO_SEQ,
              carType: history.IN_TICKET_TP_NM as CarType,
              parkingState: ParkingState.입차,
              carNumber: history.CAR_NUM,
              entryTime: new Date(history.IN_DTM),
              exitTime: null,
              totalTime: null,
              parkingAreaName: history.PARK_ID,
              entryArea: history.IN_GATE_NM,
              exitArea: null,
              dong: history.DONG,
              ho: history.HO,
              isBlack:
                history.BLACK_LIST_INFO.IS_BLACK_LIST === "0" ? false : true,
              entryImage: history.IMG_PATH,
              note: null,
            },
          });
        })
      );
      histories.map(async (history, idx) => {
        await prisma.gateLog.create({
          data: {
            seq: body[idx].IO_SEQ,
            //주차장 id
            parkingAreaId: body[idx].PARK_ID,
            //차량번호
            carNumber: body[idx].CAR_NUM,
            //입출상태
            state: body[idx].IO_STATUS_TP,
            //입출상태명
            stateName: body[idx].IO_STATUS_TP_NM,
            //게이트id
            gateId: body[idx].IN_GATE_ID,
            //게이트명
            gateName: body[idx].IN_GATE_NM,
            //라인번호
            lineNumber: body[idx].IN_LINE_NUM,
            //입출차 시각
            time: new Date(body[idx].IN_DTM),
            //lpr상태
            lprState: body[idx].IN_LPR_STATUS,
            //lpr상태명
            lprStateName: body[idx].IN_LPR_STATUS_NM,
            //차량구분명
            carTypeName: body[idx].IN_TICKET_TP_NM,
            //블랙리스트여부
            isBlack:
              body[idx].BLACK_LIST_INFO.IS_BLACK_LIST === "0" ? false : true,
            //블랙리스트사유
            blackDescription: body[idx].BLACK_LIST_INFO.BLACK_LIST_REASON,
            //등록일시
            addTime: body[idx].BLACK_LIST_INFO.REG_DTM,
            //이미지 경로
            imagePath: body[idx].IMG_PATH,
            //동
            dong: body[idx].DONG,
            //호
            ho: body[idx].HO,
            //예약차량여부
            isResevation: body[idx].IS_RESERVATION === "0" ? false : true,
            //대기여부
            isWait: body[idx].IS_WAIT === "0" ? false : true,
            //대기사유
            waitDescription: body[idx].IS_WAIT_REASON,
            //총 주차시간
            totalTime: null,
            //방문포인트사용시간
            visitPointTime: null,
            //기타 사유 - 예약차량 경우 예약사유
            etc: body[idx].ETC,
            historyId: history.id,
          },
        });
      });

      return NextResponse.json({ status: 200 });
    case "출차":
      return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 200 });
}
