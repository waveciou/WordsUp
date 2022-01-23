import '@/Styles/main.scss';

import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import Layout from '@/Components/layout';
import { store } from '@/Store/index';

const AppComponent = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default AppComponent;
