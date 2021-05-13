import React from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../utils/http/http";
import { default as ErrorPage } from "./_error";
import { PostListType } from "../types/post";
import PostList from "../components/PostList/PostList";
import { SEO } from "../components/SEO/SEO";

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
      <SEO />
      <PostList postList={postList} queryFields={{ firstPageGetTop: 1 }} />
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
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
      "/posts?page=1&limit=5&firstPageGetTop=1"
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
