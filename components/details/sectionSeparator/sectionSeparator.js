import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "@licenserocks/kit";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.light};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Label = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
`;

export const SectionSeparator = ({ link, label }) => {
  return (
    <Container>
      <Label>{label}</Label>
      {link}
    </Container>
  );
};

SectionSeparator.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.node,
};

SectionSeparator.defaultProps = {
  link: null,
};
