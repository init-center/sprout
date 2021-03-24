import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { UidInfo } from "../../types/users";
import { Image } from "antd";
import ErrorPage from "next/error";
import http, { ResponseData } from "../../utils/http/http";
import styles from "./users.module.scss";
import { DefaultWrapper } from "../../layout/DefaultWrapper/DefaultWrapper";
import combineClassNames from "../../utils/combineClassNames";

const Users: NextPage = () => {
  return (
    <DefaultWrapper>
      <div className={styles["user-container"]}>
        <div className={styles["user-info-box"]}>
          <Image
            className={styles.avatar}
            src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/9c68a117cf7506e6feb17b57b39c6f99~300x300.image"
          />
          <span className={styles.admin}>管理员</span>
          <div className={styles.name}>SUPER_AI</div>
          <div className={styles.uid}>UID: SUPER_AI</div>
          <h4 className={styles.intro}>
            我今天咀嚼的所有痛苦，明日终将化为万丈光芒！
          </h4>
        </div>
        <ul className={styles["list-nav"]}>
          <li
            className={combineClassNames(
              styles["list-nav-item"],
              styles.active
            )}
          >
            喜欢
          </li>
          <li className={styles["list-nav-item"]}>评论</li>
        </ul>
        <ul className={styles["list-box"]}>
          <li className={styles["list-item"]}>文章一</li>
        </ul>
      </div>
    </DefaultWrapper>
  );
};

export default Users;
