import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { H2 } from "@licenserocks/kit";

import { PDFTemplate } from "./template";
import { DetailsContent } from "../sections";

const Container = styled.div`
  margin: 0 32px;
`;

export const CertificatePDF = ({ linkToExplorer, t, ...props }) => {
  return (
    <PDFTemplate
      qrcodeValue={linkToExplorer}
      qrcodeHint={t("certificate.scanHint")}
    >
      <Container>
        <H2 content={t("certificate.title")} />
        <DetailsContent {...props} t={t} isPdf />
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
