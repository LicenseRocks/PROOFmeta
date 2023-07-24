import React from "react";
import { ExplorerLayout } from "components";
import PropTypes from "prop-types";
import useSWR from "swr";
import { getBaseUrl } from "../../../utils/url";
import { Box, Flex, H2, H3, H4, H5, Icon, Image, Text } from "@licenserocks/kit";
import styled from "styled-components";

export const getServerSideProps = async ({ params, query }) => {
  const { nftId } = params;
  const { platform } = query;
  return {
    props: {
      nftId,
      platform
    }
  };
};

const IndexNftPage = ({ nftId, platform }) => {
  const { data, isValidating } = useSWR(`${getBaseUrl(platform)}/api/public/nft/${nftId}`);

  const nftData = data?.nft;
  const metricsData = data?.licenseMetrics?.payload;

  return (
    <Container>
      <H2 align="center" mb={4} content={nftData?.title} />
      <NftData>
        <Image src={nftData?.coverSrc} />
        {/*<NftContent>*/}

        {/*</NftContent>*/}
      </NftData>
      <CreatorsData>
        <Text mr={1} content={"Creator: "} />
        <Text mr={1} content={nftData?.creator?.username} />
      </CreatorsData>

      <CardsContainer>
        <Box className={"metricItem"}>
          <H4 mb={2}>License metrics</H4>
          <H5 content={"Insights"} />
        </Box>
        <Box>
          <H5 content={"Commercial"} />
          <RightsRow>
            {metricsData?.commercialRights?.map(
              (commercialRight, index, original) => {
                const isLastItem = index == original.length - 1;
                if (!commercialRight) {
                  return null;
                }
                return (
                  <>
                    <H4 key={index}>{`${commercialRight}`}</H4>
                    {!isLastItem ? (
                      <CommercialRightsComma>,</CommercialRightsComma>
                    ) : null}
                  </>
                );
              }
            )}
          </RightsRow>
        </Box>
        <Box>
          <H5 content={"AI usage"} />
          <RightsRow>
            <H4>
              {metricsData?.aiUsage ? "Yes" : "No"}
            </H4>
          </RightsRow>
        </Box>
        {metricsData?.privateRights ? (
          <Box>
            <H5 content={("licensemetrics.private.label")} />
            <RightsRow>
              <H4>{("licensemetrics.private.context")}</H4>
            </RightsRow>
          </Box>
        ) : null}
        <Box>
          <H4 content={"Content"} />
          <H3>{metricsData?.content}</H3>
        </Box>
          <Box>
            <H5 content={"Transferable"} />
            {metricsData?.transferable ? (
              <H4 content={"Yes"} />
            ) : (
              <H4 content={"No"} />
            )}
          </Box>
          <Box>
            <H5 content={"ExclusiveRights"} />
            {metricsData?.exclusiveRights ? (
              <H4 content={"Yes"} />
            ) : (
              <H4 content={"No"} />
            )}
          </Box>
        <Box>
          <H5 content={"EffectiveDate"} />
        </Box>
      </CardsContainer>
    </Container>
  );
};

IndexNftPage.Layout = ExplorerLayout;

IndexNftPage.propTypes = {
  nftId: PropTypes.string.isRequired
};

IndexNftPage.defaultProps = {};

export default IndexNftPage;

const Container = styled.div`
  width: 100%;
  height: 100%;

  h2 {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const NftData = styled.div`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-height: 200px;
  justify-content: center;

  img {
    border-radius: 32px !important;
    object-fit: cover;
    width: 243px;
    max-height: 217px;
    flex-shrink: 0;
  }
`;

const NftContent = styled.div`

`;

const CreatorsData = styled.div`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  font-weight: bold;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background:  #F1F1F4;
  
.metricItem{
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  background:  #F1F1F4;
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

const RightsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CommercialRightsComma = styled(H4)`
  margin-right: ${({ theme }) => theme.spacing(1)} !important;
`;

const CardsRow = styled.div`
  gap: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const HoverableBox = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`;

const InsightsContainer = styled.a`
  gap: ${({ theme }) => theme.spacing(4)};
  text-decoration: none;
  color: black;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const GeoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;

    &:after {
      content: " ";
    }
  }
`;

const GeoCountryName = styled(H4)`
  color: orange;

  ${({ theme }) => theme.breakpoints.down("md")} {
    &:after {
      content: " ";
      margin-left: ${({ theme }) => theme.spacing(1)};
      position: relative;
      width: 20px;
      height: 20px;
    }
  }
`;

const GeoResponsiveHeader = styled(H5)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    &:after {
      content: " ";
      margin-left: ${({ theme }) => theme.spacing(1)};
      position: relative;
      width: 20px;
      height: 20px;
    }
  }
`;

const GeoResponsiveContainer = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: row;
    flex-wrap: wrap;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const Insights = styled(H5)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const InsightsLink = styled(H5)`
  color: orange;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const MetaproofLogo = styled(Image)`
  height: ${({ theme }) => theme.spacing(13)};
`;

const InsightsRow = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    color: orange;
  }
`;

const ALLOWED_COUNTRY_NAMES_DISPLAY = 4;