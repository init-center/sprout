import React, { useEffect } from "react";
import App from "next/app";
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

interface MyAppProps extends AppProps {
  // use the __NEXT_DATA carried by next.js to bring the configs data to the client
  configs: Configs;
}
function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
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

  return (
    <Provider store={store}>
      <Layout>
        <Loading />
        <Component {...pageProps} />
      </Layout>
    </Provider>
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
