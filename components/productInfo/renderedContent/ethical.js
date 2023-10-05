import React from "react";
import styled from "styled-components";
import { CheckSquare } from "lucide-react";

const IconRow = styled.div`
  margin-top: 20px;
  display: flex
`;
const HighEthicalPracticesFactorComponent = () => {
  return (
    <IconRow>
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
    </IconRow>
  );
};

const MediumEthicalPracticesFactorComponent = () => {
  return (
    <IconRow>
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="green" />
      <CheckSquare size={32} color="gray" />
      <CheckSquare size={32} color="gray" />
    </IconRow>
  );
};

const LowEthicalPracticesFactorComponent = () => {
  return (
    <IconRow>
      <CheckSquare size={32} color="gray" />
      <CheckSquare size={32} color="gray" />
      <CheckSquare size={32} color="gray" />
      <CheckSquare size={32} color="gray" />
      <CheckSquare size={32} color="gray" />
    </IconRow>
  );
};

export const renderEthicalPractices = (factor) => {
  switch (factor) {
    case "low":
      return <LowEthicalPracticesFactorComponent />;
    case "medium":
      return <MediumEthicalPracticesFactorComponent />;
    case "high":
      return <HighEthicalPracticesFactorComponent />;
    default:
      throw new Error("Invalid emissions level");
  }
};