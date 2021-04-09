import Head from "next/head";
import React, { FC, memo, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  WEBSITE_DESCRIPTION_KEY,
  WEBSITE_KEYWORDS_KEY,
  WEBSITE_NAME_KEY,
} from "../../constants/configKey";
import {
  DEFAULT_WEBSITE_DESCRIPTION,
  DEFAULT_WEBSITE_KEYWORDS,
  DEFAULT_WEBSITE_NAME,
} from "../../constants/defaultConfig";
import { StateType } from "../../store";
import { ConfigItem } from "../../types/config";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface SeoProps {
  title?: string;
  iconUrl?: string;
}

export const SEO: FC<SeoProps> = memo(({ title, iconUrl }) => {
  const websiteName = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_NAME_KEY]
  );
  const websiteDescription = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_DESCRIPTION_KEY]
  );

  const websiteKeywords = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_KEYWORDS_KEY]
  );
  const isDarkMode = useSelector<StateType, boolean>(
    (state) => state.isDarkMode
  );
  const [themeColor, setThemeColor] = useState("#fff");

  useIsomorphicLayoutEffect(() => {
    const backgroundColor = window
      .getComputedStyle(document.body)
      .getPropertyValue("--background-color");
    if (backgroundColor) {
      setThemeColor(backgroundColor);
    }
  }, [isDarkMode]);

  return (
    <Head>
      <title>{`${title ? `${title} - ` : ""}${
        websiteName?.value ?? DEFAULT_WEBSITE_NAME
      }`}</title>
      <link rel="icon" href={iconUrl ?? "/favicon.ico"} />
      <meta
        content="width=device-width,initial-scale=1,viewport-fit=cover"
        name="viewport"
      ></meta>
      <meta content="on" http-equiv="x-dns-prefetch-control"></meta>
      <meta content="telephone=no" name="format-detection"></meta>
      <meta content={themeColor} name="theme-color"></meta>
      <meta
        content={websiteDescription?.value ?? DEFAULT_WEBSITE_DESCRIPTION}
        name="description"
      ></meta>
      <meta
        content={websiteKeywords?.value ?? DEFAULT_WEBSITE_KEYWORDS}
        name="keywords"
      ></meta>
    </Head>
  );
});
