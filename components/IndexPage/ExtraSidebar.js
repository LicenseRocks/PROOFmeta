import React from "react";
import { DownloadModule, Language, Text } from "@licenserocks/kit";
import styled from "styled-components";
import { i18n, withTranslation } from "i18n";

import arweaveLogo from "./arweave-logo.svg";

const PoweredByArweave = styled(Text).attrs(() => ({
  fontStyle: "italic",
}))`
  background: ${({ theme }) => theme.palette.secondary.light};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eeeef2;
  border-radius: 16px;
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

export const IndexExtraSidebar = withTranslation("common")(({ url, t }) => (
  <>
    <DownloadModule
      downloadPdfText={t("downloadAsPdf")}
      downloadQrCodeDesc={t("downloadQrCodeDesc")}
      downloadQrCodeText={t("downloadQrCodeText")}
      mb={6}
      qrCodeValue={url}
    />
    <PoweredByArweave>
      {t("permanentStorageProvider")}
      &nbsp;
      <a href="https://arweave.org">
        <img src={arweaveLogo} alt="arweave.org" title="arweave.org" />
      </a>
    </PoweredByArweave>
    <Language onChange={i18n.changeLanguage} value={i18n.language} mb={6} />
  </>
));
