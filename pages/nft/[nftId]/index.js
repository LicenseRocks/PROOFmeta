import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import {
  Button,
  Flex,
  H1,
  H2,
  H3,
  H4,
  H5,
  Image,
  Text,
} from "@licenserocks/kit";
import styled from "styled-components";
import { getBaseUrl } from "../../../utils/url";
import { ModernLayout } from "../../../components/layout/modernLayout";
import {
  GEO_VISUALIZATION_COUNTRY_CODES,
  getGeoVisualizationCountryName,
} from "../../../components/nft/geoDetails";
import { GeoHighlight } from "../../../components/nft/geoHighlights";
import { EffectiveDateVisualization } from "../../../components/nft/effectiveDate";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params, query }) => {
  const { nftId } = params;
  const { platform, buyUrl } = query;
  return {
    props: {
      nftId,
      platform,
      buyUrl,
    },
  };
};

const IndexNftPage = ({ nftId, platform, buyUrl }) => {
  const { data } = useSWR(`${getBaseUrl(platform)}/api/public/nft/${nftId}`);
  const nftData = data?.nft;
  const metricsData = data?.licenseMetrics?.payload; // { highlightedCountries: "all" };
  const router = useRouter();

  const finalHighlightedCountries =
    !Array.isArray(metricsData?.highlightedCountries) &&
    metricsData?.highlightedCountries === "all"
      ? GEO_VISUALIZATION_COUNTRY_CODES
      : metricsData?.highlightedCountries;

  const geoCountriesNames = finalHighlightedCountries?.map(
    (highlightedCountry) => getGeoVisualizationCountryName(highlightedCountry)
  );
  const ALLOWED_COUNTRY_NAMES_DISPLAY = 4;
  const legibleGeoCountries =
    metricsData?.highlightedCountries === "all"
      ? ["worldwide"]
      : geoCountriesNames?.length > ALLOWED_COUNTRY_NAMES_DISPLAY
        ? [...geoCountriesNames.slice(0, ALLOWED_COUNTRY_NAMES_DISPLAY), "..."]
        : geoCountriesNames;

  return (
    <Container>
      <NftWrapper>
        <H2 align="center" my={4} content={nftData?.title} />
        <NftData>
          <Image src={nftData?.coverSrc} />
          <NftContent>
            {nftData?.description || "no description provided"}
          </NftContent>
        </NftData>
      </NftWrapper>

      <CreatorWrapper>
        <CreatorsData>
          <Image src={nftData?.creator.avatarUrl} />
          {nftData?.creator?.isCreator ? (
            <Text mt={1} content="Creator" />
          ) : null}
          <CreatorName
            mt={1}
            fontWeight="bold"
            content={nftData?.creator?.username}
          />
        </CreatorsData>
        <CreatorDescription>
          {nftData?.creator?.description || "no creator description provided"}
        </CreatorDescription>
      </CreatorWrapper>

      <BuyRow>
        <Button onClick={()=> router.push(buyUrl)}>Buy this NFT</Button>
      </BuyRow>

      <CardsContainer>
        <ModuleDivider>
          <H5 content="Commercial" />
          <RightsRow>
            {metricsData?.commercialRights?.map(
              (commercialRight, index, original) => {
                const isLastItem = index == original.length - 1;
                if (!commercialRight) {
                  return null;
                }
                return (
                  <>
                    <H1 key={index}>{`${commercialRight}`}</H1>
                    {!isLastItem ? (
                      <CommercialRightsComma>,</CommercialRightsComma>
                    ) : null}
                  </>
                );
              }
            )}
          </RightsRow>
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.commercialRights?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="AI usage" />
          <RightsRow>
            <H1>{metricsData?.aiUsage ? "Yes" : "No"}</H1>
          </RightsRow>
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.aiUsage?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        {metricsData?.privateRights ? (
          <>
            <ModuleDivider>
              <H5 content="licensemetrics.private.label" />
              <RightsRow>
                <H1>licensemetrics.private.context</H1>
              </RightsRow>
              <ContentText mt={2} fontWeight="bold">
                {metricsData?.privateRights?.description}
              </ContentText>
            </ModuleDivider>
            <BorderLine />
          </>
        ) : null}

        <ModuleDivider>
          <H4 content="Content" />
          <H1>{metricsData?.content}</H1>
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.content?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="Transferable" />
          {metricsData?.transferable ? (
            <H1 content="Yes" />
          ) : (
            <H1 content="No" />
          )}
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.transferable?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="ExclusiveRights" />
          {metricsData?.exclusiveRights ? (
            <H1 content="Yes" />
          ) : (
            <H1 content="No" />
          )}
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.exclusiveRights?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="EffectiveDate" />
          <ContentText my={2} fontWeight="bold">
            {metricsData?.effectiveDate?.description}
          </ContentText>
          {metricsData?.effectiveDate ? (
            <EffectiveDateVisualization
              startDate={new Date(metricsData?.effectiveDate?.start)}
              endDate={new Date(metricsData?.effectiveDate?.end)}
            />
          ) : metricsData?.effectiveDate?.isUnlimited ? (
            <EffectiveDateVisualization isUnlimited />
          ) : null}
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <GeoContainer>
            <GeoResponsiveContainer>
              <GeoResponsiveHeader>Territory</GeoResponsiveHeader>
              {legibleGeoCountries?.map((legibleGeoCountry) => (
                <GeoCountryName key={legibleGeoCountry} id={legibleGeoCountry}>
                  {legibleGeoCountry}
                </GeoCountryName>
              ))}
            </GeoResponsiveContainer>
            <ContentText my={2} fontWeight="bold">
              {metricsData?.territory?.description}
            </ContentText>
            <GeoHighlight
              width={205}
              height={130}
              highlightedCountries={finalHighlightedCountries}
            />
          </GeoContainer>
        </ModuleDivider>
        <BorderLine />
        <InsightsContainer
          target="_blank"
          href="https://explorer.license.rocks/home"
        >
          <Flex>
            <H3>License Metrics</H3>
            <Insights mb={2}>
              Learn more about license metrics at PROOFmeta
            </Insights>
            <InsightsRow>
              <InsightsLink>Learn More</InsightsLink>
            </InsightsRow>
          </Flex>
          <MetaproofLogo src="/images/PROOFmeta-Logo-2.1.svg" />
        </InsightsContainer>
      </CardsContainer>
    </Container>
  );
};

