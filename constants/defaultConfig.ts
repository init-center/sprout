import { Theme } from "../types/theme";

export const DEFAULT_WEBSITE_NAME = "Sprout";
export const DEFAULT_ADMIN_NAME = "SUPER_AI";
export const DEFAULT_ADMIN_EMAIL = "init_center@foxmail.com";
export const DEFAULT_ABOUT = "你好！欢迎来到我的博客！";

export const DEFAULT_WEBSITE_DESCRIPTION = `${DEFAULT_WEBSITE_NAME}是 ${DEFAULT_ADMIN_NAME}（https://github.com/init-center）的个人博客，主要内容为 Web 前端开发。 - ${DEFAULT_ADMIN_NAME} - ${DEFAULT_WEBSITE_NAME}`;

export const DEFAULT_WEBSITE_KEYWORDS = `${DEFAULT_ADMIN_NAME}, ${DEFAULT_WEBSITE_NAME}, 博客, @${DEFAULT_ADMIN_NAME}, Web, blog, Front-End, 前端开发, Developer, JavaScript, TypeScript, Golang, Vue.js, 小程序, React.js, Webpack, Docker`;

export const THEME_CONFIG: Theme[] = [
  {
    name: "樱花",
    imgUrl: "https://static.init.center/sprout/theme-img/樱花.svg",
    color: "#fb7299",
    colorRGB: "251,114,153",
  },
  {
    name: "蓝心",
    imgUrl: "https://static.init.center/sprout/theme-img/蓝心.svg",
    color: "#1da1f2",
    colorRGB: "29,161,242",
  },
  {
    name: "星星",
    imgUrl: "https://static.init.center/sprout/theme-img/星星.svg",
    color: "#ffad1f",
    colorRGB: "255, 173, 31",
  },
  {
    name: "章鱼",
    imgUrl: "https://static.init.center/sprout/theme-img/章鱼.svg",
    color: "#794bc4",
    colorRGB: "121, 75, 196",
  },
  {
    name: "火",
    imgUrl: "https://static.init.center/sprout/theme-img/火.svg",
    color: "#f45d22",
    colorRGB: "244, 93, 34",
  },
  {
    name: "鳄梨",
    imgUrl: "https://static.init.center/sprout/theme-img/鳄梨.svg",
    color: "#17bf63",
    colorRGB: "23, 191, 99",
  },
];
