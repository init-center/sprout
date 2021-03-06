import { Page } from "./page";
import { Tag } from "./tag";

export interface PostItem {
  uid: string;
  userName: string;
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
  favorites: number;
}

export interface FavoritePost extends PostItem {
  favoriteTime: string;
}

export interface PostDetail extends PostItem {
  bgm: string;
  content: string;
  isCommentOpen: number;
  updateTime: string;
}

export type PostListType = {
  page: Page;
  list: PostItem[];
};

export type PostDetailListType = {
  page: Page;
  list: PostDetail[];
};

export type FavoritePostList = {
  page: Page;
  list: FavoritePost[];
};

export interface PostListQueryFields {
  page?: number;
  limit?: number;
  tag?: number;
  tagName?: string;
  category?: number;
  categoryName?: string;
  keyword?: string;
  firstPageGetTop?: number;
}
