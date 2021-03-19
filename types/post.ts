import { Page } from "./page";
import { Tag } from "./tag";

export interface PostItem {
  uid: string;
  pid: string;
  categoryId: number;
  categoryName: string;
  tags: Tag[];
  title: string;
  cover: string;
  summary: string;
  views: number;
  createTime: string;
  topTime: string;
  commentCount: number;
}

export interface PostDetail extends PostItem {
  bgm: string;
  content: string;
  commentOpen: number;
  updateTime: string;
}

export type PostListType = {
  page: Page;
  list: PostItem[];
};

export interface PostListQueryFields {
  page?: number;
  limit?: number;
  tag?: number;
  tagName?: string;
  category?: number;
  categoryName?: string;
  keyword?: string;
}
