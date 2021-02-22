const { NEXT_PUBLIC_CREATORSHUB_URL } = process.env;

export const apiRoutes = {
  creatorshub: {
    getStats: () => `${NEXT_PUBLIC_CREATORSHUB_URL}/api/public/stats`,
    getNfts: (q) =>
      `${NEXT_PUBLIC_CREATORSHUB_URL}/api/public/nfts${q ? `?q=${q}` : ""}`,
    getCreators: () => `${NEXT_PUBLIC_CREATORSHUB_URL}/api/public/creators`,
  },
};