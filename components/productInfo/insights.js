import React from "react";
import { Button, Flex,  H3, H5, Image } from "@licenserocks/kit";
import styled from "styled-components";
export const InsightsComponent = () => {
  return (
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
  );
};

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
  background: blue;
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