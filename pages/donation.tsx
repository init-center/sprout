import React from "react";
import { NextPage } from "next";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import md2html from "../utils/md2html/md2html";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ConfigItem } from "../types/config";
import { DONATION_KEY } from "../constants/configKey";
import styles from "../styles/donation.module.scss";
import mdStyles from "../styles/mdStyle.module.scss";
import { Donate } from "../components/Donate/Donate";

const DonatePage: NextPage = () => {
  const donation = useSelector<StateType, ConfigItem>(
    (state) => state.configs[DONATION_KEY]
  );
  return (
    <>
      <SEO title="打赏列表" />

      <DefaultWrapper>
        <div className={styles.donation}>
          <div
            className={mdStyles["md-box"]}
            dangerouslySetInnerHTML={{
              __html: donation?.value
                ? md2html(donation.value).htmlContent
                : `<div style="text-align: center; margin: 80px 0;">暂无打赏，期待第一笔打赏的到来~</div>`,
            }}
          ></div>
          <Donate inGlobalPage={true} />
        </div>
      </DefaultWrapper>
    </>
  );
};

export default DonatePage;
