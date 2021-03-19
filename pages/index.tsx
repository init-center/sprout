import Head from "next/head";
import React from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../utils/http/http";
import ErrorPage from "next/error";
import { PostListType } from "../types/post";
import { config } from "../config/config";
import PostList from "../components/PostList/PostList";

interface HomeProps {
  statusCode: number;
  postList: PostListType;
}

const Home: NextPage<HomeProps> = ({ postList, statusCode }) => {
  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        <title>{config.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostList postList={postList} />
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  _context
) => {
  let postList: PostListType = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<PostListType>>(
      "/posts?page=1&limit=5"
    );
    if (result.status === 200 && result.data.code === 2000) {
      postList = result.data.data;
    }
    statusCode = result.status;
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      postList,
      statusCode,
    },
  };
};

export default Home;
