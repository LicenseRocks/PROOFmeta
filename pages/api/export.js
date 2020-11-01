import React from "react";
import { renderToString } from "react-dom/server";
import pdf from "html-pdf";
import {
  ThemeProvider as MuiThemeProvider,
  ServerStyleSheets as MuiServerStyleSheet,
} from "@material-ui/core/styles";
import {
  ThemeProvider as StyledThemeProvider,
  ServerStyleSheet as StyledServerStyleSheet,
  StyleSheetManager,
} from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppContainer } from "@licenserocks/kit";

import { Icons } from "theme/icons";
import { config } from "config";
import { getLicenseInfo } from "utils/ethereum";
import { CertificatePDF } from "components";

function renderFullPage(html, muiStyleTags, scStyleTags) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        ${muiStyleTags}
        ${scStyleTags}
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

export default async function user(req, res) {
  const { id, network, contractAddr } = req.query;
  const licenseInfo = await getLicenseInfo(id, contractAddr, network);
  const { license } = licenseInfo;

  const { theme } = config;

  const muiSheets = new MuiServerStyleSheet();
  const styledSheets = new StyledServerStyleSheet();
  const markup = renderToString(
    muiSheets.collect(
      <StyleSheetManager sheet={styledSheets.instance}>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer appConfig={config} theme={theme} icons={Icons}>
              <CertificatePDF
                amount={license.amount}
                price={license.price}
                createdAt={
                  license.histories
                    .filter((history) => history.name === "minted")
                    .shift().createdAt
                }
                linkToExplorer="https://google.com"
                {...license}
              />
            </AppContainer>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </StyleSheetManager>
    )
  );

  const muiStyleTags = `<style>${muiSheets.toString()}</style>`;
  const scStyleTags = styledSheets.getStyleTags();

  pdf
    .create(renderFullPage(markup, muiStyleTags, scStyleTags))
    .toBuffer((err, buffer) => {
      res.setHeader(
        "Content-disposition",
        `attachment; filename="nft-${id}.pdf"`
      );
      res.setHeader("Content-Type", "application/pdf");
      res.status(200).end(buffer);
    });
}
