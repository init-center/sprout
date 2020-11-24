import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import styles from "./layout.module.scss";

const Layout: FC = ({ children }) => {
  const isLoading = useSelector<StateType, boolean>((state) => state.isLoading);

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
      <div className={styles.layout}>{children}</div>
    </ConfigProvider>
  );
};

export default Layout;
