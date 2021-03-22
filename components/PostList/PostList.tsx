import React, {
  useMemo,
  useEffect,
  FC,
  useCallback,
  useState,
  memo,
} from "react";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import PostCard from "../PostCard/PostCard";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../../store";
import { setIsMenuShowAction } from "../../store/home/actionCreator";
import combineClassNames from "../../utils/combineClassNames";
import { useRouter } from "next/router";
import { useImgLazyLoad } from "../../utils/lazyLoad/lazyLoad";
import styles from "./PostList.module.scss";
import { PostListQueryFields, PostListType } from "../../types/post";
import http, { ResponseData } from "../../utils/http/http";
import { Empty, message } from "antd";
import { BackBar } from "../BackBar/BackBar";

interface PostListProps {
  postList: PostListType;
  queryFields?: PostListQueryFields;
}

const PostList: FC<PostListProps> = memo(({ postList, queryFields = {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState(postList);

  const fetchPosts = useCallback(
    (queryFields: PostListQueryFields) => {
      (async () => {
        const { page = 1, limit = 5 } = queryFields;
        if (page < 1 || limit < 1 || posts.list.length >= posts.page.count) {
          return;
        }
        if (isFetching) return;
        try {
          setIsFetching(true);
          const result = await http.get<ResponseData<PostListType>>(`/posts`, {
            params: { ...queryFields, page, limit },
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
          const msg = err?.response?.data?.message;
          if (message && msg) {
            message.destroy();
            message.error(msg);
          }
        }
      })();
    },
    [isFetching, posts.list, posts.page.count]
  );

  useImgLazyLoad();

  useEffect(() => {
    dispatch(setIsMenuShowAction(false));
  }, [dispatch]);

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

  return (
    <div className={styles.container}>
      {posts.list.length > 0 ? (
        <div>
          <div
            className={combineClassNames(
              styles.menu,
              isMenuShow ? styles.show : ""
            )}
          >
            <ul className={styles.navigator}>
              <li
                className={styles["nav-item"]}
                onClick={() => {
                  router.push("/tags");
                }}
              >
                标签
              </li>
              <li
                className={styles["nav-item"]}
                onClick={() => {
                  router.push("/categories");
                }}
              >
                分类
              </li>
              <li
                className={styles["nav-item"]}
                onClick={() => {
                  router.push("/archive");
                }}
              >
                归档
              </li>
              <li
                className={styles["nav-item"]}
                onClick={() => {
                  router.push("/about");
                }}
              >
                关于
              </li>
            </ul>
            <div className={styles.copyright}>
              <Footer />
            </div>
          </div>
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
                fetchPosts({
                  ...queryFields,
                  page: posts.page.currentPage + 1,
                  limit: posts.page.size,
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
        </div>
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
