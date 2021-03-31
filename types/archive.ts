import { PostItem } from "./post";

export type ArchiveList = {
  [year: string]: PostItem[];
};
