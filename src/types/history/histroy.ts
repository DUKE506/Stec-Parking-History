//차량 구분
export const CarType = {
  ALL: "전체",
  REGULAR: "정기차량", // 정기차량
  RESERVED: "예약차량", // 예약차량
  VISIT: "방문차량",
} as const;

export type CarUnionType = (typeof CarType)[keyof typeof CarType];

//차량 상태
export const ParkingState = {
  ALL: "전체",
  IN: "입차",
  OUT: "출차",
} as const;

export type ParkingStateUnionType =
  (typeof ParkingState)[keyof typeof ParkingState];

//보기 수
export const ViewSize = {
  10: 10,
  20: 20,
  50: 50,
  100: 100,
} as const;

export type ViewSizeUnionType = (typeof ViewSize)[keyof typeof ViewSize];

export const PageActionState = {
  FirstPage: "First",
  PrevPage: "Prev",
  NextPage: "Next",
  LastPage: "Last",
};

export type PageActionUnionType =
  (typeof PageActionState)[keyof typeof PageActionState];

export class History {
  pId: number;
  ioSeq: string | null;
  ioTicketTp: string | null;
  ioTicketTpNm: string | null;
  ioStatusTp: string | null;
  ioStatusTpNm: string | null;
  carNum: string | null;
  inDtm: string | null;
  outDtm: string | null;
  parkingDuration: number | null;
  inGateId: string | null;
  inGateNm: string | null;
  outGateId: string | null;
  outGateNm: string | null;
  dong: string | null;
  ho: string | null;
  inImagePath: string | null;
  outImagePath: string | null;
  isBlacklist: string | null;
  blacklistReason: string | null;
  memo: string | null;

  constructor({
    pId,
    ioSeq,
    ioTicketTp,
    ioTicketTpNm,
    ioStatusTp,
    ioStatusTpNm,
    carNum,
    inDtm,
    outDtm,
    parkingDuration,
    inGateId,
    inGateNm,
    outGateId,
    outGateNm,
    dong,
    ho,
    inImagePath,
    outImagePath,
    isBlacklist,
    blacklistReason,
    memo,
  }: {
    pId: number;
    ioSeq: string | null;
    ioTicketTp: string | null;
    ioTicketTpNm: string | null;
    ioStatusTp: string | null;
    ioStatusTpNm: string | null;
    carNum: string | null;
    inDtm: string | null;
    outDtm: string | null;
    parkingDuration: number | null;
    inGateId: string | null;
    inGateNm: string | null;
    outGateId: string | null;
    outGateNm: string | null;
    dong: string | null;
    ho: string | null;
    inImagePath: string | null;
    outImagePath: string | null;
    isBlacklist: string | null;
    blacklistReason: string | null;
    memo: string | null;
  }) {
    this.pId = pId;
    this.ioSeq = ioSeq;
    this.ioTicketTp = ioTicketTp;
    this.ioTicketTpNm = ioTicketTpNm;
    this.ioStatusTp = ioStatusTp;
    this.ioStatusTpNm = ioStatusTpNm;
    this.carNum = carNum;
    this.inDtm = inDtm;
    this.outDtm = outDtm;
    this.parkingDuration = parkingDuration;
    this.inGateId = inGateId;
    this.inGateNm = inGateNm;
    this.outGateId = outGateId;
    this.outGateNm = outGateNm;
    this.dong = dong;
    this.ho = ho;
    this.inImagePath = inImagePath;
    this.outImagePath = outImagePath;
    this.isBlacklist = isBlacklist;
    this.blacklistReason = blacklistReason;
    this.memo = memo;
  }
}
