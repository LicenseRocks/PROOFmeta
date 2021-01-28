import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "@licenserocks/kit";

const StyledImage = styled(Image)`
  width: 100%;
  object-fit: contain;
  z-index: 2;
`;

export const Cover = ({ imgSrc, ...props }) => {
  return <StyledImage src={imgSrc} {...props} />;
};

Cover.propTypes = {
  imgSrc: PropTypes.string,
};

Cover.defaultProps = {
  imgSrc: "",
};
