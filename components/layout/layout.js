import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Grid from "@material-ui/core/Grid";
import MuiContainer from "@material-ui/core/Container";
import { PageLoading } from "@licenserocks/kit";
import { useTranslation } from "next-i18next";

import { ExplorerLayoutHeader } from "./header";
import { renderFooter } from "./footer";

const FluidContainer = styled(MuiContainer).attrs(() => ({
  maxWidth: false,
}))`
  ${({ white }) =>
    white &&
    css`
      background-color: ${({ theme }) => theme.palette.common.white};
    `}
`;

const Container = styled(MuiContainer).attrs(() => ({
  maxWidth: "lg",
}))``;

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

export const ExplorerLayout = ({
  children,
  headerLogoAction,
  headerRight,
  loading,
}) => {
  const { t } = useTranslation("layout");

  if (loading) return <PageLoading fullScreen />;

  return (
    <>
      <FluidContainer white>
        <Container>
          <ExplorerLayoutHeader
            logoAction={headerLogoAction}
            headerRight={headerRight}
          />
        </Container>
      </FluidContainer>

      <Container>
        <Content>{children}</Content>
      </Container>

      <FluidContainer white>
        <Container>{renderFooter(t)}</Container>
      </FluidContainer>
    </>
  );
};

ExplorerLayout.propTypes = {
  children: PropTypes.node,
  headerLogoAction: PropTypes.func,
  headerRight: PropTypes.node,
  loading: PropTypes.bool,
};

ExplorerLayout.defaultProps = {};
