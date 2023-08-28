import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Button, Flex, H1, H2, H3, H4, H5, Image, Text } from "@licenserocks/kit";
import styled from "styled-components";
import { getBaseUrl } from "../../../utils/url";
import { ModernLayout } from "../../../components/layout/modernLayout";
import { GEO_VISUALIZATION_COUNTRY_CODES, getGeoVisualizationCountryName } from "../../../components/nft/geoDetails";
import { GeoHighlight } from "../../../components/nft/geoHighlights";
import { EffectiveDateVisualization } from "../../../components/nft/effectiveDate";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params, query }) => {
  const { nftId } = params;
  const { platform, redirectUrl } = query;



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

const metricsDataBackup = {
  content: "Digital Membership",
  territory: "Territory",
  transferable: true,
  effectiveDate: { isUnlimited: true },
  privateRights: false,
  exclusiveRights: false,
  commercialFooter: "",
  commercialRights: ["PfP", "Digital Membership"],
  aiUsageDescription: "The processing, utilization, or any form of use of the Non-Fungible Token (NFT) and its attached digital items, created by the creative, by artificial intelligence (AI) systems is strictly prohibited without explicit written consent from the copyright owner. No rights, explicit or implied, are granted to any party to employ the NFT and its associated digital items in conjunction with AI technologies unless authorized in writing by the copyright owner. Any unauthorized use of the NFT and its attached digital items with AI systems shall be deemed a violation of copyright and may result in legal action, including but not limited to injunctive relief, damages, and attorney's fees.",
  contentDescription: "Whale Protected - no more than 10 memberships per person is allowed.",
  highlightedCountries: "all",
  territoryDescription: "",
  commercialDescription: "Right to use the IP - When you purchase the membership, you get onchain fairly distributed one of our rare digital membership represented by a unique PfP. You are free to use the NFT for any purpose you wish. However, the UnitedBearSociety name is a registered trademark ofUnited Labs GmbH, and cannot be used without express permission. We encourage all members of UnitedBearSociety to take full advantage of your IP rights and explore with us in a collaborative way new ways to think, work and live together. Own the Future. Please note if at anytime you would sell your UnitedBearSociety NFT you relinquish all rights and do not have permissions to use any longer.",
  transferableDescription: "The initial founder's tokens issued herewith are strictly non-transferable and represent personalized memberships. These tokens are uniquely associated with the individual founders and are not permitted to be transferred, assigned, or conveyed to any third party, in whole or in part, without explicit written consent from the issuer. Furthermore, the issuer retains the right to modify, amend, or alter the terms of transferability and membership status associated with these tokens, including but not limited to granting transferability or expanding membership privileges, at their sole discretion and without prior notice. Any such changes shall be communicated to the token holders upon the public reveal of the Mintpass. Any attempt to transfer or assign the founder's tokens without proper authorization, or any violation of the terms and conditions pertaining to these tokens, may result in immediate revocation of membership privileges and potential legal consequences. By holding and retaining these initial founder's tokens, the token holder acknowledges and agrees to abide by the terms and conditions set forth herein, as well as any future changes introduced by the issuer.",
  effectiveDateDescription: "",
  privateRightsDescription: "",
  exclusiveRightsDescription: "",
  commercialRightsDescription:
    "Your PfP - NFT IP Rights\n" +
    "<br>\n" +
    "<br>\n" +
    "When you purchase an NFT, you own the image. You are free to use the NFT for any purpose you wish. However, please be aware that certain names or trademarks associated with the NFT need the consent of the copyright holder to be used, for instance, United Labs Gmbh or United Bear Society, and their use may require express permission. We encourage all NFT holders to be mindful of their intellectual property (IP) rights. Additionally, if you choose to sell your NFT at any time, it's essential to understand that you may relinquish all rights associated with the NFT and may no longer have permission to use it."
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

const IndexNftPage = ({ nftId, platform, redirectUrl }) => {
  const { data } = useSWR(`${getBaseUrl(platform)}/api/public/nft/${nftId}`);
  const nftData = data?.nft;
  const metricsData = data?.licenseMetrics?.payload; // { highlightedCountries: "all" };
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

  const commercialRightsData = Object?.keys(metricsData?.commercialRights)
    .filter(key => metricsData?.commercialRights[key].isActive)
    .map(key => key);

  const contentData = Object?.keys(metricsData.content)
    .filter(key => metricsData.content[key].isActive)
    .map(key => key);


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
            {commercialRightsData?.map(
              (commercialRight, index, original) => {
                const isLastItem = index == original.length - 1;

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
          <ContentText mt={2} fontWeight="bold">
            <div
              dangerouslySetInnerHTML={{
                __html: metricsData?.commercialRightsDescription
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
          {contentData?.map(
            (contentItem, index, original) => {
              const isLastItem = index == original.length - 1;

              return (
                <>
                  <H4 key={index}>{`${contentItem}`}</H4>
                  {!isLastItem ? (
                    <CommercialRightsComma>,</CommercialRightsComma>
                  ) : null}
                </>
              );
            }
          )}
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
          {metricsData?.effectiveDate?.dateRange?.start && metricsData?.effectiveDate?.dateRange?.end ? (
            <EffectiveDateVisualization
              startDate={new Date(metricsData?.effectiveDate?.start)}
              endDate={new Date(metricsData?.effectiveDate?.end)}
            />
          ) : metricsData?.effectiveDate?.isNolimited ? (
            <EffectiveDateVisualization isUnlimited />
          ) : null}
        </ModuleDivider>
        <BorderLine />
        <ModuleDivider>
          <GeoContainer>
            <GeoResponsiveContainer>
              <GeoResponsiveHeader>Territory</GeoResponsiveHeader>
              {metricsData?.territory?.isWorldwide ? <GeoCountryName>Worldwide License</GeoCountryName> :
                <>
                  {legibleGeoCountries?.map((legibleGeoCountry) => (
                    <GeoCountryName key={legibleGeoCountry} id={legibleGeoCountry}>
                      {legibleGeoCountry}
                    </GeoCountryName>
                  ))}
                </>}
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
              {metricsData?.printLicensingAgreement?.isActive ? (
                <H1 content="Active" />
              ) : (
                <H1 content="Non active" />
              )}
              <ContentText mt={2} fontWeight="bold">
                {metricsData?.printLicensingAgreement?.description}
              </ContentText>
            </ModuleDivider>
          </>
        ) : null}
        {metricsData?.publicationRightLicense?.isActive ? (
          <>
            <BorderLine />
            <ModuleDivider>
              <H5 content="Print Licensing Agreement" />
              <H1 content={metricsData?.publicationRightLicense?.title} />
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
