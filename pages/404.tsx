/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React from 'react';

import { PrimaryButton } from '@/Components/form';
import Meta from '@/Components/meta';

const Custom404 = () => {
  const router = useRouter();
  return (
    <>
      <Meta />
      <div className="content size-small tw-bg-transparent">
        <h1 className="tw-text-center">
          <strong className="tw-text-not-found-caption tw-leading-tight tw-text-yellow">404</strong>
          <div className="tw-font-black tw-text-yellow-light">PAGE NOT FOUND</div>
        </h1>
        <div className="tw-flex tw-justify-center tw-mt-6">
          <PrimaryButton
            text="回首頁"
            colorStyle="green-dark"
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </>
  );
};

export default Custom404;
