const KEY_CONFIG = require('../../data/key.json');

interface IGapisConfig {
  API_KEY: string,
  CLIENT_ID: string,
  SCOPE: string,
  SHEET_ID: string,
  DISCOVERY_DOCS: string
}

const initGapiClient = (handleCallback: (SHEET_ID: string) => void) => {
  const {
    API_KEY, CLIENT_ID, SCOPE, SHEET_ID, DISCOVERY_DOCS,
  } : IGapisConfig = KEY_CONFIG;

  const handleInitial = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [DISCOVERY_DOCS],
    }).then(() => {
      handleCallback(SHEET_ID);
    });
  };

  const interval = setInterval(() => {
    if (window.gapi.client) {
      handleInitial();
      clearInterval(interval);
    }
  }, 500);

  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
};

export default initGapiClient;
