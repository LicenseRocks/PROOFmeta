import React from "react";
import { BorderLine, ContentText, InfoContainer, ModuleDivider, RightsRow } from "./components";
import { MapPin, Recycle } from "lucide-react";
import { H1, H2, H3 } from "@licenserocks/kit";
import { renderCarbonEmisions,renderSavedWaterFactor } from "../renderedContent"

export const EnvironmentalPart = ({ environmentImpact }) => {
  return (
    <>
      <ModuleDivider>
        {environmentImpact?.title ?
          <RightsRow>
            <H1>{environmentImpact?.title}</H1>
          </RightsRow>
          :
          null
        }
      </ModuleDivider>
      <BorderLine />
      <ModuleDivider>
        {environmentImpact?.positions && (
          <InfoContainer>
            {(({ carbon, water, material, distance }) => (
              <>
                <H2 mt={6}>{carbon?.title}</H2>
                {renderCarbonEmisions(carbon?.emissions)}
                <ContentText mt={4} fontWeight="bold">
                  {carbon?.description}
                </ContentText>

                <H2 mt={16}>{water?.title}</H2>
                {renderSavedWaterFactor(water?.savedWaterFactor)}
                <ContentText mt={4} fontWeight="bold">
                  {water?.description}
                </ContentText>

                <H2 mt={16} mb={4}>{material?.title}</H2>
                <Recycle size={56} color="#849434" />
                <ContentText mt={4} fontWeight="bold">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: material?.description
                    }}
                  />
                </ContentText>
                <H2 mt={16} mb={4}>{distance?.title}</H2>
                <MapPin size={54} fill="red" ccolor="#292839" />
                <ContentText mt={4} fontWeight="bold">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: distance?.description
                    }}
                  />
                </ContentText>

              </>
            ))(environmentImpact.positions)}
          </InfoContainer>
        )}
        <H2 mt={8} mb={6}>Metrics</H2>
        <div>
          {environmentImpact?.metricsToShow?.map(metric => {
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