import React from "react";
import PropTypes from "prop-types";
import {
  ChipBadge,
  DetailsTable,
  H1,
  H3,
  OutlineButton,
  Text,
  Select,
} from "@licenserocks/kit";
import styled from "styled-components";

import date from "utils/date";
import { withTranslation } from "i18n";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding-right: ${({ theme }) => theme.spacing(5)};
`;

const renderRest = (rest) => {
  if (typeof rest === "object") {
    const res = Object.keys(rest)
      .map((key) => {
        if (!rest[key]) return false; // null is also an object
        if (typeof rest[key] === "string" && date.isValid(rest[key]))
          return { label: key, value: date.format(rest[key]) };
        if (typeof rest[key] === "string")
          return { label: key, value: rest[key] };
        if (rest[key]?.label)
          return { label: rest[key].label, value: rest[key].value };
        if (typeof rest[key] === "object" && typeof rest[key][0] === "string")
          return { label: rest[key].label, value: rest[key].join(", ") };
        if (
          typeof rest[key] === "object" &&
          typeof rest[key][0]?.label === "string"
        )
          return {
            label: key,
            value: rest[key].map((item) => item.label).join(", "),
          };
        return false;
      })
      .filter((obj) => obj);
    return res;
  }
  return [];
};

export const IndexContent = withTranslation("index")(
  ({
    amount,
    title,
    price,
    network,
    fileURIs,
    onMetaDataChange,
    _documents,
    _histories,
    t,
    ...rest
  }) => (
    <>
      <HeaderContainer>
        <H1 content={title} />
        <Select
          options={fileURIs.map((fileURI, index) => ({
            value: fileURI,
            label: `Version ${fileURIs.length - index}`,
          }))}
          onChange={(e) => onMetaDataChange(e.target.value)}
        />
      </HeaderContainer>
      <Text color="textSecondary" mb={2}>
        {t("network")}:
        <Text
          color="textPrimary"
          content={` ${network}`}
          dInline
          fontWeight="bold"
        />
      </Text>
      <OutlineButton color="secondary" content={t("visitWebsite")} size="sm" />

      <DetailsTable
        labelTextTransform="capitalize"
        my={10}
        rows={[
          {
            label: t("status"),
            value: <ChipBadge icon="check-circle" label="Verified" />,
          },
          {
            label: t("amount"),
            value: <H3 content={amount} />,
          },
          {
            label: t("price"),
            value: <H3 content={price} color="primary" />,
          },
        ].concat(renderRest(rest))}
      />
    </>
  )
);

IndexContent.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  fileURIs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMetaDataChange: PropTypes.func.isRequired,
  _documents: PropTypes.arrayOf().isRequired,
  _histories: PropTypes.arrayOf().isRequired,
};
