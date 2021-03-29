import React from "react";
import ContentLoader from "react-content-loader";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
`;

const renderRow = (idx) => (
  <>
    <rect x="0" y={idx * 44} rx="0" ry="0" width="80" height="14" />
    <rect x="140" y={idx * 44} rx="0" ry="0" width="60" height="14" />
    <rect x="270" y={idx * 44} rx="0" ry="0" width="100" height="14" />
    <rect x="460" y={idx * 44} rx="0" ry="0" width="60" height="14" />
    <rect x="640" y={idx * 44} rx="0" ry="0" width="120" height="14" />
    <rect x="0" y={idx * 44 + 28} rx="0" ry="0" width="800" height="1" />
  </>
);

export const TableLoader = (props) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <ContentLoader
        speed={2}
        width={800}
        height={200}
        viewBox="0 0 800 200"
        backgroundColor={theme.palette.gray.semiLight}
        foregroundColor={theme.palette.gray.regular}
        {...props}
      >
        {Array(5)
          .fill("")
          .map((_, idx) => renderRow(idx))}
      </ContentLoader>
    </Wrapper>
  );
};
