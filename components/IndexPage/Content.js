import React from "react";
import PropTypes from "prop-types";
import {
  ChipBadge,
  DetailsTable,
  H1,
  H3,
  OutlineButton,
  Text,
} from "@licenserocks/kit";

import date from "utils/date";

export const IndexContent = ({
  amount,
  title,
  creator,
  price,
  network,
  updatedAt,
}) => (
  <>
    <H1 content={title} />
    <Text color="textSecondary" mb={2}>
      Network:
      <Text
        color="textPrimary"
        content={" ".concat(network)}
        dInline
        fontWeight="bold"
      />
    </Text>
    <OutlineButton
      color="secondary"
      content="Visit Website of License"
      size="sm"
    />

    <DetailsTable
      my={10}
      rows={[
        {
          label: "Last updated",
          value: date.format(updatedAt),
        },
        {
          label: "Creator",
          value: creator,
        },
        {
          label: "Status",
          value: <ChipBadge icon="check-circle" label="Verified" />,
        },
        {
          label: "Amount",
          value: <H3 content={amount} />,
        },
        {
          label: "Unit Price",
          value: <H3 content={price} color="primary" />,
        },
      ]}
    />
  </>
);

IndexContent.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.number.isRequired,
  creator: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
