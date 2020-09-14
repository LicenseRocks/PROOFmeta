import React from "react";
import { DownloadModule, Language } from "@licenserocks/kit";

import { i18n, withTranslation } from "i18n";

export const IndexExtraSidebar = withTranslation("common")(({ url, t }) => (
  <>
    <DownloadModule
      downloadPdfText={t("downloadAsPdf")}
      downloadQrCodeDesc={t("downloadQrCodeDesc")}
      downloadQrCodeText={t("downloadQrCodeText")}
      mb={6}
      qrCodeValue={url}
    />
    <Language onChange={i18n.changeLanguage} value={i18n.language} mb={6} />
  </>
));
