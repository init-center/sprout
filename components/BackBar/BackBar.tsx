import React, { FC, memo, useCallback } from "react";
import { ArrowLeftOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./BackBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenuShowAction } from "../../store/global/actionCreator";
import { StateType } from "../../store";

const BackBar: FC = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );

  const toggleMenuShow = useCallback(() => {
    dispatch(setIsMenuShowAction(!isMenuShow));
  }, [dispatch, isMenuShow]);

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
      <div className={styles.icon} onClick={toggleMenuShow}>
        <MenuOutlined />
      </div>
    </div>
  );
});

export default BackBar;
