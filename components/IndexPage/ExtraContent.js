import React from "react";
import PropTypes from "prop-types";
import { Link } from "@licenserocks/kit";
import styled from "styled-components";

import { withTranslation } from "i18n";
import { DocumentsTable } from "components/DocumentsTable";
import { SectionSeparator } from "components/SectionSeparator";
import { TransactionsTable } from "components/TransactionsTable";

const SectionLink = styled(Link)`
  && {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const IndexExtraContent = withTranslation("index")(
  ({ histories, documents, checksums, fileURI, t }) => {
    const transactionsData = [
      {
        transactionHash:
          "0x3ed043f8a5ba9c5139a172ccdcaa99f4b154650eaba84cb9cc2c4550bc2054f7",
        createdAt: new Date().toLocaleDateString(),
        amount: 10,
        to: "0xfaa68ee0df6bc5e6a2174e7df2ec252931302e60",
        status: "success",
      },
      {
        transactionHash:
          "0x3ed043f8a5ba9c5139a172ccdcaa99f4b154650eaba84cb9cc2c4550bc2054f7",
        createdAt: new Date().toLocaleDateString(),
        amount: 10,
        to: "0xfaa68ee0df6bc5e6a2174e7df2ec252931302e60",
        status: "pending",
      },
      {
        transactionHash:
          "0x3ed043f8a5ba9c5139a172ccdcaa99f4b154650eaba84cb9cc2c4550bc2054f7",
        createdAt: new Date().toLocaleDateString(),
        amount: 10,
        to: "0xfaa68ee0df6bc5e6a2174e7df2ec252931302e60",
        status: "success",
      },
    ];

    const documentsData = [
      ...documents
        .map((document) => ({
          hash: null,
          public: true,
          url: document?.file?.publicUrl,
          filename: document?.file?.fileName ?? document.path,
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
        <SectionSeparator
          label={t("transactions.label")}
          link={
            <SectionLink Component="span" href="/">
              {t("transactions.all")}
            </SectionLink>
          }
        />
        <TransactionsTable data={transactionsData} />
        <SectionSeparator label={t("documents.label")} />
        <DocumentsTable data={documentsData} />
      </>
    );
  }
);

IndexExtraContent.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
