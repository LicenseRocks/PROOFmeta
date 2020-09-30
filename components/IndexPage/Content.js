import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ChipBadge,
  TinyBadge,
  DetailsTable,
  H1,
  H3,
  Text,
  Icon,
  Image,
  Paragraph,
} from "@licenserocks/kit";
import styled from "styled-components";

import { VersionHistory } from "components/IndexPage/ItemHistory";

import date from "utils/date";
import { getTransaction } from "utils/ethereum";
import { withTranslation } from "i18n";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  & > h1 {
    margin-right: 8px;
  }
  & > * {
    margin-right: 4px;
  }
`;

const StyledDetailsTable = styled(DetailsTable)``;

const StyledImage = styled(Image).attrs(() => ({
  width: "100%",
}))`
  max-height: 150px;
`;

const CryptoIcon = styled(Icon).attrs({
  icon: "file",
  color: "secondary",
  squared: true,
})`
  width: 32px;
  height: 32px;
`;

const CryptoProofContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 8px;
  }
`;

const CryptoProof = ({ value, url }) => {
  return (
    <CryptoProofContainer>
      <CryptoIcon squared />
      <a href={url}>{value}</a>
    </CryptoProofContainer>
  );
};

CryptoProof.propTypes = {
  value: PropTypes.string.isRequired,
  url: PropTypes.string,
};

CryptoProof.defaultProps = {
  url: "#",
};

const renderRest = (rest) => {
  if (typeof rest === "object") {
    const res = Object.keys(rest)
      .map((key) => {
        if (!rest[key]) return false; // null is also an object
        if (typeof rest[key] === "string" && date.isValid(rest[key]))
          return { label: key, value: date.format(rest[key]) };
        if (typeof rest[key] === "string")
          return { label: key, value: rest[key] };
        if (rest[key]?.label)
          return { label: rest[key].label, value: rest[key].value };
        if (typeof rest[key] === "object" && typeof rest[key][0] === "string")
          return { label: rest[key].label, value: rest[key].join(", ") };
        if (
          typeof rest[key] === "object" &&
          typeof rest[key][0]?.label === "string"
        )
          return {
            label: key,
            value: rest[key].map((item) => item.label).join(", "),
          };
        return false;
      })
      .filter((obj) => obj);
    return res;
  }
  return [];
};

export const IndexContent = withTranslation("index")(
  ({
    amount,
    title,
    price,
    unique,
    exclusive,
    network,
    histories,
    coverSrc,
    abstract,
    t,
    fileURIs: _fileURIs,
    _documents,
    ...rest
  }) => {
    // Order histories by created_at in descending way
    const orderedHistories = histories.sort(
      (first, second) =>
        Date.parse(second.created_at || first.createdAt) -
        Date.parse(first.created_at || first.createdAt)
    );
    const [activeHistory, setActiveHistory] = useState(orderedHistories[0]);
    const [txInfo, setTxInfo] = useState(null);
    const [txLoading, setTxLoading] = useState(false);

    const getTransactionInfo = () => {
      setTxLoading(true);
      setTxInfo(null);
      getTransaction(activeHistory.txHash, network)
        .then((tx) => setTxInfo(tx))
        .finally(() => setTxLoading(false));
    };

    useEffect(() => {
      if (activeHistory.txHash) getTransactionInfo();
    }, []);

    return (
      <>
        <HeaderContainer>
          <H1 content={title} />
          {exclusive && <TinyBadge label={t("exclusive")} color="warning" />}
          {unique && <TinyBadge label={t("unique")} color="success" />}
        </HeaderContainer>
        <Text color="textSecondary" mb={2}>
          {t("network")}:
          <Text
            color="textPrimary"
            content={` ${network}`}
            dInline
            fontWeight="bold"
          />
        </Text>

        <ChipBadge color="success" label="Updated" icon="check-circle" />

        <StyledDetailsTable
          labelTextTransform="capitalize"
          my={10}
          labelWidth={220}
          expandButtonProps={{ loading: txLoading }}
          rows={[
            {
              columnSm: true,
              divider: true,
              renderLabel: () => <StyledImage src={coverSrc} />,
              value: <Paragraph content={abstract} />,
            },
            {
              label: t("status"),
              value: <ChipBadge icon="check-circle" label="Verified" />,
            },
            {
              label: t("amount"),
              value: <H3 content={amount} />,
            },
            {
              label: t("price"),
              value: <H3 content={price} color="primary" />,
            },
          ]
            .concat(renderRest(rest))
            .concat(
              activeHistory.txHash
                ? [
                    {
                      label: t("creatorPublicKey"),
                      value: <CryptoProof value={txInfo?.from} />,
                      expandable: true,
                    },
                    {
                      label: t("transactionId"),
                      value: <CryptoProof value={txInfo?.hash} />,
                      expandable: true,
                    },
                  ]
                : []
            )}
        />
        {activeHistory.txHash && (
          <VersionHistory
            onChange={(item) => {
              setActiveHistory(item);
              getTransactionInfo();
            }}
            histories={orderedHistories}
          />
        )}
      </>
    );
  }
);

IndexContent.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  fileURIs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMetaDataChange: PropTypes.func.isRequired,
  histories: PropTypes.arrayOf(PropTypes.shape()),
  _documents: PropTypes.arrayOf().isRequired,
};

IndexContent.defaultProps = {
  histories: [],
};
