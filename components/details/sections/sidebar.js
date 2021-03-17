import React from "react";
import { H4, ShareModule } from "@licenserocks/kit";
import { useTranslation } from "next-i18next";

export const DetailsSidebar = ({ url }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <H4 mb={6}>{t("shareThisLicense")}</H4>
      <ShareModule copyText={t("copyLink")} mb={6} url={url} />
    </>
  );
};
