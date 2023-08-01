import styled from "styled-components";
import { H5 } from "@licenserocks/kit";
import { format } from "date-fns";

export function EffectiveDateVisualization({ startDate, endDate, isUnlimited }) {
  if (isUnlimited) {
    return (
      <Container>
        <RangeLabelsContainer>
          <H5>{"Start"}</H5>
          <H5 className="infinity">8</H5>
        </RangeLabelsContainer>
        <ProgressBar progress={100} />
        <RangeLabelsContainer>
          <LeftAlign>
            <H5>{"Unlimited"}</H5>
          </LeftAlign>
        </RangeLabelsContainer>
      </Container>
    );
  } else {
    const legibleStartDate = format(startDate, "dd/MM/yy");
    const legibleStartTime = format(startDate, "HH:mm");
    const legibleEndDate = format(endDate, "dd/MM/yy");
    const legibleEndTime = format(endDate, "HH:mm");

    const current = new Date().getTime();
    const strt = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const completed = ((current - strt) / (end - strt)) * 100;

    return (
      <Container>
        <RangeLabelsContainer>
          <H5>{"Start"}</H5>
          <H5>{"End"}</H5>
        </RangeLabelsContainer>
        <ProgressBar progress={completed} />
        <RangeLabelsContainer>
          <LeftAlign>
            <H5>{legibleStartDate}</H5>
            <H5>{legibleStartTime}</H5>
          </LeftAlign>
          <RightAlign>
            <H5>{legibleEndDate}</H5>
            <H5>{legibleEndTime}</H5>
          </RightAlign>
        </RangeLabelsContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
`;

const RangeLabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  .infinity {
    transform: rotate(270deg) !important;
  }
`;

const LeftAlign = styled.div`
  text-align: left;
`;

const RightAlign = styled.div`
  text-align: right;
`;

const ProgressBar = styled.div`
  & {
    margin-top: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    position: relative;
    height: 12px;
  }

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 12px;
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: lightgray;
  }

  &:after {
    position: absolute;
    content: "";
    z-index: 99;
    width: ${({ progress }) => progress}%;
    max-width: 100%;
    height: 12px;
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: orange;
  }
`;
