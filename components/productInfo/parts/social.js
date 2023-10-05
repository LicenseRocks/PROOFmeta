import React from "react";
import { BorderLine, ContentText, InfoContainer, ModuleDivider, RightsRow } from "./components";
import { CandlestickChart, SmilePlus, Heart } from "lucide-react";
import { H1, H2, H3 } from "@licenserocks/kit";

export const SocialResponsibilityPart = ({ socialResponsibility }) => {
  return (
    <>
      <ModuleDivider>
        {socialResponsibility?.title ?
          <RightsRow>
            <H1>{socialResponsibility?.title}</H1>
          </RightsRow>
          :
          null
        }
      </ModuleDivider>
      <BorderLine />
      <ModuleDivider>
        {socialResponsibility?.positions && (
          <InfoContainer>
            {(({ fairTrade, social, community }) => (
              <>
                <H2 mt={6} mb={4}>{fairTrade?.title}</H2>
                <CandlestickChart size={56} />
                <ContentText mt={4} mb={8} fontWeight="bold">
                  {fairTrade?.description}
                </ContentText>

                <SmilePlus size={56} color="orange" />
                <ContentText mt={4} fontWeight="bold">
                  {social?.description}
                </ContentText>

                <H2 mt={16} mb={4}>{community?.title}</H2>
                <Heart size={56} color="red" />
                <ContentText mt={4} fontWeight="bold">
                  {community?.description}
                </ContentText>
              </>
            ))(socialResponsibility.positions)}
          </InfoContainer>
        )}
        <H2 mt={8} mb={6}>Metrics</H2>
        <div>
          {socialResponsibility?.metricsToShow?.map(metric => {
            return (
              <H3>- {metric}</H3>
            );
          })}
        </div>
      </ModuleDivider>
      <BorderLine gap={46} />
    </>
  );
};
