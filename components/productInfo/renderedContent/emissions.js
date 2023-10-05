import React from "react";
import styled from "styled-components";
import { LeafyGreen } from "lucide-react";

const IconRow = styled.div`
  margin-top: 20px;
  display: flex
`;
const HighEmmisionComponent = () => {
  return (
    <IconRow>
      <LeafyGreen size={32} fill="red" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
    </IconRow>
  );
};

const MediumEmmisionComponent = () => {
  return (
    <IconRow>
      <LeafyGreen size={32} fill="yellow" color="#292839" />
      <LeafyGreen size={32} fill="yellow" color="#292839" />
      <LeafyGreen size={32} fill="yellow" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
      <LeafyGreen size={32} fill="gray" color="#292839" />
    </IconRow>
  );
};

const LowEmmisionComponent = () => {
  return (
    <IconRow>
      <LeafyGreen size={32} fill="green" color="#292839" />
      <LeafyGreen size={32} fill="green" color="#292839" />
      <LeafyGreen size={32} fill="green" color="#292839" />
      <LeafyGreen size={32} fill="green" color="#292839" />
      <LeafyGreen size={32} fill="green" color="#292839" />
    </IconRow>
  );
};


export const renderCarbonEmisions = (emissions) => {
  switch (emissions) {
    case "low":
      return <LowEmmisionComponent />;
    case "medium":
      return <MediumEmmisionComponent />;
    case "high":
      return <HighEmmisionComponent />;
    default:
      throw new Error("Invalid emissions level");
  }
};