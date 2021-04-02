import { Page } from "./page";

export interface Friend {
  id: number;
  name: string;
  postCount: number;
}

export interface FriendListType {
  page: Page;
  list: Friend[];
}
