import React, { useCallback, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import { default as ErrorPage } from "./_error";
import { Empty, message } from "antd";
import http, { ResponseData } from "../utils/http/http";
import { PostListType } from "../types/post";
import { ArchiveList } from "../types/archive";
import dayjs from "dayjs";
import styles from "../styles/Archive.module.scss";
import combineClassNames from "../utils/combineClassNames";
import { useRouter } from "next/router";

interface ArchiveProps {
  statusCode: number;
  postList: PostListType;
  archiveList: ArchiveList;
  keyword: string;
}

const Archive: NextPage<ArchiveProps> = ({
  postList,
  archiveList,
  statusCode,
  keyword,
}) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState<PostListType>(postList);
  const [archives, setArchives] = useState<ArchiveList>(archiveList);

  const fetchPosts = useCallback(
    async (page = 1, limit = 15) => {
      if (page < 1 || limit < 1 || posts.list.length >= posts.page.count) {
        return;
      }
      if (isFetching) return;
      try {
        setIsFetching(true);
        const result = await http.get<ResponseData<PostListType>>(`/posts`, {
          params: { page, limit, keyword },
        });
        if (result.status === 200 && result.data.code === 2000) {
          const postList = result.data.data;
          setPosts({
            page: postList.page,
            list: [...postList.list],
          });
          const newArchives = {};
          for (const post of postList.list) {
            const year = dayjs(post.createTime).year();
            if (!newArchives[year]) {
              newArchives[year] = [];
            }
            newArchives[year].push(post);
          }
          setArchives(newArchives);
          setIsFetching(false);
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
    [isFetching, keyword, posts.list.length, posts.page.count]
  );

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title="归档" />

      <DefaultWrapper>
        {posts.page.count < 1 ? (
          <Empty className={styles.empty} description="暂无文章" />
        ) : (
          <div className={styles.container}>
            {Object.keys(archives)
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => (
                <div className={styles["archive-item"]} key={year}>
                  <div className={styles.year}>{year}</div>
                  <ul className={styles.list}>
                    {archives[year].map((item) => (
                      <li className={styles["post-item"]} key={item.pid}>
                        <span className={styles.date}>
                          {dayjs(item.createTime).format("MM-DD")}
                        </span>
                        <p
                          className={styles.title}
                          onClick={() => router.push(`posts/${item.pid}`)}
                        >
                          {item.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            <div className={styles["turn-bar"]}>
              {posts.page.currentPage > 1 && (
                <span
                  className={combineClassNames(
                    styles.turn,
                    styles["turn-left"]
                  )}
                  onClick={() => {
                    fetchPosts(posts.page.currentPage - 1);
                  }}
                >
                  ← 上一页
                </span>
              )}
              {posts.page.count / posts.page.size > 1 && (
                <span
                  className={combineClassNames(
                    styles.turn,
                    styles["turn-right"]
                  )}
                  onClick={() => {
                    fetchPosts(posts.page.currentPage + 1);
                  }}
                >
                  下一页 →
                </span>
              )}
            </div>
          </div>
        )}
      </DefaultWrapper>
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<ArchiveProps> = async (
  context
) => {
  let keyword = context.query.keyword as string;
  if (!keyword) {
    keyword = null;
  }
  let postList: PostListType = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };

  const archiveList: ArchiveList = {};
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<PostListType>>("/posts", {
      params: {
        limit: 15,
        page: 1,
        keyword,
      },
    });
    if (result.status === 200 && result.data.code === 2000) {
      postList = result.data.data;

      for (const post of postList.list) {
        const year = dayjs(post.createTime).year();
        if (!archiveList[year]) {
          archiveList[year] = [];
        }
        archiveList[year].push(post);
      }
    }
    statusCode = result.status;
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      postList,
      archiveList,
      statusCode,
      keyword,
    },
  };
};

export default Archive;
