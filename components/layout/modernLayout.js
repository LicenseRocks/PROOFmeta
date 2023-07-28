import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Grid from "@material-ui/core/Grid";
import MuiContainer from "@material-ui/core/Container";
import { DISPLAY, Divider, Flex, H4, OutlineButton, PageLoading, SPACER, Text } from "@licenserocks/kit";
import { useTranslation } from "next-i18next";
import { ModernHeader } from "./header/modernHeader";
import Link from "next/link";

const LayoutContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
`;
const FluidContainer = styled(MuiContainer).attrs(() => ({}))`

  ${({ white }) =>
    white &&
    css`
      background-color: ${({ theme }) => theme.palette.common.white};
    `}
`;

const Container = styled(MuiContainer).attrs(() => ({}))` min-width: 100vw !important;
  padding: 0 !important;
  margin: 0 !important;
`;

const Content = styled(Grid).attrs(() => ({}))`
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(20)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-top: ${({ theme }) => theme.spacing(2)};
  }
`;

export const ModernLayout = ({
  children,
  headerLogoAction,
  loading
}) => {
  const { t } = useTranslation("layout");
  const { redirectUrl, nftId } = children?.props;

  if (loading) return <PageLoading fullScreen />;

  return (
    <LayoutContainer>
      <FluidContainer white>
        <ModernHeader buyUrl={`${redirectUrl}/nft/${nftId}`} />
      </FluidContainer>

      <Container>
        <Content>{children}</Content>
      </Container>

      <FluidContainer white>

        <TopSection>
          <Spacer />

          <div className="contact-section">
            <div className="contact-section-inner">
              <ContactText
                content={"Do you have any questions?"}
                dInline
              />
              <ContactButton
                color="subtle"
                content={"Get in Touch"}
                href={`${redirectUrl}/contact`}
                size="lg"
                target="_blank"
              />

            </div>
          </div>
        </TopSection>
        <StyledDivider />
        <Container>
          <Footer>
            <FooterLinks container spacing={8}>
              <LinksHalf>
                <Link href={`${redirectUrl}/imprint`}>
                  <Text mr={2} content={"Imprint"} />
                </Link>

                <Link href={`${redirectUrl}/support`}>
                  <Text content={"Support"} />
                </Link>
              </LinksHalf>

              <LinksHalf>
                <Link href={`${redirectUrl}/terms`}>
                  <Text mr={2} content={"Terms of usage"} />
                </Link>

                <Link href={`${redirectUrl}/privacy`}>
                  <Text content={"Privacy"} />
                </Link>
              </LinksHalf>
            </FooterLinks>

            <BottomSection>
              <H4 content="From Berlin with 🧡 by ©license.rocks" mb={6} />
            </BottomSection>
          </Footer>
        </Container>
      </FluidContainer>
    </LayoutContainer>
  );
};

ModernLayout.propTypes = {
  children: PropTypes.node,
  headerLogoAction: PropTypes.func,
  headerRight: PropTypes.node,
  loading: PropTypes.bool
};

ModernLayout.defaultProps = {};

const Footer = styled.div`
  max-width: 1200px;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(0, 0, 8, 0)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }

  ${(theme) => SPACER(theme)}
  ${(theme) => DISPLAY(theme)}
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(16)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: ${({ theme }) => theme.spacing(8)};
  }
`;

const StyledDivider = styled(Divider)`
  line-height: 2px;

  &::before {
    height: 2px;
    color: ${({ theme }) => theme.palette.gray.black};
    border-color: ${({ theme }) => theme.palette.gray.black};
    background-color: ${({ theme }) => theme.palette.gray.black};
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const StyledText = styled(Text).attrs(() => ({
  color: "black"
}))`
  && {
    font-size: 16px;
    font-weight: 400;

    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 24px;
      margin-right: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(10)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-bottom: ${({ theme }) => theme.spacing(4)};

    .contact-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex: 0 100%;
      margin-top: ${({ theme }) => theme.spacing(10)};
    }

    .contact-section-inner {
      display: flex;
      width: 100%;
      flex-direction: column;

      gap: ${({ theme }) => theme.spacing(8)};
      align-items: center;

      ${({ theme }) => theme.breakpoints.down("sm")} {
        gap: ${({ theme }) => theme.spacing(6)};
      }
    }
  }
`;

const ContactText = styled(Text).attrs(() => ({
  color: "black"
}))`
  && {
    font-size: 16px;
    font-weight: 400;

    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 24px;
      margin-right: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

const Spacer = styled.div`
  max-width: 180px;
  max-height: 48px;
`;

const ContactButton = styled(OutlineButton)`
  color: black !important;
  border-radius: 32px !important;
  border: 2px solid black !important;
`;

const LinksHalf = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 38px;
  margin-top: 20px;
  cursor: pointer;
`;

const FooterLinks = styled(Flex)`
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100% !important;
    flex-direction: column;
    justify-content: center;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
`;