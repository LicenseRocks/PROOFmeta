import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AppContainer, RocksKitTheme } from "@licenserocks/kit";

import { Icons } from "theme/icons";
import { appWithTranslation } from "i18n";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppContainer icons={Icons} theme={RocksKitTheme}>
      <Component {...pageProps} />
    </AppContainer>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape.isRequired,
};

export default appWithTranslation(MyApp);
