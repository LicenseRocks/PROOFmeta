import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { hotjar } from "react-hotjar";
import { AppContainer, RocksKitTheme } from "@licenserocks/kit";
import * as Sentry from "@sentry/node";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";

import { Icons } from "theme/icons";
import { appWithTranslation } from "i18n";
import "keen-slider/keen-slider.min.css";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

function MyApp({ Component, pageProps, err }) {
  const Layout = Component?.Layout || (({ children }) => children);
  const router = useRouter();

  useEffect(() => {
    // Load Hotjar
    if (process.env.NODE_ENV === "production") {
      hotjar.initialize(
        process.env.NEXT_PUBLIC_HOTJAR_APP_ID,
        process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION
      );
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const pageProgressBarListener = (
    routeChangeStartHandler,
    routeChangeEndHandler
  ) => {
    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);
  };

  return (
    <AppContainer
      icons={Icons}
      pageProgressBar
      pageProgressBarListener={pageProgressBarListener}
      theme={RocksKitTheme}
    >
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
          revalidateOnFocus: false,
        }}
      >
        <Layout>
          <Component {...pageProps} err={err} />
        </Layout>
      </SWRConfig>
    </AppContainer>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape.isRequired,
  err: PropTypes.shape({}).isRequired,
};

export default appWithTranslation(MyApp);
