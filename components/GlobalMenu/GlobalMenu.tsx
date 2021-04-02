import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store";
import { setIsMenuShowAction } from "../../store/global/actionCreator";
import combineClassNames from "../../utils/combineClassNames";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import styles from "./GlobalMenu.module.scss";

const navList = [
  {
    name: "个人中心",
    path: "/users",
  },
  {
    name: "标签",
    path: "/tags",
  },
  {
    name: "分类",
    path: "/categories",
  },
  {
    name: "归档",
    path: "/archive",
  },
  {
    name: "友链",
    path: "/friends",
  },
  {
    name: "关于",
    path: "/about",
  },
];

const GlobalMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );

  const navTo = useCallback(
    (path: string) => {
      router.push(path);
      dispatch(setIsMenuShowAction(false));
    },
    [dispatch, router]
  );

  return (
    <div
      className={combineClassNames(styles.menu, isMenuShow ? styles.show : "")}
    >
      <NavBar />
      <ul className={styles.navigator}>
        {navList.map((nav) => (
          <li
            className={styles["nav-item"]}
            key={nav.name}
            onClick={() => {
              navTo(nav.path);
            }}
          >
            {nav.name}
          </li>
        ))}
      </ul>
      <div className={styles.copyright}>
        <Footer />
      </div>
    </div>
  );
};

export default GlobalMenu;
