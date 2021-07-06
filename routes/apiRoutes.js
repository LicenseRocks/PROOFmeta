import { getBaseUrl } from "utils/url";

export const apiRoutes = {
  creatorshub: {
    getStats: () => `/api/public/stats`,
    getNfts: (q) => `/api/public/nfts${q ? `?q=${q}` : ""}`,
    getCreators: () => `/api/public/creators`,
    getNftPdf: (nftId, createdWith, locale = "en") =>
      `${getBaseUrl(
        createdWith
      )}/api/public/nft/${nftId}/pdf?download=true&locale=${locale}`,
    getNftTradingHistory: (nftId, createdWith) =>
      `${getBaseUrl(createdWith)}/api/public/nft/${nftId}/trading_history`,
  },
};
