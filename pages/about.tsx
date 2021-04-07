import React from "react";
import { NextPage } from "next";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import md2html from "../utils/md2html/md2html";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigItem } from "../types/config";
import { ABOUT_KEY } from "../constants/configKey";
import { DEFAULT_ABOUT } from "../constants/defaultConfig";
import mdStyles from "../styles/mdStyle.module.scss";

const About: NextPage = () => {
  const about = useSelector<StateType, ConfigItem>(
    (state) => state.configs[ABOUT_KEY]
  );
  return (
    <>
      <SEO title="关于" />

      <DefaultWrapper>
        <div
          className={mdStyles["md-box"]}
          dangerouslySetInnerHTML={{
            __html: md2html(about.value ?? DEFAULT_ABOUT).htmlContent,
          }}
        ></div>
      </DefaultWrapper>
    </>
  );
};

export default About;
