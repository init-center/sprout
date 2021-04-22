import { Feed } from "feed";
import md2html from "../md2html/md2html";
import http, { ResponseData } from "../http/http";
import { PostDetail, PostDetailListType } from "../../types/post";
import { genLicenceHTMLString } from "../genLicenceHTMLString/genLicenceHTMLString";
import {
  DEFAULT_AUTHOR_URL,
  DEFAULT_WEBSITE_URL,
} from "../../constants/defaultConfig";

export interface RssOptions {
  websiteName: string;
  websiteUrl: string;
  adminName: string;
  email: string;
  link: string;
  description: string;
}

async function generateAtomFeed(options: RssOptions) {
  const date = new Date();
  const author = {
    name: options.adminName,
    email: options.email,
    link: options.link,
  };

  const feed = new Feed({
    title: options.websiteName,
    description: options.description,
    id: options.websiteUrl,
    link: options.websiteUrl,
    language: "zh-CN",
    image: `${options.websiteUrl}/favicon.ico`,
    favicon: `${options.websiteUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${
      options.websiteName
    } - ${options.adminName}`,
    updated: date,
    feedLinks: {
      atom: `${options.websiteUrl}/rss`,
    },
    author,
  });

  let posts: PostDetail[] = [];

  try {
    const result = await http.get<ResponseData<PostDetailListType>>(
      "/posts/detail",
      {
        params: {
          limit: 10,
          page: 1,
        },
      }
    );
    if (result.status === 200 && result.data.code === 2000) {
      posts = result.data.data.list;
    }
  } catch (error) {}

  posts.forEach((post) => {
    const url = `${options.websiteUrl}/posts/${post.pid}`;
    const copyright = genLicenceHTMLString({
      title: post.title,
      author: post.userName,
      authorUrl: DEFAULT_AUTHOR_URL,
      postLink: `${DEFAULT_WEBSITE_URL}/posts/${post.pid}`,
      createTime: post.createTime,
    });
    feed.addItem({
      title: post.title,
      id: post.pid,
      link: url,
      category: [
        {
          term: post.categoryName,
          scheme: `${options.websiteUrl}/categories/${post.categoryName}`,
        },
      ],
      description: post.summary,
      content: md2html(post.content, false, false).htmlContent + copyright,
      author: [author],
      contributor: [author],
      image: post.cover,
      audio: post.bgm,
      published: new Date(post.createTime),
      date: new Date(post.updateTime),
      copyright,
    });
  });

  return feed.atom1();
}

export default generateAtomFeed;
