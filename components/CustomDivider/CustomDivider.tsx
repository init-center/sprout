import { Divider } from "antd";
import React, { CSSProperties, FC, memo } from "react";
import styles from "./CustomDivider.module.scss";

interface CustomDividerProps {
  orientation?: "left" | "right" | "center";
  className?: string;
  dashed?: boolean;
  plain?: boolean;
  style?: CSSProperties;
  type?: "horizontal" | "vertical";
}

export const CustomDivider: FC<CustomDividerProps> = memo(
  (customDividerProps) => {
    const { children } = customDividerProps;
    return (
      <div className={styles["custom-divider"]}>
        <Divider {...customDividerProps}>{children}</Divider>
      </div>
    );
  }
);
