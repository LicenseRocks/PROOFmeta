import React from "react";
import ContentLoader from "react-content-loader";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  height: ${({ largeCover }) => (largeCover ? 340 : 236)}px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray.semiLight};
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down("md")} {
    height: ${({ largeCover }) => (largeCover ? 556 : 384)}px;
  }
`;

export const NftItemLoader = (props) => {
  const theme = useTheme();

  // Larger cover randomly
  const largeCover = Math.round(Math.random());

  return (
    <Wrapper largeCover={largeCover}>
      <ContentLoader
        speed={2}
        viewBox="0 0 200 320"
        backgroundColor={theme.palette.gray.semiLight}
        foregroundColor={theme.palette.gray.regular}
        {...props}
      >
        <rect
          x="0"
          y="0"
          rx="0"
          ry="0"
          width="200"
          height={largeCover ? "200" : "100"}
        />
        <rect
          x="16"
          y={largeCover ? "216" : "116"}
          rx="0"
          ry="0"
          width="115"
          height="24"
        />
        <rect
          x="15"
          y={largeCover ? "272" : "172"}
          rx="0"
          ry="0"
          width="68"
          height="14"
        />
        <rect
          x="128"
          y={largeCover ? "272" : "172"}
          rx="0"
          ry="0"
          width="68"
          height="14"
        />
        <rect
          x="15"
          y={largeCover ? "296" : "196"}
          rx="0"
          ry="0"
          width="68"
          height="14"
        />
        <rect
          x="128"
          y={largeCover ? "296" : "196"}
          rx="0"
          ry="0"
          width="68"
          height="14"
        />
      </ContentLoader>
    </Wrapper>
  );
};
