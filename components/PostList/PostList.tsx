import React, { FC, useCallback, useState, memo } from "react";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import PostCard from "../PostCard/PostCard";
import styles from "./PostList.module.scss";
import { PostListQueryFields, PostListType } from "../../types/post";
import http, { ResponseData } from "../../utils/http/http";
import { Empty, message } from "antd";
import BackBar from "../BackBar/BackBar";
import { scrollToElement } from "../../utils/scrollToElement";
import combineClassNames from "../../utils/combineClassNames";

interface PostListProps {
  postList: PostListType;
  queryFields?: PostListQueryFields;
}

const PostList: FC<PostListProps> = memo(({ postList, queryFields = {} }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState(postList);

  const fetchPosts = useCallback(
    async (queryFields: PostListQueryFields) => {
      if (isFetching) {
        return;
      }
      const { page = 1, limit = 5 } = queryFields;
      if (page < 1 || limit < 1 || posts.list.length >= posts.page.count) {
        return;
      }
      try {
        setIsFetching(true);
        const result = await http.get<ResponseData<PostListType>>(`/posts`, {
          params: { page, limit, ...queryFields },
        });
        if (result.status === 200 && result.data.code === 2000) {
          const postList = result.data.data;
          const currentLastIndex = posts.list.length - 1;
          setPosts({
            page: postList.page,
            list: [...posts.list, ...postList.list],
          });
          setIsFetching(false);
          setTimeout(() => {
            const newFirst = document.querySelector(
              `.${styles.posts} div:nth-child(${currentLastIndex + 1})`
            );
            scrollToElement(newFirst);
          });
        }
      } catch (err) {
        setIsFetching(false);
        const msg = err?.response?.data?.message;
        if (message && msg) {
          message.destroy();
          message.error(msg);
        }
      }
    },
    [isFetching, posts.list, posts.page.count]
  );

  return (
    <div
      className={combineClassNames(
        styles.container,
        posts.list.length > 0 ? styles["has-post"] : ""
      )}
    >
      {posts.list.length > 0 ? (
        <>
          <header className={styles.header}>
            <Banner post={posts.list[0]} />
          </header>
          <main className={styles.content}>
            <div className={styles.posts}>
              {posts.list.slice(1).map((post) => {
                return <PostCard post={post} key={post.pid} />;
              })}
            </div>
            <div
              className={styles.more}
              onClick={() => {
                fetchPosts({
                  page: posts.page.currentPage + 1,
                  limit: posts.page.size,
                  ...queryFields,
                });
              }}
            >
              {isFetching
                ? "加载中..."
                : posts.page.count > posts.list.length
                ? "加载更多"
                : "没有更多了"}
            </div>
          </main>
        </>
      ) : (
        <div className={styles["no-post"]}>
          <BackBar />
          <Empty description="目前还没有文章呢！" />
        </div>
      )}
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
});

export default PostList;
