import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Table as RKTable,
  Icon,
  Text,
  Link,
  TinyBadge,
} from "@licenserocks/kit";

import { withTranslation } from "i18n";


const Table = styled(RKTable)`
  tr {
    background: transparent;
  }

  th,
  td {
    padding: 0 5px;
  }

  && {
    th div {
      font-style: unset;
    }
  }
`;

const CopyIcon = styled(Icon).attrs(() => ({
  icon: "copy",
}))`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const IconContainer = styled.div`
  display: inline;
  padding: 8px;
  border: 1px solid #cecdd9;
  border-radius: 10px;
  margin-right: 8px;
`;

const TransactionID = styled(Text).attrs(() => ({
  color: "textSecondary",
}))`
  display: inline;
  && {
    font-size: 12px;
    font-weight: 400;
  }
`;

const Date = styled(Text).attrs(() => ({
  color: "textSecondary",
}))`
  && {
    font-size: 12px;
    font-weight: 600;
  }
`;

const Amount = Date;

const ReceiverAddress = styled(Link).attrs(() => ({
  Component: "span",
}))`
  && {
    color: #463eed;
  }
`;

const statusToColor = (status) => {
  switch (status) {
    case "success":
      return "success";
    case "pending":
      return "warning";
    default:
      return "info";
  }
};

export const TransactionsTable = withTranslation("details")(({ data, t }) => {
  const tableData = {
    columns: [
      {
        key: "transactionId",
        label: t("transactions.id"),
      },
      {
        key: "date",
        label: t("transactions.date"),
      },
      {
        key: "amount",
        label: t("transactions.amount"),
      },
      {
        key: "to",
        label: t("transactions.to"),
      },
      {
        key: "status",
        label: t("transactions.status"),
      },
    ],
    rows: data.map((transaction) => ({
      transactionId: (
        <>
          <IconContainer>
            <CopyIcon />
          </IconContainer>
          <TransactionID>
            {transaction.transactionHash.slice(0, 30).concat("...")}
          </TransactionID>
        </>
      ),
      date: <Date>{transaction.createdAt}</Date>,
      amount: <Amount>{transaction.amount}</Amount>,
      to: (
        <>
          <IconContainer>
            <CopyIcon />
          </IconContainer>
          <ReceiverAddress href="/">
            {transaction.to.slice(0, 30).concat("...")}
          </ReceiverAddress>
        </>
      ),
      status: (
        <TinyBadge
          label={transaction.status}
          color={statusToColor(transaction.status)}
        />
      ),
    })),
  };

  return <Table {...tableData} />;
});

TransactionsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      transactionHash: PropTypes.string,
      createdAt: PropTypes.string,
      amount: PropTypes.string,
      to: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
};
