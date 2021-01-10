import React from "react";
import { renderToString } from "react-dom/server";
import pdf from "html-pdf";
import { ServerStyleSheets as MuiServerStyleSheet } from "@material-ui/core/styles";
import {
  ServerStyleSheet as StyledServerStyleSheet,
  StyleSheetManager,
} from "styled-components";
import { AppContainer } from "@licenserocks/kit";

import absoluteUrl from "utils/absoluteUrl";
import { Icons } from "theme/icons";
import { config } from "config";
import { getLicenseInfo } from "utils/ethereum";
import { withServerTranslation } from "utils/translations";
import { CertificatePDF } from "components";

function renderFullPage(html, muiStyleTags, scStyleTags) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
        ${muiStyleTags}
        ${scStyleTags}
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

export default async function downloadPDF(req, res) {
  const { id, network, contractAddr, locale, contractName } = req.query;
  const licenseInfo = await getLicenseInfo(
    id,
    contractAddr,
    contractName,
    network
  );
  const { license } = licenseInfo;
  const t = withServerTranslation(locale, "pdfs");

  const { theme } = config;

  const muiSheets = new MuiServerStyleSheet();
  const styledSheets = new StyledServerStyleSheet();
  const markup = renderToString(
    muiSheets.collect(
      <StyleSheetManager sheet={styledSheets.instance}>
        <AppContainer appConfig={config} theme={theme} icons={Icons}>
          <CertificatePDF
            amount={license.amount}
            locale={locale}
            price={license.price}
            createdAt={
              license.histories
                .filter((history) => history.name === "minted")
                .shift().createdAt
            }
            linkToExplorer={absoluteUrl(req).fullPath}
            t={t}
            {...license}
          />
        </AppContainer>
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
