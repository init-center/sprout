export interface UidInfo {
  uid: string;
}

export enum Group {
  ADMIN = 1,
  DEFAULT = 2,
}

export enum BanStatus {
  NO,
  YES,
}
export interface UserPublicInfo {
  uid: string;
  name: string;
  avatar: string;
  intro: string;
  createTime: string;
  isBaned: BanStatus;
  group: Group;
}
