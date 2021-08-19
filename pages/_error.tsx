import React from "react";
import Head from "next/head";
import { NextPageContext } from "next";

const statusCodes: { [code: number]: string } = {
  400: "请求错误",
  401: "未授权",
  403: "没有权限",
  404: "无法找到该页面",
  405: "不允许的方法",
  500: "内部服务器错误",
};

export type ErrorProps = {
  statusCode?: number;
  title?: string;
};

function _getInitialProps({
  res,
  err,
}: NextPageContext): Promise<ErrorProps> | ErrorProps {
  const statusCode =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    res && res.statusCode ? res.statusCode : err ? err.statusCode! : 404;
  return { statusCode };
}

/**
 * `Error` component used for handling errors.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default class Error<P = {}> extends React.Component<P & ErrorProps> {
  static displayName = "ErrorPage";

  static getInitialProps = _getInitialProps;
  static origGetInitialProps = _getInitialProps;

  render() {
    const { statusCode } = this.props;
    const title =
      this.props.title ||
      statusCodes[statusCode] ||
      "An unexpected error has occurred";

    return (
      <div style={styles.error}>
        <Head>
          <title>
            {statusCode ?? 400}: {title}
          </title>
        </Head>
        <div>
          <style dangerouslySetInnerHTML={{ __html: "body { margin: 0 }" }} />
          {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
          <div style={styles.desc}>
            <h2 style={styles.h2}>{title}.</h2>
          </div>
        </div>
      </div>
    );
  }
}

const styles: { [k: string]: React.CSSProperties } = {
  error: {
    color: "var(--font-color)",
    background: "var(--background-color)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  desc: {
    display: "inline-block",
    color: "var(--font-color)",
    textAlign: "left",
    lineHeight: "49px",
    height: "49px",
    verticalAlign: "middle",
  },

  h1: {
    display: "inline-block",
    borderRight: "1px solid var(--border-color)",
    margin: 0,
    marginRight: "20px",
    padding: "10px 23px 10px 0",
    color: "var(--font-color)",
    fontSize: "24px",
    fontWeight: 500,
    verticalAlign: "top",
  },

  h2: {
    fontSize: "14px",
    color: "var(--font-color)",
    fontWeight: "normal",
    lineHeight: "inherit",
    margin: 0,
    padding: 0,
  },
};
