import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Image, OutlineButton } from "@licenserocks/kit";
import Link from "next/link";

const StyledHeader = styled(Flex).attrs(() => ({
  container: true,
  alignItems: "center"
}))`
  height: 128px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 96px;
  }

  button {
    border: 3px solid !important;
    border-radius: 32px !important;
  }
`;

const StyledLogo = styled(Image).attrs(() => ({
  alt: "Logo",
  src: "/images/PROOFmeta-Logo-2.1.svg"
}))`
  width: auto;
  height: 70px;
`;
const BuyButton = styled(OutlineButton)`
@media(max-width: 767px){
  font-size: 0.8rem !important;
}
`
export const ModernHeader = ({ ...props }) => {
  const { buyUrl } = props;
  return (
    <StyledHeader {...props}>
      <Flex>
        <StyledLogo />
      </Flex>
      <Flex container item justify="flex-end" lg={3} xs={6}>
        <Link href={buyUrl}>
          <BuyButton color={"secondary"}
                         content={"Buy this NFT"}/>
        </Link>

      </Flex>
    </StyledHeader>
  );
};

ModernHeader.propTypes = {
  logoAction: PropTypes.func
};

