import React from "react";
import { ChipBadge, DetailsTable, H1, H3, OutlineButton, Text } from "rockskit";

export const IndexContent = (
  <>
    <H1 content="Main content" />
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
          value: <H3 content="140" />,
        },
        {
          label: "Unit Price",
          value: <H3 content="100,00" color="primary" />,
        },
      ]}
    />
  </>
);
