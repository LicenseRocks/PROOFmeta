import React from "react";
import { DownloadModule, Language, Text } from "@licenserocks/kit";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

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

export const DetailsExtraSidebar = ({ pdfUrl, qrCodeUrl, qrCodeValue }) => {
  const { i18n, t } = useTranslation("common");

  return (
    <>
      <DownloadModule
        downloadPdfText={t("downloadAsPdf")}
        downloadQrCodeDesc={t("downloadQrCodeDesc")}
        downloadQrCodeText={t("downloadQrCodeText")}
        mb={6}
        qrCodeValue={qrCodeValue}
        downloadQrCodeUrl={qrCodeUrl}
        downloadPdfUrl={pdfUrl}
      />
      <PoweredByArweave>
        {t("permanentStorageProvider")}
        &nbsp;
        <a href="https://arweave.org">
          <img
            src="/images/arweave-logo.svg"
            alt="arweave.org"
            title="arweave.org"
          />
        </a>
      </PoweredByArweave>
      <Language onChange={i18n.changeLanguage} value={i18n.language} mb={6} />
    </>
  );
};
