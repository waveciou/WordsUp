const loadGapiScript = (handleCallback: () => void) => {
  const existingScript = document.getElementById('googleApis');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.id = 'googleApis';
    document.body.appendChild(script);

    script.onload = () => {
      if (handleCallback) {
        handleCallback();
      }
    };
  }

  if (existingScript && handleCallback) {
    handleCallback();
  }
};

export default loadGapiScript;
