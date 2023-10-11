import styled from "styled-components";
import { Text } from "@licenserocks/kit";
export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardsContainer = styled.div`
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

export const BorderLine = styled.div`
  height: ${props => (props.gap ? `${props.gap}px` : "16px")};
  background: white !important;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const RightsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ModuleDivider = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;


  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 1.5rem;
  }
`;

export const ContentText = styled(Text)`
  font-size: 16px;
  line-height: 160% !important;
  letter-spacing: -0.16px !important;
`;