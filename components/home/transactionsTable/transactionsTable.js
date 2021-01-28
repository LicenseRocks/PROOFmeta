import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Button,
  H4,
  Image,
  Input,
  Text,
  Table as RKTable,
} from "@licenserocks/kit";

import { withTranslation } from "i18n";
import { centsToPrice } from "utils/price";

const StyledBox = styled(Box)`
  && {
    .bottom {
      text-align: center;
    }

    & > div:nth-child(2) {
      padding: 0;
    }
  }
`;

const StyledImage = styled(Image)`
  display: block;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: cover;
  margin: ${({ theme }) => theme.spacing(2)};
`;

const Table = styled(RKTable)`
  thead {
    th {
      background-color: ${({ theme }) => theme.palette.gray.light};
    }
  }
`;

export const TransactionsTable = withTranslation("home")(({ data, t }) => {
  const tableData = {
    columns: [
      {
        key: "image",
        label: "",
        style: {
          width: "48px",
        },
      },
      {
        hiddenLabelSm: true,
        key: "title",
        label: t("table.name"),
      },
      {
        key: "price",
        label: t("table.price"),
      },
      {
        key: "transactionId",
        label: t("table.transactionId"),
      },
    ],
    rows: data.map((transaction) => ({
      image: <StyledImage alt={transaction.title} src={transaction.coverSrc} />,
      title: (
        <div>
          <H4 content={transaction.title} />
        </div>
      ),
      price: <H4 content={centsToPrice(transaction.price)} />,
      transactionId: (
        <Text
          content={transaction.arweaveTx?.slice(0, 30).concat("...")}
          color="textSecondary"
        />
      ),
    })),
  };

  return (
    <StyledBox
      headerRenderTitle={() => (
        <Input endIcon="search" placeholder="Search..." />
      )}
    >
      <Table {...tableData} />

      <div className="bottom">
        <Button content="See More" endIcon="arrow-right" size="lg" my={6} />
      </div>
    </StyledBox>
  );
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
