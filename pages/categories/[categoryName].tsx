import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../../utils/http/http";
import { default as ErrorPage } from "../_error";
import { PostListType } from "../../types/post";
import PostList from "../../components/PostList/PostList";
import { SEO } from "../../components/SEO/SEO";

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
    return { categoryName, firstPageGetTop: 1 };
  }, [categoryName]);

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title={`分类:${categoryName}`} />

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
