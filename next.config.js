const withImages = require("next-images");

const { i18n } = require("./next-i18next.config");

module.exports = withImages({
  i18n,
  webpack: (config, options) => {
    // Ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"; // eslint-disable-line no-param-reassign
    }

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
