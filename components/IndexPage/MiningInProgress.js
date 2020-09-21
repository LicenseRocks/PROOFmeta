import React from "react";
import styled from "styled-components";

const CenteredBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-right: ${({ theme }) => theme.spacing(5)};
  padding-left: ${({ theme }) => theme.spacing(5)};

  p {
    text-align: center;
    font-weight: bold;
  }

  img {
    max-width: 80%;
  }

  div {
    max-width: 556px;
    text-align: center;
  }
`;

export const MiningInProgress = () => {
  return (
    <CenteredBox>
      <div>
        <img
          src="/images/pending-illustration.svg"
          alt="Ilustration for pending status"
        />
        <p>
          Sorry but your file is currently being stored forever and that takes a few moments.
        </p>
        <p>Please try later...</p>
      </div>
    </CenteredBox>
  );
};
