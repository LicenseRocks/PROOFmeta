import React from "react";
import styled, { useTheme } from "styled-components";
import { Button, Divider, H4, Icon, Image, Text } from "@licenserocks/kit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

import { config } from "config";

const { branding } = config;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing(20, 0)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(10, 0)};
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(10)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-bottom: ${({ theme }) => theme.spacing(6)};

    .contact-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 0 100%;
      margin-top: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

const StyledText = styled(Text).attrs(() => ({
  color: "textSecondary",
}))`
  && {
    font-size: 16px;
    font-weight: normal;

    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 24px;
      font-weight: 300;
      margin-right: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing(4, 0, 18, 0)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(6, 0, 14, 0)};
  }
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex: 0 100%;
    text-align: center;
    :not(:first-child) {
      margin-top: ${({ theme }) => theme.spacing(6)};
    }
  }
`;

const ListItem = styled.li`
  display: inline;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};

  a,
  svg {
    color: ${({ theme }) => theme.palette.text.secondary};
    text-decoration: none;
  }

  :not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(6)};
  }

  :hover {
    opacity: 0.7;
  }
`;
const StyledLogo = styled(Image).attrs(() => ({
  alt: "Logo",
  src: "/images/PROOFmeta-Logo-2.1.svg",
}))`
  width: auto;
  height: 70px;
`;
const Copyright = styled(H4).attrs(() => ({
  align: "center",
}))`
  color: ${({ theme }) => theme.palette.text.secondary};

  .brand {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const createCHUrl = (path) =>
  `${process.env.NEXT_PUBLIC_CREATORSHUB_URL}${path}`;

const renderLink = (title, href) => (
  <a href={href} target="_blank" rel="noreferrer">
    {title}
  </a>
);

const renderSocial = () => (
  <>
    <ListItem>
      {renderLink(
        <Icon icon="twitter" prefix="fab" size="lg" />,
        "https://twitter.com/licenserocks"
      )}
    </ListItem>

    <ListItem>
      {renderLink(
        <Icon icon="linkedin-in" prefix="fab" size="lg" />,
        "https://www.linkedin.com/company/license.rocks"
      )}
    </ListItem>
  </>
);

export const renderFooter = (t) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Footer>
      <TopSection>
        <StyledLogo />
        <div className="contact-section">
          <StyledText content={t("footer.question")} dInline />

          <Button
            content={t("footer.getInTouch")}
            href={createCHUrl("/contact")}
            rel="noreferrer"
            size={isMobile ? "sm" : "lg"}
            target="_blank"
          />
        </div>
      </TopSection>

      <Divider />

      <BottomSection>
        <StyledList>
          <ListItem>
            {renderLink(t("footer.links.vision"), createCHUrl("/vision"))}
          </ListItem>

          <ListItem>
            {renderLink(t("footer.links.contactUs"), createCHUrl("/contact"))}
          </ListItem>

          <Hidden smDown>{renderSocial()}</Hidden>
        </StyledList>

        <StyledList>
          <ListItem>
            {renderLink(t("footer.links.imprint"), createCHUrl("/imprint"))}
          </ListItem>

          <ListItem>
            {renderLink(t("footer.links.termsOfUse"), createCHUrl("/terms"))}
          </ListItem>

          <ListItem>
            {renderLink(
              t("footer.links.privacy"),
              createCHUrl("/privacy-policy")
            )}
          </ListItem>
        </StyledList>

        <Hidden mdUp>
          <StyledList>{renderSocial()}</StyledList>
        </Hidden>
      </BottomSection>

      <Copyright>
        <span>{`${t("footer.fromBerlin")} `}</span>
        <Icon color="error" icon="heart" dInline />
        <span>{` ${t("footer.by")} `}</span>
        <span className="brand">©license.rocks</span>
      </Copyright>
    </Footer>
  );
};
