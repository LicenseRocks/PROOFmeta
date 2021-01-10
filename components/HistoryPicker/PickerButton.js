import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";
import { Icon, Text } from "@licenserocks/kit";

const Button = styled(MuiButton)`
  width: 100%;
  && {
    border: 1px solid ${({ theme }) => theme.palette.text.secondary};
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

const SecondaryText = styled(Text)`
  color: ${({ theme }) => theme.palette.text.secondary};
  && {
    font-size: 14px;
  }
`;

const PrimaryText = styled(Text)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StartIcon = styled(Icon).attrs(() => ({
  icon: "tree",
}))`
  color: #cecdd9;
`;

const EndIcon = styled(Icon).attrs(() => ({
  icon: "angle-down",
}))`
  color: #292839;
`;

const PickerButton = ({ activeHistory, ...props }) => {
  return (
    <Button startIcon={<StartIcon />} endIcon={<EndIcon />} {...props}>
      <SecondaryText>History:</SecondaryText>
      <PrimaryText>{activeHistory.name}</PrimaryText>
    </Button>
  );
};

PickerButton.propTypes = {
  activeHistory: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

export default PickerButton;
