import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Button, Flex, H1, H2, H3, H4, H5, Image, RocksSpinner, Text } from "@licenserocks/kit";
import styled from "styled-components";
import { ModernLayout } from "../../../components/layout/modernLayout";
import { GEO_VISUALIZATION_COUNTRY_CODES, getGeoVisualizationCountryName } from "../../../components/nft/geoDetails";
import { GeoHighlight } from "../../../components/nft/geoHighlights";
import { EffectiveDateVisualization } from "../../../components/nft/effectiveDate";
import { useRouter } from "next/router";
import { isEmpty } from "lodash/lang";

function getCoreUrl(urlString) {
  try {
    const url = new URL(urlString);
    return `${url.protocol}//${url.host}`;
  } catch (error) {
    console.error("Invalid URL", error);
    return null;
  }
}

export const getServerSideProps = async ({ params, query }) => {
  const { nftId } = params;
  const { redirectUrl } = query;
  const platform = getCoreUrl(redirectUrl);

  if (!platform || !redirectUrl) {
    return {
      redirect: {
        destination: `/404`
      }
    };
  }

  return {
    props: {
      nftId,
      platform,
      redirectUrl
    }
  };
};

function filterURL(url) {
  // Use a regular expression to extract the base URL
  const regex = /^(https?:\/\/[^/]+)/;
  const match = url.match(regex);

  if (match && match.length > 0) {
    return match[1];
  }

  // Return the original URL if no match found
  return url;
}

