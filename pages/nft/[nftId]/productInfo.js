import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Text } from "@licenserocks/kit";
import styled from "styled-components";
import { getBaseUrl } from "../../../utils/url";
import { ModernLayout } from "../../../components/layout/modernLayout";
import { EnvironmentalPart, GovernancePart, InsightsComponent, NftModule, productInfoData, SocialResponsibilityPart } from "components/productInfo";

export const getServerSideProps = async ({ params, query }) => {
  const { nftId } = params;
  const { platform, redirectUrl } = query;

  return {
    props: {
      nftId,
      platform,
      redirectUrl
    }
  };
};

const ProductInfoPage = ({ nftId, platform, redirectUrl }) => {
  const { data, isValidating } = useSWR(`${getBaseUrl(platform)}/api/public/nft/${nftId}`);
  const nftData = data?.nft;

  const { environmentImpact, socialResponsibility, governance } = productInfoData;

  return (
    <Container>
      {!isValidating && nftData ?
        <NftModule data={nftData} redirectUrl={redirectUrl} />
        : null}
      <CardsContainer>
        <EnvironmentalPart environmentImpact={environmentImpact} />
        <SocialResponsibilityPart socialResponsibility={socialResponsibility} />
        <GovernancePart governance={governance} />
        <BorderLine />
        <InsightsComponent />
      </CardsContainer>
    </Container>
  );
};

ProductInfoPage.Layout = (props) => {

  return (<ModernLayout {...props} />);

};

ProductInfoPage.propTypes = {
  nftId: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired
};

ProductInfoPage.defaultProps = {};

export default ProductInfoPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #f1f1f4;

  .metricItem {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    background: #f1f1f4;
  }

  & div:first-child {
    margin-top: 0;
  }

  & > * {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }

  margin-bottom: ${({ theme }) => theme.spacing(4)};
  margin-top: -${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-inline: auto;
  }
`;

const BorderLine = styled.div`
  height: ${props => (props.gap ? `${props.gap}px` : "16px")};
  background: white !important;
`;

