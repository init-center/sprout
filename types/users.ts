import { Moment } from "moment";

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

export enum Gender {
  MALE,
  FEMALE,
}

export interface UserPrivateInfo extends UserPublicInfo {
  birthday: string;
  tel: string;
  email: string;
  gender: Gender;
}

export interface UpdateUserInfo {
  name: string;
  avatar: string;
  intro: string;
  birthday: string | Moment;
  tel: string;
  email: string;
  gender: Gender;
  eCode: string;
}

export interface UpdatePassword {
  password: string;
  rePassword: string;
  eCode: string;
}
