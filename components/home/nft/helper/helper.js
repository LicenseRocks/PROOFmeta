import { filter, propEq } from "ramda";

export const getBadges = (t, item) =>
  filter(propEq("show", true))([
    {
      label: t("badges.forBidding"),
      show: item?.biddingEnabled,
    },
    {
      label: t("badges.downloadable"),
      show: item?.downloadable,
    },
    {
      color: "success",
      label: t("badges.unique"),
      show: item?.amount === 1,
    },
    {
      color: "warning",
      label: t("badges.limited"),
      show: item?.amount > 1,
    },
    {
      label: t("badges.printable"),
      show: item?.printable,
    },
    {
      label: t("badges.charityDonate"),
      show: item?.charity,
    },
  ]);
