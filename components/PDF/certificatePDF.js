import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  H1,
  H2,
  TinyBadge,
  DetailsTable,
  Image,
  Paragraph,
  Text,
} from "@licenserocks/kit";

import { PDFTemplate } from "./template";

const StyledImage = styled(Image).attrs(() => ({
  width: "100%",
}))`
  max-height: 150px;
`;

const Container = styled.div`
  margin: 0 32px;
`;

const DocumentTitle = styled(H2)`
  && {
    font-size: 16px;
  }
`;

const DocumentTypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const DocumentType = styled(H1)`
  && {
    text-transform: uppercase;
    font-size: 20px;
    margin-right: 8px;
  }
`;

const StyledBadge = styled(TinyBadge)`
  margin-right: 3px;
`;

const StyledParagraph = styled(Paragraph)`
  && {
    font-weight: normal;
    font-style: italic;
    line-height: 160%;
    font-size: 10px;
  }
`;

const StyledDetailsTable = styled(DetailsTable)`
  hr {
    padding: 0 !important;
    margin: 0 !important;
  }

  & > div {
    min-height: 16px;
  }
`;

const Label = styled(Text).attrs(() => ({
  color: "textSecondary",
}))`
  && {
    font-size: 12px;
    line-height: 120%;
  }
`;

const Value = styled(Label).attrs(() => ({
  color: "textPrimary",
}))``;

export const CertificatePDF = ({
  coverSrc,
  linkToExplorer,
  createdAt,
  creator,
  amount,
  price,
  abstract,
  unique,
  exclusive,
  t,
}) => {
  return (
    <PDFTemplate
      qrcodeValue={linkToExplorer}
      qrcodeHint={t("certificate.scanHint")}
    >
      <Container>
        <DocumentTitle>{t("certificate.title")}</DocumentTitle>
        <DocumentTypeContainer>
          <DocumentType>software license</DocumentType>
          {exclusive && (
            <StyledBadge label={t("certificate.exclusive")} color="warning" />
          )}
          {unique && (
            <StyledBadge label={t("certificate.unique")} color="success" />
          )}
        </DocumentTypeContainer>
        <StyledDetailsTable
          labelWidth={200}
          rows={[
            {
              renderLabel: () => coverSrc && <StyledImage src={coverSrc} />,
              value: (
                <StyledParagraph fontWeight="light" mb={0} content={abstract} />
              ),
              divider: true,
            },
            {
              renderLabel: () => <Label>{t("certificate.createdAt")}</Label>,
              value: <Value>{new Date(createdAt).toDateString()}</Value>,
            },
            {
              renderLabel: () => (
                <Label>{t("certificate.publicAddress")}</Label>
              ),
              value: <Value>{creator?.ethereumPublicAddr}</Value>,
            },
            {
              renderLabel: () => <Label>{t("certificate.amount")}</Label>,
              value: <Value>{amount}</Value>,
            },
            {
              renderLabel: () => <Label>{t("certificate.price")}</Label>,
              value: <Value>{price}</Value>,
            },
          ]}
        />
      </Container>
    </PDFTemplate>
  );
};

CertificatePDF.propTypes = {
  createdAt: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    ethereumPublicAddr: PropTypes.string,
  }),
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  coverSrc: PropTypes.string,
  linkToExplorer: PropTypes.string,
  abstract: PropTypes.string,
  unique: PropTypes.bool,
  exclusive: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

CertificatePDF.defaultProps = {
  coverSrc: null,
  linkToExplorer: "",
  abstract: "",
  unique: false,
  exclusive: false,
  creator: {},
};
