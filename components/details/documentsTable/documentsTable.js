import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, Text, TinyBadge, Link as RKLink } from "@licenserocks/kit";

import { withTranslation } from "i18n";


const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  height: 40px;
`;

const IconContainer = styled.div`
  display: inline;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-right: 8px;
`;

const FileIcon = styled(Icon).attrs(() => ({
  icon: "file",
}))`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const ContentContainer = styled.div`
  border-bottom: 1px solid #f0f0f4;
  height: 40px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
`;

const FileName = styled(Text)`
  && {
    font-size: 12px;
    font-weight: 600;
    margin-right: 8px;
  }
`;

const LinkContainer = styled.div`
  align-self: center;
`;

const Link = styled(RKLink)`
  color: ${({ theme }) => theme.palette.primary.main};
  .MuiTypography-root {
    font-size: 12px;
    font-weight: 400;
  }
`;

const getBadgeColor = (isPublic) => {
  if (isPublic) return "success";

  return "warning";
};

export const DocumentsTable = withTranslation("details")(({ data, t }) => {
  return data.map((document) => (
    <DocumentItem>
      <IconContainer>
        <FileIcon />
      </IconContainer>
      <ContentContainer>
        <MainContent>
          <FileName>
            {document.public ? document.filename : document.hash}
          </FileName>
          <TinyBadge
            label={
              document.public ? t("documents.public") : t("documents.private")
            }
            color={getBadgeColor(document.public)}
          />
        </MainContent>
        {document.url && (
          <LinkContainer>
            <Link href={document.url} Component="span">
              <Text>{t("documents.view")}</Text>
            </Link>
          </LinkContainer>
        )}
      </ContentContainer>
    </DocumentItem>
  ));
});

DocumentsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string,
      hash: PropTypes.string,
      public: PropTypes.bool,
      url: PropTypes.string,
    })
  ).isRequired,
};
