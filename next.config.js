const isDevEnv = process.env.NODE_ENV === 'development';
const productionPath = '/words-up';

module.exports = {
  basePath: isDevEnv ? '' : productionPath,
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    BASE_PATH: isDevEnv ? '' : productionPath,
    API_KEY: 'AIzaSyBqwYzbJZjQZggrAYBkiUgUNhxnTI695oI',
    CLIENT_ID: '',
    SCOPE: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    SHEET_ID: '1zPtjgSkHph67f_4RxL5AzEzdmwh6XMxzdSYoJcSkJtY',
    DISCOVERY_DOCS: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
  },
};
