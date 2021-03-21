import React from "react";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../../utils/http/http";
import ErrorPage from "next/error";
import { TagListType } from "../../types/tag";
import { CustomDivider } from "../../components/CustomDivider/CustomDivider";
import TagList from "../../components/TagList/TagList";
import { DefaultWrapper } from "../../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../../components/SEO/SEO";

interface TagsProps {
  statusCode: number;
  tagList: TagListType;
}

const Tags: NextPage<TagsProps> = ({ tagList, statusCode }) => {
  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <SEO title="标签" />

      <DefaultWrapper>
        <CustomDivider>标签</CustomDivider>
        <TagList list={tagList.list} />
      </DefaultWrapper>
    </>
  );
};

// fetch data
export const getServerSideProps: GetServerSideProps<TagsProps> = async (
  _context
) => {
  let tagList: TagListType = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<TagListType>>("/tags");
    if (result.status === 200 && result.data.code === 2000) {
      tagList = result.data.data;
    }
    statusCode = result.status;
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      tagList,
      statusCode,
    },
  };
};

export default Tags;
