import React, { FC, memo, useCallback } from "react";
import { useRouter } from "next/router";
import { defaultImg } from "../../utils/lazyLoad/imgUrl";
import { EyeFilled, HeartFilled, MessageFilled } from "@ant-design/icons";
import dayjs from "../../utils/dayjs/dayjs";
import styles from "./PostCard.module.scss";
import { PostItem } from "../../types/post";

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = memo(({ post }) => {
  const router = useRouter();

  const navigateTo = useCallback(
    (url: string): void => {
      router.push(url);
    },
    [router]
  );

  return (
    <div className={styles["post-card"]}>
      <img
        width="680px"
        height="440px"
        data-src={post.cover}
        src={defaultImg}
        className={styles.cover}
        alt="pic"
        onClick={(): void => {
          navigateTo(`/posts/${post.pid}`);
        }}
      ></img>
      <div className={styles.info}>
        <p className={styles.date}>
          {dayjs(post.createTime).format("MMMM DD, YYYY")}
        </p>
        <h3
          className={styles.title}
          onClick={(): void => {
            navigateTo(`/posts/${post.pid}`);
          }}
        >
          {post.title}
        </h3>
        <p className={styles.preview}>{post.summary}</p>
        <div className={styles["info-bar"]}>
          <span className={styles.icon}>
            <EyeFilled />
            {post.views}
          </span>
          <span className={styles.icon}>
            <HeartFilled />
            {post.favorites}
          </span>
          <span className={styles.icon}>
            <MessageFilled />
            {post.commentCount}
          </span>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
