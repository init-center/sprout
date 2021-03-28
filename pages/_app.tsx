import React, { useState, useEffect } from "react";
import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Loading from "../components/Loading/Loading";
import { Provider } from "react-redux";
import combineClassNames from "../utils/combineClassNames";
import store from "../store";
import {
  setConfigsAction,
  setIsLoadingAction,
  setShouldFetchConfigsAction,
} from "../store/global/actionCreator";

import "normalize.css";
import "../styles/globals.scss";
import "highlight.js/styles/monokai-sublime.css";
import { ConfigList, Configs } from "../types/config";
import http, { ResponseData } from "../utils/http/http";

interface MyAppProps extends AppProps {
  // use the __NEXT_DATA carried by next.js to bring the configs data to the client
  configs: Configs;
}
function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const router = useRouter();
  const [inTransition, setInTransition] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      store.dispatch(setIsLoadingAction(true));
    };

    const handleRouteChangeError = () => {
      store.dispatch(setIsLoadingAction(false));
    };

    const handleRouteChangeComplete = () => {
      store.dispatch(setIsLoadingAction(false));
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
        <TransitionGroup
          className={combineClassNames(
            "page-transition-group",
            inTransition ? "in-transition" : ""
          )}
        >
          <CSSTransition
            classNames="fade"
            timeout={600}
            key={router.pathname}
            appear={true}
            onEnter={() => {
              setInTransition(true);
            }}
            onEntered={() => {
              setTimeout(() => {
                setInTransition(false);
              });
            }}
            onExit={() => {
              setInTransition(true);
            }}
            onExited={() => {
              setTimeout(() => {
                setInTransition(false);
              });
            }}
            unmountOnExit={true}
            mountOnEnter={true}
          >
            <Component {...pageProps} />
          </CSSTransition>
        </TransitionGroup>
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
