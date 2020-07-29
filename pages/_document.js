/**
 * Document
 */

// React
import React from "react";

// Next
import Document, { Head, Main, NextScript } from "next/document";

// Style
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html
        className="no-js"
        lang="en"
        dir="ltr"
        prefix="og: http://ogp.me/ns#"
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            key="viewport"
          />
          <meta charSet="UTF-8" key="charset" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
          <meta name="format-detection" content="telephone=no" key="format" />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
            rel="stylesheet"
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @import url('//hello.myfonts.net/count/37ac34');
            @font-face {
              font-family: 'GalanoGrotesque-Bold';
              src: url('fonts/galano/37AC34_0_0.eot');
              src: url('fonts/galano/37AC34_0_0.eot?#iefix') format('embedded-opentype'),
                url('fonts/galano/37AC34_0_0.woff2') format('woff2'),
                url('fonts/galano/37AC34_0_0.woff') format('woff'),
                url('fonts/galano/37AC34_0_0.ttf') format('truetype');
            }
          `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
