import Head from "next/head";
import React, { useMemo, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import PostCard, { PostItem } from "../components/PostCard/PostCard";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../store";
import { setIsMenuShowAction } from "../store/home/actionCreator";
import combineClassNames from "../utils/combineClassNames";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import http, { ResponseData } from "../utils/http/http";
import ErrorPage from "next/error";
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

  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
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
        <header className={styles.header}>
          <Banner
            post={postList.list[0]}
            isMenuShow={isMenuShow}
            {...bannerCbs}
          />
        </header>
        <main className={styles.content}>
          <div className={styles.posts}>
            {postList.list.slice(1).map((post) => {
              return <PostCard post={post} key={post.pid} />;
            })}
          </div>
          {postList.page.count > postList.list.length && (
            <div className={styles.more}>加载更多</div>
          )}
        </main>
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
      size: 10,
      count: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<PostList>>("/posts");
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
