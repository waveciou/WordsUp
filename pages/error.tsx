/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React from 'react';

import { PrimaryButton } from '@/Components/form';
import Meta from '@/Components/meta';

const Error = () => {
  const router = useRouter();
  return (
    <>
      <Meta />
      <div className="content size-small tw-bg-transparent">
        <h1 className="tw-text-center tw-my-12">
          <strong className="tw-text-error-caption tw-leading-tight tw-text-yellow">ERROR</strong>
          <div className="tw-font-500 tw-text-yellow-light">資料載入錯誤</div>
        </h1>
      </div>
    </>
  );
};

export default Error;
