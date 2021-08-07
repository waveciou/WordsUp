import * as React from 'react';
import { AppProps } from 'next/app';

// Redux
import { Provider } from 'react-redux';
import { store } from '../store';

import Layout from '../components/layout';
import '../styles/main.scss';

const AppComponent = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default AppComponent;
