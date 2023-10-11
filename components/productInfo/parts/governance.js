import React from "react";
import { BorderLine, ContentText, InfoContainer, ModuleDivider, RightsRow } from "./components";
import { SmilePlus } from "lucide-react";
import { H1, H2, H3 } from "@licenserocks/kit";
import { renderEthicalPractices  } from "../renderedContent"


export const GovernancePart = ({ governance }) => {
  return (
    <>
      <ModuleDivider>
        {governance?.title ?
          <RightsRow>
            <H1>{governance.title}</H1>
          </RightsRow>
          :
          null
        }
      </ModuleDivider>
      <BorderLine />
      <ModuleDivider>
        {governance?.positions && (
          <InfoContainer>
            {(({ ethical, other }) => (
              <>
                <H2 mt={6} mb={4}>{ethical?.title}</H2>
                {renderEthicalPractices(ethical?.practicesFactor)}
                <ContentText mt={4} mb={8} fontWeight="bold">
                  {ethical?.description}
                </ContentText>

                <SmilePlus size={56} color="orange" />
                <ContentText mt={4} fontWeight="bold">
                  {other?.description}
                </ContentText>
              </>
            ))(governance?.positions)}
          </InfoContainer>
        )}
        <H2 mt={8} mb={6}>Metrics</H2>
        <div>
          {governance?.metricsToShow?.map(metric => {
            return (
              <H3>- {metric}</H3>
            );
          })}
        </div>
      </ModuleDivider>
    </>
  );
};