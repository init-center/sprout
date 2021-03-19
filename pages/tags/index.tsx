import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer/Footer";
import { GetServerSideProps, NextPage } from "next";
import http, { ResponseData } from "../../utils/http/http";
import ErrorPage from "next/error";
import styles from "../../styles/Tags.module.scss";
import { TagListType } from "../../types/tag";
import { config } from "../../config/config";
import { BackBar } from "../../components/BackBar/BackBar";
import { CustomDivider } from "../../components/CustomDivider/CustomDivider";
import TagList from "../../components/TagList/TagList";

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
      <Head>
        <title>标签 - {config.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <BackBar />
        <main className={styles.main}>
          <CustomDivider>标签</CustomDivider>
          <TagList list={tagList.list} />
        </main>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
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
