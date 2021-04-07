import React, { memo } from "react";
import {
  WeiboOutlined,
  TwitterOutlined,
  GithubOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";
import styles from "./Social.module.scss";

const Social = memo(() => {
  return (
    <ul className={styles["social-bar"]}>
      <li className={styles["social-item"]}>
        <a href="https://weibo.com/mexion" target="_blank" rel="noreferrer">
          <WeiboOutlined />
        </a>
      </li>
      <li className={styles["social-item"]}>
        <a
          href="https://twitter.com/INIT_CENTER"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterOutlined />
        </a>
      </li>
      <li className={styles["social-item"]}>
        <a
          href="https://github.com/init-center"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined />
        </a>
      </li>
      <li className={styles["social-item"]}>
        <a
          href="https://www.zhihu.com/people/mexion"
          target="_blank"
          rel="noreferrer"
        >
          <ZhihuOutlined />
        </a>
      </li>
    </ul>
  );
});

export default Social;
