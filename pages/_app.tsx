/* eslint-disable react-hooks/exhaustive-deps */
import '@/Styles/main.scss';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';

import Layout from '@/Components/layout';
import { store } from '@/Store/index';

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const componentPages: string[] = ['/404', '/error'];

  const pageMemo = useMemo(() => {
    if (componentPages.includes(pathname)) {
      return <Component {...pageProps} />;
    }
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }, [Component, pageProps, pathname]);

  return (
    <Provider store={store}>
      { pageMemo }
    </Provider>
  );
};

export default App;
