const { nextI18NextRewrites } = require("next-i18next/rewrites");
const withImages = require("next-images");

const localeSubpaths = {
  de: "de",
};

module.exports = withImages({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack: (config, options) => {
    // Ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"; // eslint-disable-line no-param-reassign
    }

    return config;
  },
});
