import React from "react";
import { H4, ShareModule } from "@licenserocks/kit";

import { withTranslation } from "i18n";

export const IndexSidebar = withTranslation("common")(({ url, t }) => (
  <>
    <H4 mb={6}>{t("shareThisLicense")}</H4>
    <ShareModule copyText={t("copyLink")} mb={6} url={url} />
  </>
));
