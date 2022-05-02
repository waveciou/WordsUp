import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root-popup" />
          <div id="modal-root-alert" />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
