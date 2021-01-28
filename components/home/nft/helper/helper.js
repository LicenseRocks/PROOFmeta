import React from "react";
import { H4, H6 } from "@licenserocks/kit";
import { filter, propEq } from "ramda";

import { centsToPrice } from "utils/price";

export const getBadges = (t, item) =>
  filter(propEq("show", true))([
    {
      label: t("nfts.badges.forBidding"),
      show: item?.biddingEnabled,
    },
    {
      label: t("nfts.badges.downloadable"),
      show: item?.downloadable,
    },
    {
      color: "success",
      label: t("nfts.badges.unique"),
      show: item?.amount === 1,
    },
    {
      color: "warning",
      label: t("nfts.badges.limited"),
      show: item?.amount > 1,
    },
    {
      label: t("nfts.badges.printable"),
      show: item?.printable,
    },
    {
      label: t("nfts.badges.charityDonate"),
      show: item?.charity,
    },
  ]);

export const getDetails = (t, item) =>
  filter(propEq("show", true))([
    {
      label: t("nfts.item.amount"),
      value: <H4 content={item.amount} />,
      show: item.amount > 0,
    },
    {
      label: t("nfts.item.unitPrice"),
      value: <H4 content={centsToPrice(item.price)} color="primary" />,
      show: !item.priceType || item.priceType === "FIXED",
    },
    {
      label: t("nfts.item.unitPrice"),
      value: (
        <H6
          align="right"
          content={t("nfts.item.payWhatYouWant")}
          color="secondary"
        />
      ),
      show: item.priceType === "CUSTOM",
    },
  ]);
