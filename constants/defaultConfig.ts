import { Theme } from "../types/theme";

export const DEFAULT_WEBSITE_NAME = "Sprout";
export const DEFAULT_ADMIN_NAME = "SUPER_AI";
export const DEFAULT_ADMIN_EMAIL = "init_center@foxmail.com";
export const DEFAULT_AUTHOR_URL = "https://github.com/init-center";
export const DEFAULT_WEBSITE_URL = "https://init.center";
export const DEFAULT_ABOUT = "你好！欢迎来到我的博客！";

export const DEFAULT_WEBSITE_DESCRIPTION = `${DEFAULT_WEBSITE_NAME}是 ${DEFAULT_ADMIN_NAME}（https://github.com/init-center）的个人博客，主要内容为 Web 前端开发。 - ${DEFAULT_ADMIN_NAME} - ${DEFAULT_WEBSITE_NAME}`;

export const DEFAULT_WEBSITE_KEYWORDS = `${DEFAULT_ADMIN_NAME}, ${DEFAULT_WEBSITE_NAME}, 博客, @${DEFAULT_ADMIN_NAME}, Web, blog, Front-End, 前端开发, Developer, JavaScript, TypeScript, Golang, Vue.js, 小程序, React.js, Webpack, Docker`;

export const DEFAULT_MAKE_FRIEND_DESCRIPTION = `
<div>如需交换友链，请查看是否符合以下要求：</div>
<ul>
  <li>你的网站不是采集、完全非原创、无实质内容的网站，且至少在半年内有一次更新。</li>
  <li>希望你的网站是主技术类网站。</li>
  <li>你的网站不包含违法国家法律或不健康的内容。</li>
</ul>
<div>如符合要求，请基于以下信息将本站添加至你的友链：</div>
<ul>
  <li><strong>博客名称:</strong> ${DEFAULT_WEBSITE_NAME}</li>
  <li><strong>博客地址:</strong> ${DEFAULT_WEBSITE_URL}</li>
  <li><strong>博客简介:</strong> 人生百年，吾道不孤。</li>
  <li><strong>博客头像:</strong> https:static.init.center/sprout/avatar/my/avatar.jpeg</li>
</ul>
<div>然后按照以上格式将你的站点信息发送到 ${DEFAULT_ADMIN_EMAIL}，我会尽快添加！</div>
`;

export const GLOBAL_MENU_NAV_LIST = [
  {
    name: "标签",
    path: "/tags",
  },
  {
    name: "分类",
    path: "/categories",
  },
  {
    name: "归档",
    path: "/archive",
  },
  {
    name: "友链",
    path: "/friends",
  },
  {
    name: "打赏",
    path: "/donation",
  },
  {
    name: "关于",
    path: "/about",
  },
];

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
