import React, { FC } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./BackBar.module.scss";

export const BackBar: FC = () => {
  const router = useRouter();
  return (
    <div className={styles["back-bar"]}>
      <div
        className={styles.icon}
        onClick={(): void => {
          router.back();
        }}
      >
        <ArrowLeftOutlined />
      </div>
    </div>
  );
};
