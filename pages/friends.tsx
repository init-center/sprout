import React from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../utils/http/http";
import ErrorPage from "next/error";
import { CustomDivider } from "../components/CustomDivider/CustomDivider";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import { FriendListType } from "../types/friends";

interface FriendsProps {
  statusCode: number;
  friendList: FriendListType;
}

const Friends: NextPage<FriendsProps> = ({ friendList, statusCode }) => {
  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title="友链" />

      <DefaultWrapper>
        <CustomDivider>友链</CustomDivider>
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
      statusCode: 200,
    },
  };
};

export default Friends;
