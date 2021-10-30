const initGapiClient = (handleCallback: (SHEET_ID: string) => void) => {
  const handleInitial = () => {
    window.gapi.client.init({
      apiKey: process.env.API_KEY,
      clientId: process.env.CLIENT_ID,
      scope: process.env.SCOPE,
      discoveryDocs: [process.env.DISCOVERY_DOCS],
    }).then(() => {
      const sheetId: string = process.env.SHEET_ID as string;
      handleCallback(sheetId);
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
