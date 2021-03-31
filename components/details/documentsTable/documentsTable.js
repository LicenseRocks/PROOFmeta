import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Text,
  TinyBadge,
  Link as RKLink,
  FileManager,
} from "@licenserocks/kit";
import { useTranslation } from "next-i18next";

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

export const DocumentsTable = ({ data }) => {
  const { t } = useTranslation("details");
  return (
    <FileManager
      data={[
        {
          label: "",
          files: data.map((item) => ({
            renderName: () => (
              <>
                <Text
                  content={item.filename}
                  fontSize="sm"
                  fontWeight="bold"
                  noWrap
                />
                <TinyBadge
                  label={
                    item.public ? t("documents.public") : t("documents.private")
                  }
                  color={getBadgeColor(item.public)}
                  mx={2}
                />
              </>
            ),
            renderDate: () => (
              <Text
                content={item.checksum}
                color="textSecondary"
                fontSize="sm"
                noWrap
              />
            ),
            description: (
              <LinkContainer>
                <Link href={item.url} Component="span">
                  <Text>{t("documents.view")}</Text>
                </Link>
              </LinkContainer>
            ),
          })),
        },
      ]}
    />
  );
};

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
