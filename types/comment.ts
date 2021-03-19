import { Page } from "./page";

export interface BaseComment {
  pid: number;
  cid: string;
  uid: string;
  userName: string;
  avatar: string;
  createTime: string;
  updateTime: string;
  deleteTime: string;
  content: string;
}

export interface ChildComment extends BaseComment {
  parentCid: string;
  parentUid: string;
  targetCid: string;
  targetUid: string;
  targetName: string;
}

export interface ParentComment extends BaseComment {
  page: Page;
  children: ChildComment[];
}

export interface ParentComments {
  page: Page;
  list: ParentComment[];
}

export interface ReplyTargetInfo {
  pid: number;
  parentCid: string;
  targetCid: string;
  targetName: string;
}

export interface PostCommentParams {
  targetCid?: string;
  targetUid?: string;
  parentCid?: string;
  parentUid?: string;
  content: string;
}

export interface CommentChildren {
  page: Page;
  list: ChildComment[];
}
