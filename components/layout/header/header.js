import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Image } from "@licenserocks/kit";

const StyledHeader = styled(Grid).attrs(() => ({
  container: true,
  alignItems: "center",
}))`
  height: 128px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 96px;
  }
`;

const StyledLogo = styled(Image).attrs(() => ({
  alt: "Logo",
  src: "/images/mp-logo.svg",
}))`
  width: auto;
  height: 50px;
`;

export const ExplorerLayoutHeader = ({ headerRight, logoAction, ...props }) => {
  return (
    <StyledHeader {...props}>
      <Grid item lg={9} xs={6}>
        <StyledLogo onClick={logoAction} />
      </Grid>
      <Grid container item justify="flex-end" lg={3} xs={6}>
        {headerRight}
      </Grid>
    </StyledHeader>
  );
};

ExplorerLayoutHeader.propTypes = {
  headerRight: PropTypes.node,
  logoAction: PropTypes.func,
};
;
