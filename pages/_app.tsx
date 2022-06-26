import '@/Styles/main.scss';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';

import Layout from '@/Components/layout';
import LayoutFailed from '@/Components/layout/failed';
import { store } from '@/Store/index';

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const failedPagesSet: Set<string> = new Set(['/404', '/error']);

  const pageMemo = useMemo(() => {
    if (failedPagesSet.has(pathname)) {
      return (
        <LayoutFailed>
          <Component {...pageProps} />
        </LayoutFailed>
      );
    }
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }, [Component, pageProps, pathname]);

  return <Provider store={store}>{pageMemo}</Provider>;
};

export default App;
