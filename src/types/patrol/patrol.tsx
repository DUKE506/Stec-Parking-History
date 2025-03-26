export const PageActionState = {
  FirstPage: "First",
  PrevPage: "Prev",
  NextPage: "Next",
  LastPage: "Last",
};

export type PageActionUnionType =
  (typeof PageActionState)[keyof typeof PageActionState];

export const PatrolState = {
  ALL: "전체",
  NORMAL: "정상(입주민)",
  VISIT: "방문객(현장)",
  RESERVE: "방문객(예약)",
  BLACK: "위반(블랙리스트)",
};

export type PatrolStateUnionType =
  (typeof PatrolState)[keyof typeof PatrolState];

export class Patrol {
  pId: number;
  parkId: string;
  patrolUserNm: string;
  patrolDtm: string;
  patrolCode: number;
  patrolName: string;
  carNum: string;
  patrolImg: string;
  patrolRemark: string;

  constructor({
    pId,
    parkId,
    patrolUserNm,
    patrolDtm,
    patrolCode,
    patrolName,
    carNum,
    patrolImg,
    patrolRemark,
  }: {
    pId: number;
    parkId: string;
    patrolUserNm: string;
    patrolDtm: string;
    patrolCode: number;
    patrolName: string;
    carNum: string;
    patrolImg: string;
    patrolRemark: string;
  }) {
    this.pId = pId;
    this.parkId = parkId;
    this.patrolUserNm = patrolUserNm;
    this.patrolDtm = patrolDtm;
    this.patrolCode = patrolCode;
    this.patrolName = patrolName;
    this.carNum = carNum;
    this.patrolImg = patrolImg;
    this.patrolRemark = patrolRemark;
  }
}
