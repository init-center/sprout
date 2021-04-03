import { Page } from "./page";

export interface Friend {
  id: number;
  name: string;
  url: string;
  avatar: string;
  intro: string;
}

export interface FriendListType {
  page: Page;
  list: Friend[];
}
