import React from "react";
import type { AppProps } from "next/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Loading from "../components/Loading/Loading";
import { Provider } from "react-redux";
import store from "../store";

import "normalize.css";
import "../styles/globals.scss";
import "highlight.js/styles/monokai-sublime.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  return (
    <Provider store={store}>
      <Layout>
        <Loading />
        <TransitionGroup>
          <CSSTransition
            classNames="fade"
            timeout={300}
            key={router.pathname}
            appear={true}
          >
            <Component {...pageProps} />
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    </Provider>
  );
}

export default MyApp;
