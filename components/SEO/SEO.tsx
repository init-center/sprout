import Head from "next/head";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { WEBSITE_NAME_KEY } from "../../constants/configKey";
import { DEFAULT_WEBSITE_NAME } from "../../constants/defaultConfig";
import { StateType } from "../../store";
import { ConfigItem } from "../../types/config";

interface SeoProps {
  title?: string;
  iconUrl?: string;
}

export const SEO: FC<SeoProps> = memo(({ title, iconUrl }) => {
  const websiteName = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_NAME_KEY]
  );
  return (
    <Head>
      <title>{`${title ? `${title} - ` : ""}${
        websiteName?.value ?? DEFAULT_WEBSITE_NAME
      }`}</title>
      <link rel="icon" href={iconUrl ?? "/favicon.ico"} />
    </Head>
  );
});
