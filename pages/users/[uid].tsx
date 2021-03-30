import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { BanStatus, Group, UidInfo, UserPublicInfo } from "../../types/users";
import { Empty, Image, message } from "antd";
import ErrorPage from "next/error";
import http, { ResponseData } from "../../utils/http/http";
import styles from "./users.module.scss";
import { DefaultWrapper } from "../../layout/DefaultWrapper/DefaultWrapper";
import combineClassNames from "../../utils/combineClassNames";
import { FavoritePostList } from "../../types/post";
import { CommentChildren } from "../../types/comment";
import dayjs from "dayjs";
import throttle from "../../utils/throttle/throttle";
import md2html from "../../utils/md2html/md2html";
import striptags from "striptags";
import { SEO } from "../../components/SEO/SEO";

type Tabs = ["喜欢", "评论"];
const tabs: Tabs = ["喜欢", "评论"];

interface FavoritePostsType {
  key: Tabs[0];
  data: FavoritePostList;
}

interface CommentsType {
  key: Tabs[1];
  data: CommentChildren;
}
interface UsersProps {
  favoritePosts: FavoritePostsType;
  commentList: CommentsType;
  userPublicInfo: UserPublicInfo;
  statusCode: number;
}

const Users: NextPage<UsersProps> = ({
  favoritePosts,
  commentList,
  userPublicInfo,
  statusCode,
}) => {
  const router = useRouter();
  const [currentShow, setCurrentShow] = useState<string>(tabs[0]);
  const [favorites, setFavorites] = useState(favoritePosts);
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(false);
  const [comments, setComments] = useState(commentList);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const fetchMoreFavorites = useCallback(async () => {
    if (
      favorites.data.list.length >= favorites.data.page.count ||
      isFetchingFavorites
    ) {
      return;
    }

    setIsFetchingFavorites(true);
    try {
      const result = await http.get<ResponseData<FavoritePostList>>(
        "/favorites",
        {
          params: {
            uid: router.query.uid,
            page: favorites.data.page.currentPage + 1,
            limit: favorites.data.page.size,
          },
        }
      );
      if (result.status === 200 && result.data.code === 2000) {
        setFavorites({
          key: favorites.key,
          data: {
            page: result.data.data.page,
            list: [...favorites.data.list, ...result.data.data.list],
          },
        });
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      if (msg) {
        message.destroy();
        message.error(msg);
      }
    } finally {
      setIsFetchingFavorites(false);
    }
  }, [
    favorites.data.list,
    favorites.data.page.count,
    favorites.data.page.currentPage,
    favorites.data.page.size,
    favorites.key,
    isFetchingFavorites,
    router.query.uid,
  ]);

  const fetchMoreComments = useCallback(async () => {
    if (
      comments.data.list.length >= comments.data.page.count ||
      isFetchingComments
    ) {
      return;
    }

    setIsFetchingComments(true);
    try {
      const result = await http.get<ResponseData<CommentChildren>>(
        "/comments",
        {
          params: {
            uid: router.query.uid,
            page: comments.data.page.currentPage + 1,
            limit: comments.data.page.size,
          },
        }
      );
      if (result.status === 200 && result.data.code === 2000) {
        setComments({
          key: comments.key,
          data: {
            page: result.data.data.page,
            list: [...comments.data.list, ...result.data.data.list],
          },
        });
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      if (msg) {
        message.destroy();
        message.error(msg);
      }
    } finally {
      setIsFetchingComments(false);
    }
  }, [
    comments.data.list,
    comments.data.page.count,
    comments.data.page.currentPage,
    comments.data.page.size,
    comments.key,
    isFetchingComments,
    router.query.uid,
  ]);

  const bottomFetchData = useCallback(() => {
    const isBottom =
      document.documentElement.scrollHeight -
        (document.documentElement.clientHeight +
          document.documentElement.scrollTop) <
      60;

    if (isBottom) {
      currentShow === tabs[0] && fetchMoreFavorites();
      currentShow === tabs[1] && fetchMoreComments();
    }
  }, [currentShow, fetchMoreComments, fetchMoreFavorites]);

  useEffect(() => {
    const throttleFetch = throttle(bottomFetchData, 66);
    document.addEventListener("scroll", throttleFetch);
    return () => {
      document.removeEventListener("scroll", throttleFetch);
    };
  }, [bottomFetchData]);

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }
  return (
    <>
      <SEO title={`${userPublicInfo.name}的个人中心`} />
      <DefaultWrapper>
        <div className={styles["user-container"]}>
          <div className={styles["user-info-box"]}>
            <Image className={styles.avatar} src={userPublicInfo.avatar} />
            {userPublicInfo.group === Group.ADMIN && (
              <span className={styles.admin}>管理员</span>
            )}
            {userPublicInfo.isBaned === BanStatus.YES && (
              <span className={styles.ban}>封禁中</span>
            )}
            <div className={styles.name}>{userPublicInfo.name}</div>
            <div className={styles.uid}>UID: {userPublicInfo.uid}</div>
            <h4 className={styles.intro}>
              {userPublicInfo.intro || "这个人很懒，还没有填写简介！"}
            </h4>
          </div>
          <ul className={styles["list-nav"]}>
            {tabs.map((tab) => (
              <li
                className={combineClassNames(
                  styles["list-nav-item"],
                  currentShow === tab ? styles.active : ""
                )}
                key={tab}
                onClick={() => {
                  setCurrentShow(tab);
                  bottomFetchData();
                }}
              >
                {tab}
              </li>
            ))}
          </ul>
          {currentShow === favorites.key && (
            <ul className={styles["list-box"]}>
              {favorites.data.list.length > 0 ? (
                favorites.data.list.map((post) => (
                  <li
                    className={styles["list-item"]}
                    key={post.pid}
                    onClick={() => {
                      router.push(`/posts/${post.pid}`);
                    }}
                  >
                    <div className={styles["post-meta"]}>
                      喜欢于{" "}
                      {dayjs(post.favoriteTime).format("YYYY/MM/DD HH:mm")}
                    </div>
                    <h2 className={styles["post-title"]}>{post.title}</h2>
                    <p className={styles["post-summary"]}>{post.summary}</p>
                  </li>
                ))
              ) : (
                <Empty description="该用户没有喜欢的文章" />
              )}
              {favorites.data.list.length >= favorites.data.page.count &&
                favorites.data.page.count !== 0 && (
                  <div className={styles["in-bottom"]}>
                    ---- 已经到底了 ----
                  </div>
                )}
            </ul>
          )}

          {currentShow === comments.key && (
            <ul className={styles["list-box"]}>
              {comments.data.list.length > 0 ? (
                comments.data.list.map((comment) => (
                  <li
                    className={styles["list-item"]}
                    key={comment.cid}
                    onClick={() => {
                      router.push(
                        `/posts/${comment.pid}?replyCid=${comment.cid}`
                      );
                    }}
                  >
                    <div className={styles["post-meta"]}>
                      评论于{" "}
                      {dayjs(comment.createTime).format("YYYY-MM-DD HH:mm")}
                    </div>
                    <h2 className={styles["post-title"]}>
                      {comment.postTitle}
                    </h2>
                    <p className={styles["comment-content"]}>
                      {`${
                        comment.targetName ? `回复 ${comment.targetName}：` : ""
                      } ${striptags(md2html(comment.content).htmlContent)}`}
                    </p>
                  </li>
                ))
              ) : (
                <Empty description="该用户没有评论" />
              )}
              {comments.data.list.length >= comments.data.page.count &&
                comments.data.page.count !== 0 && (
                  <div className={styles["in-bottom"]}>
                    ---- 已经到底了 ----
                  </div>
                )}
            </ul>
          )}
        </div>
      </DefaultWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UsersProps> = async (
  context
) => {
  const uid = context.query.uid;
  const favoritePosts: FavoritePostsType = {
    key: tabs[0],
    data: {
      page: {
        currentPage: 0,
        count: 0,
        size: 0,
      },
      list: [],
    },
  };
  const commentList: CommentsType = {
    key: tabs[1],
    data: {
      page: {
        currentPage: 0,
        count: 0,
        size: 0,
      },
      list: [],
    },
  };

  let userPublicInfo: UserPublicInfo = {
    uid: "",
    name: "",
    avatar: "",
    intro: "",
    createTime: "",
    isBaned: BanStatus.NO,
    group: Group.DEFAULT,
  };

  let statusCode = 200;

  try {
    const result = await http.get<ResponseData<UserPublicInfo>>(
      `/users/public/${uid}`
    );
    if (result.status === 200 && result.data.code === 2000) {
      userPublicInfo = result.data.data;
    }
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
    return {
      props: {
        favoritePosts,
        commentList,
        userPublicInfo,
        statusCode,
      },
    };
  }

  try {
    const result = await http.get<ResponseData<FavoritePostList>>(
      "/favorites",
      {
        params: {
          uid,
          page: 1,
          limit: 5,
        },
      }
    );
    if (result.status === 200 && result.data.code === 2000) {
      favoritePosts.data = result.data.data;
    }

    const result2 = await http.get<ResponseData<CommentChildren>>("/comments", {
      params: {
        uid,
        page: 1,
        limit: 5,
      },
    });

    if (result2.status === 200 && result2.data.code === 2000) {
      commentList.data = result2.data.data;
    }
  } catch (err) {}
  return {
    props: {
      favoritePosts,
      commentList,
      userPublicInfo,
      statusCode,
    },
  };
};

export default Users;
