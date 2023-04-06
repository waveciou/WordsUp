import Head from 'next/head';
import React from 'react';

const MetaData: React.FC = () => (
  <Head>
    <title>Words Up</title>
    <meta charSet="UTF-8" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <meta name="format-detection" content="telephone=no" />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-57x57.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-60x60.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-72x72.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-76x76.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-114x114.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-120x120.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-144x144.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-152x152.png`}
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${process.env.BASE_PATH}/favicon/apple-icon-180x180.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href={`${process.env.BASE_PATH}/favicon/android-icon-192x192.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${process.env.BASE_PATH}/favicon/favicon-32x32.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href={`${process.env.BASE_PATH}/favicon/favicon-96x96.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${process.env.BASE_PATH}/favicon/favicon-16x16.png`}
    />
    <link
      rel="manifest"
      href="https://waveciou-wordsup.vercel.app/manifest.json"
    />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta
      name="msapplication-TileImage"
      content={`${process.env.BASE_PATH}/favicon/ms-icon-144x144.png`}
    />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="一個單字學習平台的 side project" />
    <meta property="og:title" content="Words Up" />
    <meta property="og:description" content="一個單字學習平台的 side project" />
    <meta
      property="og:image"
      content="hhttps://waveciou-wordsup.vercel.app/img/icon.jpg"
    />
    <meta name="twitter:title" content="Words Up" />
    <meta
      name="twitter:description"
      content="一個單字學習平台的 side project"
    />
    <meta
      name="twitter:image"
      content="https://waveciou-wordsup.vercel.app/img/icon.jpg"
    />
  </Head>
);

export default MetaData;
