import React from "react";
import PropTypes from "prop-types";
import { Flex, Link } from "@licenserocks/kit";
import styled from "styled-components";

import { useTranslation } from "next-i18next";
import {
  DocumentsTable,
  SectionSeparator,
  TradingHistory,
} from "components/details";

const SectionLink = styled(Link)`
  && {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const DetailsExtraContent = ({ documents, checksums, nftId }) => {
  const { t } = useTranslation("details");

  const documentsData = [
    ...documents.map((document) => ({
      hash: null,
      public: true,
      url: document?.file?.publicUrl ?? document?.data?.file?.publicUrl,
      filename: document?.data?.file?.fileName ?? document.path,
    })),
    ...checksums.map((checksum) => ({
      hash: checksum,
      public: false,
      url: null,
      filename: null,
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
