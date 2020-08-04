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

export const IndexContent = ({ amount, title }) => (
  <>
    <H1 content={title} />
    <Text color="textSecondary" mb={2}>
      Network:
      <Text color="textPrimary" content=" Mainnet" dInline fontWeight="bold" />
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
          value: "4 Feb 2020",
        },
        {
          label: "Creator",
          value: "Majid Amiri",
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
          value: <H3 content="100,00" color="primary" />,
        },
      ]}
    />
  </>
);

IndexContent.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string.isRequired,
};

IndexContent.defaultProps = {
  amount: "-",
};
