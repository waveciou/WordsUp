import * as React from 'react';
import Head from 'next/head';

const MetaData: React.FC = () => {
  return (
    <Head>
      <title>Words Up</title>
      <meta charSet="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  )
};

export default MetaData;
