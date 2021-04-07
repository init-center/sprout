import React, { memo } from "react";
import { BackTop as BT } from "antd";
import { UpOutlined } from "@ant-design/icons";
import styles from "./BackTop.module.scss";

const BackTop = memo(() => {
  return (
    <BT style={{ right: "20px", bottom: "20px" }}>
      <div className={styles.bt}>
        <UpOutlined />
      </div>
    </BT>
  );
});

export default BackTop;
