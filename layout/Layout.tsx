import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import BackTop from "../components/BackTop/BackTop";
import styles from "./layout.module.scss";
import GlobalMenu from "../components/GlobalMenu/GlobalMenu";
import http, { ResponseData } from "../utils/http/http";
import { SET_IS_DARK_MODE } from "../store/global/actionTypes";
import { setIsDarkModeAction } from "../store/global/actionCreator";
import { CursorSpecialEffects } from "../utils/clickEffect/clickEffect";

const Layout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector<StateType, boolean>((state) => state.isLoading);
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );

  const isDarkMode = useSelector<StateType, boolean>(
    (state) => state.isDarkMode
  );

  useEffect(() => {
    console.log(
      "%c Github %c",
      "background:#24272A; color:#ffffff",
      "",
      "https://github.com/init-center/sprout"
    );
  }, []);

  useLayoutEffect(() => {
    const cursorSpecialEffects = new CursorSpecialEffects();
    cursorSpecialEffects.init();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      isLoading
        ? body.classList.add("loading")
        : body.classList.remove("loading");

      return (): void => {
        body.classList.remove("loading");
      };
    }
  }, [isLoading]);

  useEffect(() => {
    const bodyClassList = document.body.classList;
    isMenuShow
      ? bodyClassList.add("menu-show")
      : bodyClassList.remove("menu-show");
    return (): void => {
      bodyClassList.remove("menu-show");
    };
  }, [isMenuShow]);

  useEffect(() => {
    const dark = sessionStorage.getItem("isDark");
    if (!dark) {
      return;
    }
    if (dark === "true") {
      dispatch(setIsDarkModeAction(true));
    } else {
      dispatch(setIsDarkModeAction(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const bodyClassList = document.body.classList;
    isDarkMode ? bodyClassList.add("dark") : bodyClassList.remove("dark");
    return (): void => {
      bodyClassList.remove("dark");
    };
  }, [isDarkMode]);

  const createView = useCallback(async () => {
    try {
      await http.post<ResponseData>("/views", {
        url: window.location.href,
      });
    } catch {}
  }, []);

  useEffect(() => {
    createView();
  }, [createView]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.layout}>
        {children}
        <BackTop />
        <GlobalMenu />
      </div>
    </ConfigProvider>
  );
};

export default Layout;
