import React from "react";
import {
  Flex,
  formatDateAndTime,
  Icon,
  Image,
  Text,
  TinyBadge,
} from "@licenserocks/kit";
import styled from "styled-components";
import copy from "copy-to-clipboard";

const StyledImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const renderUser = (user) => {
  if (!user) return "-";
  return (
    <Flex container>
      <Flex item>
        <StyledImage src="/images/user-placeholder.png" />
      </Flex>
      <Flex item ml={2}>
        <Text
          content={`${user.substring(0, 10)}...`}
          fontWeight="bold"
          fontSize="sm"
          noWrap
        />
      </Flex>
    </Flex>
  );
};

const getStatuses = (t) => ({
  success: {
    label: t("tradingHistory.statuses.success"),
    color: "success",
  },
  paid: {
    label: t("tradingHistory.statuses.success"),
    color: "success",
  },
  pending: {
    label: t("tradingHistory.statuses.pending"),
    color: "warning",
  },
});

const getEvents = (t) => ({
  minted: {
    label: t("tradingHistory.events.minted"),
    icon: "folder-plus",
  },
  transfer: {
    label: t("tradingHistory.events.transfer"),
    icon: "shopping-cart",
  },
  bid: {
    label: t("tradingHistory.events.bid"),
    icon: "gavel",
  },
});

export const generateTableRows = (txs, t) => {
  const statuses = getStatuses(t);
  const events = getEvents(t);

  return txs.map(({ createdAt, name, txHash, toAddr, fromAddr, status }) => ({
    event: (
      <Flex container>
        <Flex item>
          <Icon color="secondary" icon={events[name].icon} />
        </Flex>
        <Flex item ml={2}>
          <Text
            content={events[name].label}
            fontSize="sm"
            fontWeight="bold"
            noWrap
          />
        </Flex>
      </Flex>
    ),
    from: renderUser(fromAddr),
    to: renderUser(toAddr),
    txId: (
      <Flex container>
        <Flex item xs={4}>
          <Text
            content={`${txHash.substring(0, 10)}...`}
            color="textSecondary"
            fontSize="sm"
            noWrap
          />
        </Flex>
        <Flex item ml={2}>
          <Icon color="secondary" icon="copy" onClick={() => copy(txHash)} />
        </Flex>
      </Flex>
    ),
    date: (
      <Text
        content={formatDateAndTime(createdAt)}
        fontSize="sm"
        fontWeight="bold"
      />
    ),
    status: status ? (
      <TinyBadge
        color={statuses[status].color}
        label={statuses[status].label}
      />
    ) : (
      "-"
    ),
  }));
};
