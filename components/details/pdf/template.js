import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import QRCode from "qrcode.react";
import { Icon, useAppContext } from "@licenserocks/kit";

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  width: 595px;
  height: 842px;
  background: #fff;

  @media not print {
    overflow: hidden;
  }

  font-family: Inter;
  position: relative;
`;

const Header = styled.div`
  height: 150px;

  &::before {
    content: "";
    display: block;
    width: 294px;
    height: 294px;
    background: #ffe94e;
    -webkit-print-color-adjust: exact;
    margin-top: -194px;
    border-radius: 50%;
    margin-right: 10px;
    position: absolute;
    z-index: 0;
  }

  &::after {
    content: "";
    display: block;
    width: 61px;
    height: 61px;
    background: ${({ theme }) => theme.palette.primary.main};
    -webkit-print-color-adjust: exact;
    margin-top: 63px;
    margin-left: -31px;
    border-radius: 50%;
    position: absolute;
    z-index: 0;
  }
`;

const QRCodeContainer = styled.div`
  width: 76px;
  height: 76px;
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
  flex-direction: column;
`;

const StyledQRCode = styled(QRCode)`
  width: 76px !important;
  height: 76px !important;
`;

const QRCodeHint = styled.p`
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  width: 100%;
`;

const LogoContainer = styled.div`
  z-index: 1;
  position: absolute;
  left: 107px;
  top: 29px;
  height: 28px;
  img {
    margin: 0 3px;
  }
`;

const Footer = styled.div`
  height: 48px;
  width: 595px;
  display: flex;
  position: absolute;
  bottom: 0px;
  background: #fff;
  border-bottom: 5px solid ${({ theme }) => theme.palette.primary.main};
`;

const FooterItem = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 10px;
  padding: 0 32px;
  svg {
    width: 10px;
    margin-right: 10px !important;
    display: block;
    color: #8685a6;
  }
`;

const Content = styled.div`
  height: calc(100%);
`;

export const PDFTemplate = ({ qrcodeValue, qrcodeHint, children }) => {
  const { branding } = useAppContext();
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Header>
          <LogoContainer>
            <img src={branding.logo} alt="logo" height="28" />
            <img src={branding.logoType} alt="logotype" height="28" />
          </LogoContainer>
          <QRCodeContainer>
            <StyledQRCode renderAs="svg" value={qrcodeValue} />
            <QRCodeHint>{qrcodeHint}</QRCodeHint>
          </QRCodeContainer>
        </Header>
        <Content>{children}</Content>
        <Footer>
          <FooterItem>
            <Icon icon="globe" />
            <p>{branding.organizationName}</p>
          </FooterItem>
          <FooterItem>
            <Icon icon="phone" />
            <p>{branding.organizationPhone}</p>
          </FooterItem>
          <FooterItem>
            <Icon icon="envelope" />
            <p>{branding.organizationEmail}</p>
          </FooterItem>
        </Footer>
      </Wrapper>
    </>
  );
};

PDFTemplate.propTypes = {
  qrcodeValue: PropTypes.string,
  qrcodeHint: PropTypes.string,
  children: PropTypes.node.isRequired,
};
PDFTemplate.defaultProps = {
  qrcodeValue: null,
  qrcodeHint: null,
};
