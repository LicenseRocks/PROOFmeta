import React from "react";
import styled from "styled-components";
import { Droplet } from "lucide-react";

const IconRow = styled.div`
  margin-top: 20px;
  display: flex
`;

const LowSavedFactorComponent = () => {
  return (
    <IconRow>
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="gray" color="#292839" />
      <Droplet size={32} fill="gray" color="#292839" />
      <Droplet size={32} fill="gray" color="#292839" />
      <Droplet size={32} fill="gray" color="#292839" />
    </IconRow>
  );
};

const MediumSavedFactorComponent = () => {
  return (
    <IconRow>
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="gray" color="#292839" />
      <Droplet size={32} fill="gray" color="#292839" />
    </IconRow>
  );
};

const HighSavedFactorComponent = () => {
  return (
    <IconRow>
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
      <Droplet size={32} fill="cyan" color="blue" />
    </IconRow>
  );
};

export const renderSavedWaterFactor = (factor) => {
  switch (factor) {
    case "low":
      return <LowSavedFactorComponent />;
    case "medium":
      return <MediumSavedFactorComponent />;
    case "high":
      return <HighSavedFactorComponent />;
    default:
      throw new Error("Invalid emissions level");
  }
};