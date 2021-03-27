import React from "react";
import PropTypes from "prop-types";
import { Table as RKTable } from "@licenserocks/kit";
import styled from "styled-components";

import { useTranslation } from "next-i18next";
import { generateTableRows } from "./helper";

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

export const TradingHistory = ({ data }) => {
  const { t } = useTranslation("details");

  return (
    <Table
      columns={[
        {
          key: "event",
          label: t("tradingHistory.table.event"),
        },
        {
          key: "from",
          label: t("tradingHistory.table.from"),
        },
        {
          key: "to",
          label: t("tradingHistory.table.to"),
        },
        {
          key: "txId",
          label: t("tradingHistory.table.txId"),
        },
        {
          key: "date",
          label: t("tradingHistory.table.date"),
          type: "text",
        },
        {
          key: "status",
          label: t("tradingHistory.table.status"),
        },
      ]}
      rows={generateTableRows(data, t)}
      noDataProps={{
        text: t("tradingHistory.table.noTradingHistory"),
      }}
    />
  );
};

TradingHistory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
