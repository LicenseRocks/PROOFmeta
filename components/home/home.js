import React from "react";
import styled from "styled-components";
import {
  Button,
  Flex,
  H1,
  H2,
  H5,
  Paragraph,
} from "@licenserocks/kit";

import { withTranslation } from "i18n";
import { HomeCharts } from "./charts";
import { TransactionsTable } from "./transactionsTable";
import { HomeCreators } from "./creators";

const ContentContainer = styled(Flex).attrs(() => ({
  container: true,
  direction: "column",
  xs: 12,
  md: 8,
}))`
  text-align: center;
  margin: auto;

  .bg {
    background: url("/images/home-bg.svg") no-repeat center;
    background-size: contain;
    width: 100%;
    height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ShowHome = withTranslation("home")(({ t }) => {
  return (
    <>
      <ContentContainer mb={12}>
        <H1 align="center" content={t("headingOne")} mb={6} />

        <Paragraph content={t("descOne")} fontWeight="light" />
      </ContentContainer>

      <HomeCharts />

      <ContentContainer mt={30}>
        <H1 align="center" content={t("latestTransactions")} mb={6} />

        <Paragraph
          content={t("latestTransactionsDesc")}
          fontWeight="light"
          mb={12}
        />
      </ContentContainer>

      <TransactionsTable />

      <ContentContainer mt={20} mb={12}>
        <H2 align="center" content={t("creatorsHeading")} />

        <Paragraph content={t("creatorsDesc")} fontWeight="light" />
      </ContentContainer>

      <HomeCreators />

      <ContentContainer mt={20}>
        <div className="bg">
          <H5 content={t("ending.headingOne")} mb={2} />

          <H2 content={t("ending.headingTwo")} mb={2} />

          <Paragraph content={t("ending.desc")} fontWeight="light" mb={8} />
          <Button content={t("ending.createNft")} size="lg" />
        </div>
      </ContentContainer>
    </>
  );
});

ShowHome.propTypes = {};

ShowHome.defaultProps = {};
