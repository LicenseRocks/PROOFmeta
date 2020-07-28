import React from "react";
import App from "next/app";

import { AppContainer, theme } from "rockskit";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContainer theme={theme}>
        <Component {...pageProps} />
      </AppContainer>
    );
  }
}
