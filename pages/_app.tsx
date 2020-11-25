import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Loading from "../components/Loading/Loading";
import { Provider } from "react-redux";
import combineClassNames from "../utils/combineClassNames";
import store from "../store";
import { setIsLoadingAction } from "../store/global/actionCreator";

import "normalize.css";
import "../styles/globals.scss";
import "highlight.js/styles/monokai-sublime.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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

export default MyApp;
