import Head from "next/head";
import React, { FC, useMemo, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import PostCard from "../components/PostCard/PostCard";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../store";
import { setIsMenuShowAction } from "../store/home/actionCreator";
import combineClassNames from "../utils/combineClassNames";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";

const Home: FC = () => {
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
  }, []);

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
            © 2020 Sprout. Powered by SUPER_AI.
          </div>
        </div>
        <header className={styles.header}>
          <Banner isMenuShow={isMenuShow} {...bannerCbs} />
        </header>
        <main className={styles.content}>
          <div className={styles.posts}>
            <PostCard></PostCard>
            <PostCard></PostCard>
          </div>
          <div className={styles.more}>加载更多</div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.ICP}>桂ICP备12345678号</div>
        </footer>
      </div>
    </>
  );
};

export default Home;
