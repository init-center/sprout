import Head from "next/head";
import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../../utils/http/http";
import ErrorPage from "next/error";
import { PostListType } from "../../types/post";
import { config } from "../../config/config";
import PostList from "../../components/PostList/PostList";

interface CategoryPageProps {
  statusCode: number;
  categoryName: string;
  postList: PostListType;
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  postList,
  statusCode,
  categoryName,
}) => {
  const queryFields = useMemo(() => {
    return { categoryName };
  }, [categoryName]);

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        <title>
          标签:{categoryName} - {config.name}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostList postList={postList} queryFields={queryFields} />
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context
) => {
  const categoryName = context.query.categoryName as string;
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
    const result = await http.get<ResponseData<PostListType>>("/posts", {
      params: { page: 1, limit: 5, categoryName },
    });
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
      categoryName,
    },
  };
};

export default CategoryPage;
