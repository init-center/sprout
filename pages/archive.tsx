import React, { useCallback, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import ErrorPage from "next/error";
import { message } from "antd";
import http, { ResponseData } from "../utils/http/http";
import { PostListType } from "../types/post";
import { ArchiveList } from "../types/archive";
import dayjs from "dayjs";
import styles from "../styles/Archive.module.scss";

interface ArchiveProps {
  statusCode: number;
  postList: PostListType;
  archiveList: ArchiveList;
}

const Archive: NextPage<ArchiveProps> = ({
  postList,
  archiveList,
  statusCode,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState<PostListType>(postList);
  const [archives, setArchives] = useState<ArchiveList>(archiveList);

  const fetchPosts = useCallback(
    async (page = 1, limit = 10) => {
      if (page < 1 || limit < 1 || posts.list.length >= posts.page.count) {
        return;
      }
      if (isFetching) return;
      try {
        setIsFetching(true);
        const result = await http.get<ResponseData<PostListType>>(`/posts`, {
          params: { page, limit },
        });
        if (result.status === 200 && result.data.code === 2000) {
          const postList = result.data.data;
          setPosts({
            page: postList.page,
            list: [...posts.list, ...postList.list],
          });
          const newArchives = { ...archives };
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
    [isFetching, posts.list, posts.page.count, archives]
  );

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title="归档" />

      <DefaultWrapper>
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
                      <p className={styles.title}>{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </DefaultWrapper>
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<ArchiveProps> = async (
  _context
) => {
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
    const result = await http.get<ResponseData<PostListType>>(
      "/posts?page=1&limit=20"
    );
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
    },
  };
};

export default Archive;
