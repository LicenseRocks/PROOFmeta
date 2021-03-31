import React from "react";
import PropTypes from "prop-types";
import { Flex } from "@licenserocks/kit";

import { useTranslation } from "next-i18next";
import {
  DocumentsTable,
  SectionSeparator,
  TradingHistory,
} from "components/details";

export const DetailsExtraContent = ({ documents, nftId }) => {
  const { t } = useTranslation("details");

  const documentsData = [
    ...documents.map((document) => ({
      public: document?.file?.public ?? document?.data?.file?.public,
      url: document?.file?.publicUrl ?? document?.data?.file?.publicUrl,
      filename: document?.data?.file?.fileName ?? document.path,
      checksum: document.checksum,
    })),
  ];

  return (
    <>
      <SectionSeparator label={t("tradingHistory.title")} />
      <TradingHistory nftId={nftId} />

      <Flex item pb={4} />

      <SectionSeparator label={t("documents.label")} />
      <DocumentsTable data={documentsData} />
    </>
  );
};

DetailsExtraContent.propTypes = {
  nftId: PropTypes.number.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
