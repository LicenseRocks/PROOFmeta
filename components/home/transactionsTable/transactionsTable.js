import React, { useState } from "react";
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
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { centsToPrice } from "utils/price";
import { apiRoutes } from "routes";
import date from "utils/date";
import { useDebounce, useRequest } from "hooks";

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
    key: "createdAt",
    label: t("table.createdAt"),
  },
];

const getRows = ({ nfts = [], t }) =>
  nfts
    .sort((n1, n2) => n1.createdAt - n2.createdAt)
    .map((transaction) => {
      const price =
        transaction?.priceType === "FIXED" ? (
          <H4 content={centsToPrice(transaction?.price)} />
        ) : (
          t("table.custom")
        );

      return {
        image: (
          <StyledImage alt={transaction?.title} src={transaction?.coverSrc} />
        ),
        title: (
          <RKLink
            Component={Link}
            href={{
              pathname: "/",
              query: {
                id: transaction?.id,
                network: transaction?.contractNetwork || "maticTestnet",
                contractName: transaction?.contractName || "CustomERC1155",
                contractAddr: transaction?.contractAddr,
                createdWith: transaction?.createdWith || "creatorshub",
              },
            }}
            passHref
          >
            <H4 content={transaction?.title} />
          </RKLink>
        ),
        creator:
          transaction?.creator?.username ||
          transaction?.creator?.ethereumPublicAddr,
        createdAt: (
          <Text
            content={date.format(transaction?.createdAt)}
            color="textSecondary"
          />
        ),
      };
    });

export const TransactionsTable = () => {
  const { t } = useTranslation("home");
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 1000);
  const { items } = useRequest(
    apiRoutes.creatorshub.getNfts(debouncedQ),
    "allNfts"
  );
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
      <Table columns={getColumns({ t })} rows={getRows({ nfts: items, t })} />
    </StyledBox>
  );
};

TransactionsTable.propTypes = {};
