import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Image, Text } from "@licenserocks/kit";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";

const StyledHeader = styled(Flex).attrs(() => ({
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

const LangWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(4)};
`;

const Lang = styled(Text).attrs(({ active }) => ({
  dInline: true,
  fontSize: "sm",
  fontWeight: active ? "bold" : "normal",
}))`
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.palette.text.primary : theme.palette.text.secondary};
`;

export const ExplorerLayoutHeader = ({ headerRight, logoAction, ...props }) => {
  const { locale, push, pathname, query } = useRouter();
  const q = QueryString.stringify(query);
  const currentPath = `${pathname}${q ? `?${q}` : ""}`;

  return (
    <StyledHeader {...props}>
      <Flex item lg={9} xs={6}>
        <Link href="/">
          <StyledLogo onClick={logoAction} />
        </Link>
      </Flex>
      <Flex container item justify="flex-end" lg={3} xs={6}>
        {headerRight}

        <LangWrapper>
          <Lang
            onClick={() => push(currentPath, currentPath, { locale: "en" })}
            active={locale === "en"}
          >
            EN
          </Lang>
          <span> / </span>
          <Lang
            onClick={() => push(currentPath, currentPath, { locale: "de" })}
            active={locale === "de"}
          >
            DE
          </Lang>
        </LangWrapper>
      </Flex>
    </StyledHeader>
  );
};

ExplorerLayoutHeader.propTypes = {
  headerRight: PropTypes.node,
  logoAction: PropTypes.func,
};
