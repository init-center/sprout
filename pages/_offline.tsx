import React from "react";
import Head from "next/head";

const Offline = () => (
  <>
    <Head>
      <title>离线回退页面</title>
    </Head>
    <h1>这是离线回退页面！</h1>
    <h2>当你离线时, 所有页面都会导航到此页面，请连接网络后重试！</h2>
  </>
);

export default Offline;
