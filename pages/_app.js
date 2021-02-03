import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { hotjar } from "react-hotjar";
import { AppContainer, RocksKitTheme } from "@licenserocks/kit";
import * as Sentry from "@sentry/node";

import { Icons } from "theme/icons";
import { appWithTranslation } from "i18n";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

function MyApp({ Component, pageProps, err }) {
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

  return (
    <AppContainer icons={Icons} theme={RocksKitTheme}>
      <Component {...pageProps} err={err} />
    </AppContainer>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape.isRequired,
  err: PropTypes.shape({}).isRequired,
};

export default appWithTranslation(MyApp);
