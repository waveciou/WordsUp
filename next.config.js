/* eslint-disable global-require */
const isDevEnv = process.env.NODE_ENV === 'development';
const productionPath = '';

const provideApiKey = () => {
  if (isDevEnv) {
    const secret = require('./secret.js');
    return secret().API_KEY;
  }
  return process.env.API_KEY;
};

const provideSheetID = () => {
  if (isDevEnv) {
    const secret = require('./secret.js');
    return secret().SHEET_ID;
  }
  return process.env.SHEET_ID;
};

module.exports = {
  basePath: isDevEnv ? '' : productionPath,
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    BASE_PATH: isDevEnv ? '' : productionPath,
    API_KEY: provideApiKey(),
    CLIENT_ID: '',
    SCOPE: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    SHEET_ID: provideSheetID(),
    DISCOVERY_DOCS: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
  },
};
