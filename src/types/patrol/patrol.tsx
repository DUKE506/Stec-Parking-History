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
  NORMAL: "정상",
  VISIT: "방문객",
  PATROL: "순찰",
  BLACK: "위반",
};

export type PatrolStateUnionType =
  (typeof PatrolState)[keyof typeof PatrolState];
