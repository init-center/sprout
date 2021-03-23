import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import BackTop from "../components/BackTop/BackTop";

import styles from "./layout.module.scss";

const Layout: FC = ({ children }) => {
  const isLoading = useSelector<StateType, boolean>((state) => state.isLoading);

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

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.layout}>
        {children}
        <BackTop />
      </div>
    </ConfigProvider>
  );
};

export default Layout;
