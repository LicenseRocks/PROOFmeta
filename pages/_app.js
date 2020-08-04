import React from "react";
import App from "next/app";

import { AppContainer, RocksKitIcons, RocksKitTheme } from "@licenserocks/kit";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContainer icons={RocksKitIcons} theme={RocksKitTheme}>
        <Component {...pageProps} />
      </AppContainer>
    );
  }
}
