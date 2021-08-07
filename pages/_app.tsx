import * as React from 'react';
import { AppProps } from 'next/app'
import '../styles/main.scss';

// Redux
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { store } from '../store';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={ store }>
      <Component {...pageProps} />
    </Provider>
  )
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);