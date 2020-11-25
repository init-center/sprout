import Head from "next/head";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import PostCard, { PostItem } from "../components/PostCard/PostCard";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../store";
import { setIsMenuShowAction } from "../store/home/actionCreator";
import { message } from "antd";
import combineClassNames from "../utils/combineClassNames";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import http, { ResponseData } from "../utils/http/http";
import ErrorPage from "next/error";
import { useImgLazyLoad } from "../utils/lazyLoad/lazyLoad";
import styles from "../styles/Home.module.scss";

interface PostPage {
  currentPage: number;
  size: number;
  count: number;
}

interface PostList {
  page: PostPage;
  list: PostItem[];
}
interface HomeProps {
  statusCode: number;
  postList: PostList;
}

const Home: NextPage<HomeProps> = ({ postList, statusCode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [posts, setPosts] = useState(postList);
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );

  const [isFetching, setIsFetching] = useState(false);

  useImgLazyLoad();

  const fetchPosts = useCallback(
    (page = 1, limit = 10) => {
      (async () => {
        if (page < 1 || limit < 1 || posts.list.length >= posts.page.count) {
          return;
        }
        if (isFetching) return;
        try {
          setIsFetching(true);
          const result = await http.get<ResponseData<PostList>>(
            `/posts?page=${page}&limit=${limit}`
          );
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
              if (newFirst) {
                const newFirstTop = newFirst.getBoundingClientRect().top;
                const scrollTop = document.documentElement.scrollTop;
                window.scrollTo({
                  left: 0,
                  top: newFirstTop + scrollTop,
                  behavior: "smooth",
                });
              }
            });
          }
        } catch (err) {
          setIsFetching(false);
          const msg = err?.response?.message;
          if (message) {
            message.error(msg);
          }
        }
      })();
    },
    [isFetching, posts.list, posts.page.count]
  );

  useEffect(() => {
    const bodyClassList = document.body.classList;
    isMenuShow
      ? bodyClassList.add("menu-show")
      : bodyClassList.remove("menu-show");
  }, [isMenuShow]);

  const bannerCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsMenuShow: setIsMenuShowAction,
      },
      dispatch
    );
  }, [dispatch]);

  if (statusCode === 404) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        <title>Sprout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div
          className={combineClassNames(
            styles.menu,
            isMenuShow ? styles.show : ""
          )}
        >
          <ul className={styles.navigator}>
            <li className={styles["nav-item"]}>Contact</li>
            <li className={styles["nav-item"]}>Links</li>
            <li className={styles["nav-item"]}>Archive</li>
            <li className={styles["nav-item"]}>Rainy</li>
            <li
              className={styles["nav-item"]}
              onClick={(): void => {
                router.push("/about");
              }}
            >
              About
            </li>
            <li className={styles["nav-item"]}>Q&A</li>
          </ul>
          <div className={styles.copyright}>
            <Footer />
          </div>
        </div>
        {posts.list.length > 0 ? (
          <>
            <header className={styles.header}>
              <Banner
                post={posts.list[0]}
                isMenuShow={isMenuShow}
                {...bannerCbs}
              />
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
                  fetchPosts(posts.page.currentPage + 1, posts.page.size);
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
          <h1 className={styles["no-post"]}>目前还没有文章呢！</h1>
        )}
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  let postList: PostList = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<PostList>>(
      "/posts?page=1&limit=5"
    );
    if (result.status === 200 && result.data.code === 2000) {
      postList = result.data.data;
    }
    statusCode = result.status;
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      postList,
      statusCode,
    },
  };
};

export default Home;
