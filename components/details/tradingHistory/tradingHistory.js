import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import styled from "styled-components";
import { Table as RKTable } from "@licenserocks/kit";
import { useTranslation } from "next-i18next";

import { TableLoader } from "components/common";
import { apiRoutes } from "routes";
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

export const TradingHistory = ({ nftId }) => {
  const { t } = useTranslation("details");
  const { data, isValidating } = useSWR(
    apiRoutes.creatorshub.getNftTradingHistory(nftId)
  );
  const tradingHistory = data?.tradingHistory || [];
  if (isValidating) return <TableLoader />;

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
      rows={generateTableRows(tradingHistory, t)}
      noDataProps={{
        text: t("tradingHistory.table.noTradingHistory"),
      }}
    />
  );
};

TradingHistory.propTypes = {
  nftId: PropTypes.number.isRequired,
};
