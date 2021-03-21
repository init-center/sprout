import { Page } from "./page";

export type ConfigItem = {
  key: string;
  value: string;
  explain: string;
};

export interface ConfigList {
  page: Page;
  list: ConfigItem[];
}

export type Configs = {
  [key: string]: ConfigItem;
};
