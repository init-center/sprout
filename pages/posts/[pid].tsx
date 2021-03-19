import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  HomeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  HeartOutlined,
  HeartTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import CommentList from "../../components/CommentList/CommentList";
import MenuItem from "../../components/MenuItem/MenuItem";
import { useRouter } from "next/router";
import md2html, { Title, TitleChildrenIdMap } from "../../utils/md2html";
import combineClassNames from "../../utils/combineClassNames";
import styles from "./post.module.scss";
import mdStyles from "../../styles/mdStyle.module.scss";
import { GetServerSideProps, NextPage } from "next";
import ErrorPage from "next/error";
import http, { Response, ResponseData } from "../../utils/http/http";
import { percent } from "../../utils/percent";
import throttle from "../../utils/throttle/throttle";
import dayjs from "../../utils/dayjs/dayjs";
import { useImgLazyLoad } from "../../utils/lazyLoad/lazyLoad";
import Footer from "../../components/Footer/Footer";
import { PostDetail } from "../../types/post";
import { ParentComments } from "../../types/comment";
import Head from "next/head";
import { config } from "../../config/config";

interface PostProps {
  post: PostDetail;
  parentComments: ParentComments;
  statusCode: number;
}

const Post: NextPage<PostProps> = ({ post, parentComments, statusCode }) => {
  const router = useRouter();
  const [article, setArticle] = useState("");
  const [titles, setTitles] = useState<Title[]>([]);
  const [allTitlesId, setAllTitlesId] = useState<string[]>([]);
  const [titleChildrenIdMap, setTitleChildrenIdMap] = useState<
    TitleChildrenIdMap
  >({});
  const [isTitleMenuShow, setIsTitleMenuShow] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isSubTitleShow, setIsSubTitleShow] = useState(false);
  const viewProgressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [playerProgressPercent, setPlayerProgressPercent] = useState(0);
  const [activeTitleId, setActiveTitleId] = useState("");

  useImgLazyLoad();

  const handleViewProgress = () => {
    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // @finalScrollHeight 滚动条滚到底时,滚动条距离页面顶部的距离
    const finalScrollHeight = documentHeight - clientHeight;
    const progressPercent = `${(scrollTop / finalScrollHeight) * 100}%`;
    const progressBar = viewProgressRef.current;
    progressBar && (progressBar.style.width = progressPercent);
  };

  const handleSubTitleShow = () => {
    const title = titleRef.current;
    const titleTop = title.getBoundingClientRect().top;
    if (titleTop <= 50) {
      setIsSubTitleShow(true);
    } else {
      setIsSubTitleShow(false);
    }
  };

  const handleActiveTitle = useCallback(() => {
    let activeTitleId = "";
    let lastActiveTitleTop = -999999;
    for (let i = 0; i < allTitlesId.length; i++) {
      const title = document.getElementById(allTitlesId[i]);
      const top = title.getBoundingClientRect().top;
      if (top <= 28 && top > lastActiveTitleTop) {
        activeTitleId = allTitlesId[i];
        lastActiveTitleTop = top;
      }
    }
    setActiveTitleId(activeTitleId);
  }, [allTitlesId]);

  const handleScroll = useCallback(() => {
    handleViewProgress();
    handleSubTitleShow();
    handleActiveTitle();
  }, [handleActiveTitle]);

  useEffect(() => {
    const scrollHandler = throttle(handleScroll);
    window.addEventListener("scroll", scrollHandler, false);
    return () => {
      window.removeEventListener("scroll", scrollHandler, false);
    };
  }, [handleScroll]);

  useEffect(() => {
    // compile md to html.
    const result = md2html(post.content, true);
    setTitles(result.titles);
    setAllTitlesId(result.titleIds);
    setTitleChildrenIdMap(result.titleChildrenIdMap);
    setArticle(result.htmlContent);
  }, [post.content]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.ontimeupdate = () => {
      setPlayerProgressPercent(percent(player.currentTime, player.duration));
    };
    player.onplay = () => {
      setIsPlaying(true);
    };
    player.onpause = () => {
      setIsPlaying(false);
    };
    player.onended = () => {
      setIsPlaying(false);
    };
    player.onerror = () => {
      setIsPlaying(false);
    };

    setTimeout(() => {
      player.muted = true;
      player.play();
      setTimeout(() => (player.muted = false));
    });

    return () => {
      const player = playerRef.current;
      player.ontimeupdate = player.onplay = player.onpause = player.onended = player.onerror = null;
      playerRef.current = null;
    };
  }, []);

  // toggle favorite
  const toggleFavorite = async () => {
    let result: Response<ResponseData>;
    try {
      if (!isFavorite) {
        result = await http.post<ResponseData>(`/favorites/posts/${post.pid}`);
        if (result.status === 201) {
          setIsFavorite(true);
          message.success("喜欢了这篇文章！");
        }
      } else {
        result = await http.delete<ResponseData>(`favorites/posts/${post.pid}`);
        if (result.status === 200) {
          setIsFavorite(false);
          message.success("已取消喜欢！");
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      const statusCode = error?.response?.status;
      if (msg) {
        message.error(msg);
      }
      if (statusCode === 401) {
        router.push("/login");
      }
    }
  };

  const checkFavorite = useCallback(async () => {
    try {
      await http.get<ResponseData>(`/favorites/posts/${post.pid}`);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 404) {
        setIsFavorite(true);
      }
    }
  }, [post.pid]);

  // check is favorite post
  useEffect(() => {
    checkFavorite();
  }, [checkFavorite]);

  if (statusCode === 404) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <div className={styles["post-wrapper"]}>
      <Head>
        <title>
          {post.title} - {config.name}
        </title>
      </Head>
      <div className={styles["top-bar"]}>
        <div className={styles["icon-box"]}>
          <div
            className={styles.icon}
            onClick={() => {
              router.push("/");
            }}
          >
            <HomeOutlined />
          </div>
          <div
            className={styles.icon}
            onClick={() => {
              const player = playerRef.current;
              if (!player) return;
              isPlaying ? player.pause() : player.play();
            }}
          >
            {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </div>
        </div>
        <h3
          className={combineClassNames(
            styles.subtitle,
            isSubTitleShow ? "" : styles.hidden
          )}
        >
          {post.title}
        </h3>
        <div className={styles["icon-box"]}>
          <div
            className={styles.icon}
            onClick={() => {
              toggleFavorite();
            }}
          >
            {isFavorite ? (
              <HeartTwoTone twoToneColor=" #f62459" />
            ) : (
              <HeartOutlined />
            )}
          </div>
          <div
            className={styles.icon}
            onClick={() => {
              setIsTitleMenuShow(!isTitleMenuShow);
            }}
          >
            {isTitleMenuShow ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div
          className={styles["music-progress"]}
          style={{ width: `${playerProgressPercent}%` }}
        ></div>
        <div className={styles["view-progress"]} ref={viewProgressRef}></div>
      </div>
      <div className={styles.post}>
        <article className={styles.article}>
          <h1 className={styles.title} ref={titleRef}>
            {post.title}
          </h1>
          <div className={styles.stuff}>
            <span className={styles["stuff-item"]}>
              {dayjs.tz(post.createTime).format("MMMM DD, YYYY")}
            </span>
            <span className={styles["stuff-item"]}>阅读 {post.views}</span>
            <span className={styles["stuff-item"]}>
              字数 {post.content.length}
            </span>
            <span className={styles["stuff-item"]}>
              评论 {post.commentCount}
            </span>
            <span className={styles["stuff-item"]}>喜欢 1025</span>
          </div>
          <ul className={styles["tag-list"]}>
            {post.tags.map((tag) => {
              return (
                <li className={styles["tag-item"]} key={tag.id}>
                  {tag.name}
                </li>
              );
            })}
          </ul>
          <div
            className={combineClassNames(styles.content, mdStyles["md-box"])}
            dangerouslySetInnerHTML={{ __html: article }}
          ></div>
          <audio ref={playerRef} loop preload="auto">
            <source type="audio/mpeg" src={post.bgm}></source>
          </audio>
        </article>
        <CommentList
          commentsData={parentComments}
          commentCount={post.commentCount}
          pid={post.pid}
          postUid={post.uid}
        />
        <div
          className={combineClassNames(
            styles["title-menu"],
            isTitleMenuShow ? styles["title-menu-show"] : ""
          )}
        >
          {titles.map((item, idx) => {
            return (
              <MenuItem
                index={`${idx + 1}.`}
                title={item}
                depth={1}
                key={item.id}
                activeTitleId={activeTitleId}
                titleChildrenIdMap={titleChildrenIdMap}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<PostProps> = async (
  context
) => {
  const pid = context.query.pid;
  let post: PostDetail = {
    uid: "",
    pid: "",
    categoryId: -1,
    categoryName: "",
    tags: [],
    title: "",
    cover: "",
    summary: "",
    views: 0,
    createTime: "",
    topTime: "",
    commentCount: 0,
    bgm: "",
    content: "",
    commentOpen: 0,
    updateTime: "",
  };
  let parentComments: ParentComments = {
    page: {
      count: 0,
      currentPage: 0,
      size: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<PostDetail>>(`/posts/${pid}`);
    statusCode = result.status;
    if (statusCode === 200 && result.data.code === 2000) {
      post = result.data.data;
    }
  } catch (error) {
    context.res.statusCode = 404;
    statusCode = error?.response?.status ?? 404;
  }

  if (statusCode === 200) {
    try {
      const result = await http.get<ResponseData<ParentComments>>(
        `/comments/posts/${pid}`,
        {
          params: {
            limit: 10,
            page: 1,
          },
        }
      );
      statusCode = result.status;
      if (statusCode === 200 && result.data.code === 2000) {
        parentComments = result.data.data;
      }
    } catch (error) {}
  }

  return {
    props: {
      post,
      statusCode,
      parentComments,
    },
  };
};

export default Post;