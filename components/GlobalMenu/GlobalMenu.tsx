import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import combineClassNames from "../../utils/combineClassNames";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import styles from "./GlobalMenu.module.scss";

const GlobalMenu = () => {
  const router = useRouter();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );
  return (
    <div
      className={combineClassNames(styles.menu, isMenuShow ? styles.show : "")}
    >
      <NavBar />
      <ul className={styles.navigator}>
        <li
          className={styles["nav-item"]}
          onClick={() => {
            router.push("/users");
          }}
        >
          个人中心
        </li>
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
  );
};

export default GlobalMenu;
