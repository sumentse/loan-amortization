/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@services": path.resolve(__dirname, "src/services"),
      "@components": path.resolve(__dirname, "src/components"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@services/(.*)$": "<rootDir>/src/services/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@containers/(.*)$": "<rootDir>/src/containers/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
      },
    },
  },
};