IndexNftPage.Layout = ModernLayout;

IndexNftPage.propTypes = {
  nftId: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
};

IndexNftPage.defaultProps = {};

export default IndexNftPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const NftData = styled.div`
  width: 100%;
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
  flex: 1;
  margin-left: 24px;
`;

const CreatorWrapper = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  margin-bottom: 32px;
  background: #f1f1f4;
  border-radius: 16px;
  display: flex;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 30px;
  }
`;

const CreatorDescription = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const CreatorsData = styled.div`
  padding: 24px;
  margin-top: 15px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  width: 243px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
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

const RightsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CommercialRightsComma = styled(H1)`
  margin-right: ${({ theme }) => theme.spacing(1)} !important;
`;

const GeoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

const GeoCountryName = styled(H4)`
  color: orange;
  font-size: 32px !important;

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
  font-size: ${({ theme }) => theme.spacing(10)} !important;
  color: white;
  max-width: 380px;
`;

const InsightsLink = styled(H5)`
  margin-right: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.spacing(5)} !important;
`;

const MetaproofLogo = styled(Image)`
  height: ${({ theme }) => theme.spacing(43)};
`;

const InsightsRow = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    color: black !important;
  }
`;

const NftWrapper = styled.div`
  text-align: left;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.breakpoints.down("md")} {
   padding: 30px;
  }
  
  h2 {
    width: 100%;
    text-align: start;
  }
`;

const InsightsContainer = styled.a`
  gap: ${({ theme }) => theme.spacing(4)};
  text-decoration: none;
  color: black;
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #fd9f2c;
  margin-top: 0;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    height: 440px;
  }

  h3 {
    color: white;
  }
`;

const ModuleDivider = styled.div`
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BorderLine = styled.div`
  height: 16px;
  background: white;
`;

const BuyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  button {
    border-radius: 32px !important;
    background-color: orange !important;
  }
`;

const ContentText = styled(Text)`
  font-size: 16px;
  line-height: 160% !important;
  letter-spacing: -0.16px !important;
`;

const CreatorName = styled(Text)`
  color: orange;
  font-size: 24px;
`;
