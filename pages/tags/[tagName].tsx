import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../../utils/http/http";
import ErrorPage from "next/error";
import { PostListType } from "../../types/post";
import PostList from "../../components/PostList/PostList";
import { SEO } from "../../components/SEO/SEO";

interface TagPageProps {
  statusCode: number;
  tagName: string;
  postList: PostListType;
}

const TagPage: NextPage<TagPageProps> = ({ postList, statusCode, tagName }) => {
  const queryFields = useMemo(() => {
    return { tagName, firstPageGetTop: 1 };
  }, [tagName]);

  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title={`标签:${tagName}`} />

      <PostList postList={postList} queryFields={queryFields} />
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<TagPageProps> = async (
  context
) => {
  const tagName = context.query.tagName as string;
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
      params: { page: 1, limit: 5, tagName, firstPageGetTop: 1 },
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
      tagName,
    },
  };
};

export default TagPage;
