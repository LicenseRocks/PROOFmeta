import { getBaseUrl } from "utils/url";

export const apiRoutes = {
  creatorshub: {
    // getStats: () => `/api/public/stats`, //TODO improve stats logic or endpoint's
    getNfts: (q) => `/api/public/nfts${q ? `?q=${q}` : ""}`,
    getNft: (nftId) => `/api/public/nft/${nftId}`,
    getCreators: () => `/api/public/creators`,
    getNftPdf: (nftId, createdWith, locale = "en") =>
      `${getBaseUrl(
        createdWith
      )}/api/public/nft/${nftId}/pdf?download=true&locale=${locale}`,
    getNftTradingHistory: (nftId, createdWith) =>
      `${getBaseUrl(createdWith)}/api/public/nft/${nftId}/trading_history`,
  },
};
