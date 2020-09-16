import React, { FC } from "react";
import { useRouter } from "next/router";
import {
  ReadFilled,
  EyeFilled,
  HeartFilled,
  MessageFilled,
} from "@ant-design/icons";
import styles from "./PostCard.module.scss";

const PostCard: FC = () => {
  const router = useRouter();

  const navigateTo = (url: string): void => {
    router.push(url);
  };

  return (
    <div className={styles["post-card"]}>
      <img
        width="680px"
        height="440px"
        src="/images/test-img.png"
        className={styles.cover}
        alt="pic"
        onClick={(): void => {
          navigateTo("/post/123");
        }}
      ></img>
      <div className={styles.info}>
        <p className={styles.date}>五月 12, 2018</p>
        <h3
          className={styles.title}
          onClick={(): void => {
            navigateTo("/post/123");
          }}
        >
          后来的我们
        </h3>
        <p className={styles.preview}>
          曾经，我以为自己是一个很幽默的人，比如逗女孩开心，讲的是这样的笑话。一只蚂蚁出门觅食，...
        </p>
        <div className={styles["info-bar"]}>
          <span className={styles.icon}>
            <ReadFilled />
            2418
          </span>
          <span className={styles.icon}>
            <EyeFilled />
            114980
          </span>
          <span className={styles.icon}>
            <HeartFilled />
            407
          </span>
          <span className={styles.icon}>
            <MessageFilled />
            20
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
