import * as React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class DocumentComponent extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root-popup" />
        </body>
      </Html>
    );
  }
}

export default DocumentComponent;
