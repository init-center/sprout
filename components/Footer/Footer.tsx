import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ADMIN_NAME_KEY, WEBSITE_NAME_KEY } from "../../constants/configKey";
import {
  DEFAULT_ADMIN_NAME,
  DEFAULT_WEBSITE_NAME,
} from "../../constants/defaultConfig";
import { StateType } from "../../store";
import { ConfigItem } from "../../types/config";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const websiteName = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_NAME_KEY]
  );

  const adminName = useSelector<StateType, ConfigItem>(
    (state) => state.configs[ADMIN_NAME_KEY]
  );

  return (
    <div className={styles.footer}>
      {`© ${new Date().getFullYear()} ${
        websiteName?.value ?? DEFAULT_WEBSITE_NAME
      }. Made by ${adminName?.value ?? DEFAULT_ADMIN_NAME}.`}
    </div>
  );
};

export default Footer;
