import { Page } from "./page";

export interface Tag {
  id: number;
  name: string;
  postCount: number;
}

export interface TagListType {
  page: Page;
  list: Tag[];
}
