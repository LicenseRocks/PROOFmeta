import React from "react";
import PropTypes from "prop-types";
import { Link } from "@licenserocks/kit";
import styled from "styled-components";

import { withTranslation } from "i18n";
import {
  DocumentsTable,
  SectionSeparator,
  TransactionsTable,
} from "components/details";

const SectionLink = styled(Link)`
  && {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const DetailsExtraContent = withTranslation("details")(
  ({ documents, checksums, t }) => {
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
        <SectionSeparator
          label={t("transactions.label")}
          link={
            <SectionLink Component="span" href="/">
              {t("transactions.all")}
            </SectionLink>
          }
        />
        <TransactionsTable data={[]} />
        <SectionSeparator label={t("documents.label")} />
        <DocumentsTable data={documentsData} />
      </>
    );
  }
);

DetailsExtraContent.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
