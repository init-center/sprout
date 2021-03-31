import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import BackTop from "../components/BackTop/BackTop";

import styles from "./layout.module.scss";
import GlobalMenu from "../components/GlobalMenu/GlobalMenu";

const Layout: FC = ({ children }) => {
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
    const bodyClassList = document.body.classList;
    isDarkMode ? bodyClassList.add("dark") : bodyClassList.remove("dark");
    return (): void => {
      bodyClassList.remove("dark");
    };
  }, [isDarkMode]);

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
