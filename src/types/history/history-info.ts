export class GateLog {
  pId: number;
  ioGubun: number | null;
  ioSeq: string | null;
  parkId: string | null;
  carNum: string | null;
  ioStatusTp: string | null;
  ioStatusTpNm: string | null;
  ioGateId: string | null;
  ioGateNm: string | null;
  ioLineNum: number | null;
  ioDtm: string | null;
  ioLprStatus: string | null;
  ioLprStatusNm: string | null;
  ioTicketTp: string | null;
  ioTicketTpNm: string | null;
  dong: string | null;
  ho: string | null;
  isReservation: string | null;
  isBlacklist: string | null;
  blacklistReason: string | null;
  regDtm: string | null;
  imgPath: string | null;
  isWait: string | null;
  isWaitReason: string | null;
  parkDuration: string | null; // 필요에 따라 number | null 등으로 수정 가능
  visitTime: string | null; // 필요에 따라 Date | null 등으로 수정 가능
  etc: string | null;
  memo: string | null;

  constructor({
    pId,
    ioGubun,
    ioSeq,
    parkId,
    carNum,
    ioStatusTp,
    ioStatusTpNm,
    ioGateId,
    ioGateNm,
    ioLineNum,
    ioDtm,
    ioLprStatus,
    ioLprStatusNm,
    ioTicketTp,
    ioTicketTpNm,
    dong,
    ho,
    isReservation,
    isBlacklist,
    blacklistReason,
    regDtm,
    imgPath,
    isWait,
    isWaitReason,
    parkDuration,
    visitTime,
    etc,
    memo,
  }: {
    pId: number;
    ioGubun: number | null;
    ioSeq: string | null;
    parkId: string | null;
    carNum: string | null;
    ioStatusTp: string | null;
    ioStatusTpNm: string | null;
    ioGateId: string | null;
    ioGateNm: string | null;
    ioLineNum: number | null;
    ioDtm: string | null;
    ioLprStatus: string | null;
    ioLprStatusNm: string | null;
    ioTicketTp: string | null;
    ioTicketTpNm: string | null;
    dong: string | null;
    ho: string | null;
    isReservation: string | null;
    isBlacklist: string | null;
    blacklistReason: string | null;
    regDtm: string | null;
    imgPath: string | null;
    isWait: string | null;
    isWaitReason: string | null;
    parkDuration: string | null;
    visitTime: string | null;
    etc: string | null;
    memo: string | null;
  }) {
    this.pId = pId;
    this.ioGubun = ioGubun;
    this.ioSeq = ioSeq;
    this.parkId = parkId;
    this.carNum = carNum;
    this.ioStatusTp = ioStatusTp;
    this.ioStatusTpNm = ioStatusTpNm;
    this.ioGateId = ioGateId;
    this.ioGateNm = ioGateNm;
    this.ioLineNum = ioLineNum;
    this.ioDtm = ioDtm;
    this.ioLprStatus = ioLprStatus;
    this.ioLprStatusNm = ioLprStatusNm;
    this.ioTicketTp = ioTicketTp;
    this.ioTicketTpNm = ioTicketTpNm;
    this.dong = dong;
    this.ho = ho;
    this.isReservation = isReservation;
    this.isBlacklist = isBlacklist;
    this.blacklistReason = blacklistReason;
    this.regDtm = regDtm;
    this.imgPath = imgPath;
    this.isWait = isWait;
    this.isWaitReason = isWaitReason;
    this.parkDuration = parkDuration;
    this.visitTime = visitTime;
    this.etc = etc;
    this.memo = memo;
  }
}
