import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import MuiContainer from "@material-ui/core/Container";
import { Hidden, PageLoading, Text } from "@licenserocks/kit";

import { ExplorerLayoutHeader } from "./header";
import { ExplorerLayoutFooter } from "./footer";

const Content = styled(Grid).attrs(() => ({
  container: true,
}))`
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(20)};
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-top: ${({ theme }) => theme.spacing(2)};
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    padding-right: ${({ theme }) => theme.spacing(6)};
  }
`;

const poweredBy = (
  <Text color="textSecondary" fontStyle="italic">
    Powered by
    <Text color="textPrimary" fontWeight="bold">
      {" "}
      license.rocks
    </Text>
  </Text>
);

export const ExplorerLayout = ({
  children,
  footerContent,
  headerLogoAction,
  headerRight,
  loading,
  ...props
}) => {
  if (loading) return <PageLoading fullScreen />;

  return (
    <MuiContainer maxWidth="lg" {...props}>
      <ExplorerLayoutHeader
        logoAction={headerLogoAction}
        headerRight={headerRight}
      />
      <Content>{children}</Content>
      {footerContent && (
        <ExplorerLayoutFooter>
          {footerContent || poweredBy}
        </ExplorerLayoutFooter>
      )}
    </MuiContainer>
  );
};

ExplorerLayout.propTypes = {
  children: PropTypes.node,
  footerContent: PropTypes.node,
  headerLogoAction: PropTypes.func,
  headerRight: PropTypes.node,
  loading: PropTypes.bool,
};

ExplorerLayout.defaultProps = {
  footerContent: poweredBy,
};
