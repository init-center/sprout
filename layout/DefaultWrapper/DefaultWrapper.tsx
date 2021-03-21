import React, { FC } from "react";
import { BackBar } from "../../components/BackBar/BackBar";
import Footer from "../../components/Footer/Footer";
import styles from "./DefaultWrapper.module.scss";

export const DefaultWrapper: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <BackBar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};
