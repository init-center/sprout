import React, { FC } from "react";
import { config } from "../../config/config";
import styles from "./Footer.module.scss";

const { name, adminName } = config;

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      © {new Date().getFullYear()} {name}. Made by {adminName}.
    </div>
  );
};

export default Footer;
