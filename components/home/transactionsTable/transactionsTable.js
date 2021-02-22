import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  H4,
  Image,
  Input,
  Link as RKLink,
  Text,
  Table as RKTable,
} from "@licenserocks/kit";
import useSWR from "swr";

import { Link, withTranslation } from "i18n";
import { centsToPrice } from "utils/price";
import { apiRoutes } from "routes";
import date from "utils/date";
import { useDebounce } from "hooks";

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

const getColumns = ({ t }) => [
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
    key: "creator",
    label: t("table.creator"),
  },
  {
    key: "price",
    label: t("table.price"),
  },
  {
    key: "createdAt",
    label: t("table.createdAt"),
  },
];

const getRows = ({ nfts }) =>
  nfts.map((transaction) => {
    const coverKey = transaction.Files?.findIndex((f) => f.type === "cover");
    const price =
      transaction.priceType === "FIXED" ? (
        <H4 content={centsToPrice(transaction.price)} />
      ) : (
        "Custom"
      );

    return {
      image: <StyledImage alt={transaction.title} src={transaction.coverSrc} />,
      title: (
        <RKLink
          Component={Link}
          href={{
            pathname: "/",
            query: {
              id: transaction.id,
              network: "maticTestnet",
              contractName: transaction.contractName || "CustomERC1155",
              contractAddr: transaction?.contractAddr,
              createdWith: "creatorshub",
              ...(coverKey > -1
                ? { coverKey: transaction.Files[coverKey]?.key }
                : {}),
            },
          }}
          passHref
        >
          <H4 content={transaction.title} />
        </RKLink>
      ),
      creator: transaction.creator.name || transaction.creator.username,
      price,
      createdAt: (
        <Text
          content={date.format(transaction.createdAt)}
          color="textSecondary"
        />
      ),
    };
  });

export const TransactionsTable = withTranslation("home")(({ t }) => {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 1000);
  const { data = { nfts: [] } } = useSWR(
    apiRoutes.creatorshub.getNfts(debouncedQ)
  );

  const { nfts } = data;

  return (
    <StyledBox
      headerRenderTitle={() => (
        <Input
          endIcon="search"
          placeholder={t("table.search")}
          onChange={({ target }) => setQ(target.value)}
          value={q}
        />
      )}
    >
      <Table columns={getColumns({ t })} rows={getRows({ nfts, t })} />
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
