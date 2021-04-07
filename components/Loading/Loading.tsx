import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import styles from "./Loading.module.scss";

const Loading: FC = memo(() => {
  const isLoading = useSelector<StateType, boolean>((state) => state.isLoading);

  return isLoading ? (
    <div className={styles.loading}>
      <div className={styles.ball}></div>
    </div>
  ) : null;
});

export default Loading;
