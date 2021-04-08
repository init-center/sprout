import React, { memo, useCallback } from "react";
import { NextPage } from "next";
import { DefaultWrapper } from "../layout/DefaultWrapper/DefaultWrapper";
import { SEO } from "../components/SEO/SEO";
import styles from "../styles/Search.module.scss";
import { useRouter } from "next/router";

const Search: NextPage = memo(() => {
  const router = useRouter();
  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = (e.target as HTMLInputElement).value;
        if (!value) {
          return;
        }
        router.push(`/archive?keyword=${value}`);
      }
    },
    [router]
  );

  return (
    <>
      <SEO title="搜索" />

      <DefaultWrapper>
        <div className={styles.container}>
          <h1 className={styles.title}>搜索</h1>
          <input
            type="text"
            className={styles["search-input"]}
            placeholder="你想找些什么？"
            onKeyUp={onKeyUp}
          ></input>
        </div>
      </DefaultWrapper>
    </>
  );
});

export default Search;
