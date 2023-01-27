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
        <StyledImage src={user.avatar || "/images/user-placeholder.png"} />
      </Flex>
      <Flex item ml={2}>
        <Text
          content={
            user.username ||
            `${user.ethereumPublicAddr.slice(
              0,
              8
            )}...${user.ethereumPublicAddr.slice(-2)}`
          }
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
  burn: {
    label: t("tradingHistory.events.burn"),
    icon: "trash",
  },
  transfer: {
    label: t("tradingHistory.events.transfer"),
    icon: "shopping-cart",
  },
  manualTransfer: {
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

  return txs.map(({ date, name, txId, to, from, status }) => ({
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
    from: renderUser(from),
    to: renderUser(to),
    txId: (
      <Flex container>
        <Flex item xs={4}>
          <Text
            content={`${txId.substring(0, 14)}...`}
            color="textSecondary"
            fontSize="sm"
            noWrap
          />
        </Flex>
        <Flex item ml={2}>
          <Icon color="secondary" icon="copy" onClick={() => copy(txId)} />
        </Flex>
      </Flex>
    ),
    date: (
      <Text content={formatDateAndTime(date)} fontSize="sm" fontWeight="bold" />
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
