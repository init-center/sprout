import React, { useCallback, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import type { AppProps, AppContext } from "next/app";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Loading from "../components/Loading/Loading";
import { Provider } from "react-redux";
import store from "../store";
import {
  setConfigsAction,
  setIsLoadingAction,
  setShouldFetchConfigsAction,
} from "../store/global/actionCreator";

import "normalize.css";
import "../styles/globals.scss";
import "../styles/cssVariables.scss";
import "../styles/reset-antd.scss";
import "highlight.js/styles/monokai-sublime.css";
import "katex/dist/katex.min.css";
import { ConfigList, Configs } from "../types/config";
import http, { ResponseData } from "../utils/http/http";
import { ADMIN_NAME_KEY } from "../constants/configKey";
import { DEFAULT_ADMIN_NAME } from "../constants/defaultConfig";

interface MyAppProps extends AppProps {
  // use the __NEXT_DATA carried by next.js to bring the configs data to the client
  configs: Configs;
}
function MyApp({ Component, pageProps, configs }: MyAppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      store.dispatch(setIsLoadingAction(true));
    };

    const handleRouteChangeError = () => {
      store.dispatch(setIsLoadingAction(false));
    };

    const handleRouteChangeComplete = () => {
      store.dispatch(setIsLoadingAction(false));
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "auto",
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChangeError);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChangeError);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  const onCopy = useCallback(
    (e: ClipboardEvent) => {
      const selectText = window?.getSelection()?.toString();
      e.clipboardData.setData(
        "text/plain",
        `${selectText}
---------------------
本文采用 CC BY-NC-SA 4.0 许可协议，著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
作者：${configs[ADMIN_NAME_KEY].value ?? DEFAULT_ADMIN_NAME}
来源：${document.title}
链接：${document.location.href}`
      );
      e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
    },
    [configs]
  );

  useEffect(() => {
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("copy", onCopy);
    };
  }, [onCopy]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/icon-52x52.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/icon-72x72.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/icon-114x114.png"
        />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Loading />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  let configList: ConfigList = {
    page: {
      currentPage: 0,
      size: 5,
      count: 0,
    },
    list: [],
  };
  const state = store.getState();
  const configs: Configs = state.configs;
  const shouldFetchConfigs = state.shouldFetchConfigs;

  const newConfigs = { ...configs };

  // if first render should to fetch the configs and dispatch to server redux store
  if (shouldFetchConfigs) {
    try {
      const result = await http.get<ResponseData<ConfigList>>("/configs");
      if (result.status === 200 && result.data.code === 2000) {
        configList = result.data.data;

        for (const config of configList.list) {
          newConfigs[config.key] = config;
        }

        store.dispatch(setConfigsAction(newConfigs));
        store.dispatch(setShouldFetchConfigsAction(false));
      }
    } catch (err) {}
  }

  return {
    ...appProps,
    configs: newConfigs,
  };
};

export default MyApp;
