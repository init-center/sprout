import React from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../utils/http/http";
import { default as ErrorPage } from "./_error";
import { CustomDivider } from "../components/CustomDivider/CustomDivider";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import { FriendListType } from "../types/friends";
import styles from "../styles/Friends.module.scss";
import { Empty, Image } from "antd";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigItem } from "../types/config";
import { MAKE_FRIEND_DESCRIPTION_KEY } from "../constants/configKey";
import { DEFAULT_MAKE_FRIEND_DESCRIPTION } from "../constants/defaultConfig";

interface FriendsProps {
  statusCode: number;
  friendList: FriendListType;
}

const Friends: NextPage<FriendsProps> = ({ friendList, statusCode }) => {
  const makeFriendDescription = useSelector<StateType, ConfigItem>(
    (state) => state.configs[MAKE_FRIEND_DESCRIPTION_KEY]
  );

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title="友链" />

      <DefaultWrapper>
        <CustomDivider>友链</CustomDivider>
        <div className={styles.wrapper}>
          {friendList.list.length > 0 ? (
            <ul className={styles["friend-list"]}>
              {friendList.list.map((friend) => (
                <li className={styles["friend-item"]} key={friend.id}>
                  <a
                    href={friend.url}
                    target="__blank"
                    className={styles["friend-item-link"]}
                  >
                    <Image className={styles.avatar} src={friend.avatar} />
                    <div className={styles.info}>
                      <div className={styles.name}>{friend.name}</div>
                      <div className={styles.intro}>{friend.intro}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty className={styles.empty} description="暂无友链" />
          )}
        </div>
        <div className={styles["make-friend"]}>
          <CustomDivider>交换友链</CustomDivider>
          <div
            className={styles["make-friend-description"]}
            dangerouslySetInnerHTML={{
              __html:
                makeFriendDescription?.value ?? DEFAULT_MAKE_FRIEND_DESCRIPTION,
            }}
          ></div>
        </div>
      </DefaultWrapper>
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<FriendsProps> = async (
  _context
) => {
  let friendList: FriendListType = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<FriendListType>>("/friends");
    if (result.status === 200 && result.data.code === 2000) {
      friendList = result.data.data;
    }
    statusCode = result.status;
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      friendList,
      statusCode,
    },
  };
};

export default Friends;