const IndexNftPage = ({ nftId, redirectUrl, platform }) => {
  const { data, isValidating } = useSWR(`${platform}/api/public/nft/${nftId}`);
  const nftData = data?.nft;
  const metricsData = data?.licenseMetrics?.payload;
  const isVisible = data?.licenseMetrics?.isVisible;
  const router = useRouter();
  const finalHighlightedCountries =
    !Array.isArray(metricsData?.territory.highlightedCountries) &&
    metricsData?.territory.isWorldwide
      ? GEO_VISUALIZATION_COUNTRY_CODES
      : metricsData?.territory?.highlightedCountries;

  const filteredURL = filterURL(redirectUrl);

  const geoCountriesNames = finalHighlightedCountries?.map(
    (highlightedCountry) => getGeoVisualizationCountryName(highlightedCountry)
  );
  const ALLOWED_COUNTRY_NAMES_DISPLAY = 4;
  const legibleGeoCountries =
    metricsData?.territory.isWorldWide
      ? ["Worldwide License"]
      : geoCountriesNames?.length > ALLOWED_COUNTRY_NAMES_DISPLAY
        ? [...geoCountriesNames.slice(0, ALLOWED_COUNTRY_NAMES_DISPLAY), "..."]
        : geoCountriesNames;

  if(isValidating) {
    return (
      <HiddenContainer>
        <RocksSpinner/>
      </HiddenContainer>
    )
  }

  if (!isVisible && !isValidating) {
    return (
      <HiddenContainer>
        <div>
          <H1 align={"center"} content={"Metric is set to be hidden."} />
          <Text mt={4} align={"center"} fontWeight={"bold"} content={"Please contact the creator for more information."} />
        </div>
      </HiddenContainer>
    );
  }



  return (
    <Container>
      <NftWrapper>
        <H2 align="center" my={4} content={nftData?.title} />
        <NftData>
          <Image src={nftData?.coverSrc} />
          {nftData?.description ?
            <NftContent dangerouslySetInnerHTML={{ __html: nftData?.description?.slice(0, 400) + "..." }} />
            :
            <NftContent>No description provided.</NftContent>
          }
        </NftData>
      </NftWrapper>
      {/*<CreatorWrapper>*/}
      {/*  <CreatorsData>*/}
      {/*    <Image src={nftData?.creator.avatarUrl} />*/}
      {/*    {nftData?.creator?.isCreator ? (*/}
      {/*      <Text mt={1} content="Creator" />*/}
      {/*    ) : null}*/}
      {/*    <CreatorName*/}
      {/*      mt={1}*/}
      {/*      fontWeight="bold"*/}
      {/*      content={nftData?.creator?.username}*/}
      {/*    />*/}
      {/*  </CreatorsData>*/}
      {/*  {nftData?.creator?.description ?*/}
      {/*    <CreatorDescription*/}
      {/*      dangerouslySetInnerHTML={{*/}
      {/*        __html:*/}
      {/*          nftData?.creator?.description?.slice(0, 200) + "..."*/}

      {/*      }}*/}
      {/*    />*/}
      {/*    :*/}
      {/*    <CreatorDescription>no creator description provided</CreatorDescription>*/}
      {/*  }*/}

      {/*</CreatorWrapper>*/}
      <BuyRow>
        <Button onClick={() => router.push(`${filteredURL}/nft/${nftId}`)}>Buy this NFT</Button>
      </BuyRow>
      <CardsContainer>
        <ModuleDivider>
          <H5 content="Private" />
          <RightsRow>

            {metricsData?.commercialRights?.category?.label ?
              <H1>{`${metricsData?.commercialRights?.category?.label}`}</H1>
              : <Text fontWeight={"bold"} content="Not specified" />
            }
          </RightsRow>
          <ContentText mt={2} fontWeight="bold">
            <div
              dangerouslySetInnerHTML={{
                __html: metricsData?.commercialRights?.description
              }}
            />
            {" "}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="AI usage" />
          <RightsRow>
            <H1>{metricsData?.aiusage?.isActive ? "Yes" : "No"}</H1>
          </RightsRow>
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.aiusage?.description}
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
                {metricsData?.privateRightsDescription}
              </ContentText>
            </ModuleDivider>
            <BorderLine />
          </>
        ) : null}

        <ModuleDivider>
          <H4 content="Content" />
          {metricsData?.content?.category?.label ?
            <H1>{metricsData?.content?.category?.label}</H1>
            : <Text fontWeight={"bold"} content="Not specified" />
          }
          <ContentText mt={2} fontWeight="bold">
            {metricsData?.content?.description}
          </ContentText>
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <H5 content="Transferable" />
          {metricsData?.transferable?.isActive ? (
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
          <H5 content="Exclusive Rights" />
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
          <H5 content="Effective Date" />
          <ContentText my={2} fontWeight="bold">
            {metricsData?.effectiveDateDescription}
          </ContentText>
          {!isEmpty(metricsData?.effectiveDate?.dateRange) ? (
            <EffectiveDateVisualization
              startDate={new Date(metricsData?.effectiveDate?.dateRange?.start)}
              endDate={new Date(metricsData?.effectiveDate?.dateRange?.end)}
            />
          ) : metricsData?.effectiveDate?.isNolimited ? (
            <EffectiveDateVisualization isUnlimited />
          ) : <Text mt={2} fontWeight={"bold"} content="Not specified" />}
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <GeoContainer>
            <GeoResponsiveContainer>
              <GeoResponsiveHeader>Territory</GeoResponsiveHeader>
              {metricsData?.territory?.isWorldwide ? <GeoCountryName>Worldwide License</GeoCountryName> :
                !isEmpty(legibleGeoCountries) ?
                  <>
                    {legibleGeoCountries?.map((legibleGeoCountry) => (
                      <GeoCountryName key={legibleGeoCountry} id={legibleGeoCountry}>
                        {legibleGeoCountry}
                      </GeoCountryName>
                    ))}
                  </> :
                  <Text mt={2} fontWeight={"bold"} content="Not specified" />
              }
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
        {metricsData?.printLicensingAgreement ? (
          <>
            <BorderLine />
            <ModuleDivider>
              <H5 content="Print Licensing Agreement" />
              {metricsData?.printLicensingAgreement?.title ? (
                <H1 content={metricsData?.printLicensingAgreement?.title} />
              ) : (
                <H1 content="Non active" />
              )}
              <ContentText mt={2} fontWeight="bold">
                {metricsData?.printLicensingAgreement?.description}
              </ContentText>
            </ModuleDivider>
          </>
        ) : null}
        {metricsData?.publicationRightLicense ? (
          <>
            <BorderLine />
            <ModuleDivider>
              <H5 content="Print Licensing Agreement" />
              {metricsData?.publicationRightLicense?.title ? (<H1 content={metricsData?.publicationRightLicense?.title} />) : (
                <H1 content="Non active" />)}

              <ContentText mt={2} fontWeight="bold">
                {metricsData?.publicationRightLicense?.description}
              </ContentText>
            </ModuleDivider>
          </>
        ) : null}
        <BorderLine />
        <InsightsContainer
          target="_blank"
          href=" https://license.rocks/proofmeta"
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

IndexNftPage.Layout = (props) => {

  return (<ModernLayout {...props} />);

};

IndexNftPage.propTypes = {
  nftId: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired
};

IndexNftPage.defaultProps = {};

export default IndexNftPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HiddenContainer = styled.div`
  height: calc(100vh - 478px);
  display: grid;
  place-items: center;
`;

const NftData = styled.div`
  width: 100%;
  display: flex;
  max-height: 200px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-height: 100%;
  }

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
  @media (max-width: 767px) {
    margin: 0;
  }
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

  svg {
    margin-left: auto;
    margin-right: auto;
  }
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

  @media (max-width: 767px) {
    padding: 1rem;
  }

  h2 {
    width: 100%;
    text-align: start;

    @media (max-width: 767px) {
      text-align: center;
    }
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

  @media (max-width: 767px) {
    padding: 1.5rem 1rem;
    margin: 0;
  }
`;

const ModuleDivider = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 1.5rem;
  }
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
