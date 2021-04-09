import { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
  ADMIN_EMAIL_KEY,
  ADMIN_NAME_KEY,
  WEBSITE_DESCRIPTION_KEY,
  WEBSITE_NAME_KEY,
} from "../constants/configKey";
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_NAME,
  DEFAULT_WEBSITE_DESCRIPTION,
  DEFAULT_WEBSITE_NAME,
} from "../constants/defaultConfig";
import { ConfigItem, ConfigList } from "../types/config";
import generateAtomFeed from "../utils/generateAtomFeed/generateAtomFeed";
import { default as ErrorPage } from "./_error";
import http, { ResponseData } from "../utils/http/http";

interface AtomProps {
  statusCode: number;
}
const Atom: NextPage<AtomProps> = ({ statusCode }) => {
  if (statusCode >= 400) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return null;
};

export const getServerSideProps: GetServerSideProps<AtomProps> = async (
  context
) => {
  let configs: ConfigItem[] = [];
  let statusCode = 404;
  try {
    const result = await http.get<ResponseData<ConfigList>>("/configs");
    if (result.status === 200 && result.data.code === 2000) {
      configs = result.data.data.list;
    }
    const rss = await generateAtomFeed({
      websiteName: configs[WEBSITE_NAME_KEY]?.value ?? DEFAULT_WEBSITE_NAME,
      websiteUrl: "https://init.center",
      adminName: configs[ADMIN_NAME_KEY]?.value ?? DEFAULT_ADMIN_NAME,
      email: configs[ADMIN_EMAIL_KEY]?.value ?? DEFAULT_ADMIN_EMAIL,
      link: `https://github.com/init-center`,
      description:
        configs[WEBSITE_DESCRIPTION_KEY]?.value ?? DEFAULT_WEBSITE_DESCRIPTION,
    });
    statusCode = result.status;
    context.res.setHeader("Content-Type", "text/xml");
    context.res.end(rss);
  } catch (err) {
    statusCode = err?.response?.status ?? 404;
  }
  return {
    props: {
      statusCode,
    },
  };
};

export default Atom;
