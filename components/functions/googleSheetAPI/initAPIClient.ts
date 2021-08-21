interface IGapisConfig {
  API_KEY: string,
  CLIENT_ID: string,
  SCOPE: string,
  SHEET_ID: string
}

const config = require('./apikey-config.json');

const initGapiClient = (callback: (SHEET_ID: string) => void) => {
  const {
    API_KEY, CLIENT_ID, SCOPE, SHEET_ID,
  } : IGapisConfig = config;

  window.gapi.client?.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPE,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(() => {
    callback(SHEET_ID);
  });
};

export default initGapiClient;
