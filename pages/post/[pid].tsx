import React, { FC, useEffect, useState } from "react";
import {
  HomeOutlined,
  PlayCircleOutlined,
  HeartOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import md2html from "../../utils/md2html";
import styles from "./post.module.scss";

const Post: FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [article, setArticle] = useState("");

  useEffect(() => {

    // todo compile md to html.
    // An example of markdown
    const md = "```javascript\rconst a = 100;\rconsole.log(a);\r```";

    const result = md2html(md);
    console.log(result.titles);
    setArticle(result.htmlContent);
  }, []);

  return (
    <div className={styles.post}>
      <div className={styles["top-bar"]}>
        <div className={styles["icon-box"]}>
          <div
            className={styles.icon}
            onClick={(): void => {
              router.push("/");
            }}
          >
            <HomeOutlined />
          </div>
          <div className={styles.icon}>
            <PlayCircleOutlined />
          </div>
        </div>
        <h3 className={styles.subtitle}>后来的我们</h3>
        <div className={styles["icon-box"]}>
          <div className={styles.icon}>
            <HeartOutlined />
          </div>
          <div className={styles.icon}>
            <ScanOutlined />
          </div>
        </div>
        <div className={styles["music-progress"]}></div>
        <div className={styles["view-progress"]}></div>
      </div>
      <article className={styles.article}>
        <h1 className={styles.title}>后来的我们</h1>
        <div className={styles.stuff}>
          <span className={styles["stuff-item"]}>五月 12, 2.18</span>
          <span className={styles["stuff-item"]}>阅读 10267</span>
          <span className={styles["stuff-item"]}>字数 2900</span>
          <span className={styles["stuff-item"]}>评论 115</span>
          <span className={styles["stuff-item"]}>喜欢 1025</span>
        </div>
        <ul className={styles["tag-list"]}>
          <li className={styles["tag-item"]}>博客</li>
          <li className={styles["tag-item"]}>杂谈</li>
        </ul>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article }}
        ></div>
      </article>
    </div>
  );
};

export default Post;
