import * as React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/main.scss';

// Redux
import { Provider } from 'react-redux';
import { store } from '../store';

const AppComponent = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
};

export default AppComponent;