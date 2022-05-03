import { useRouter } from 'next/router';
import React from 'react';

import { PrimaryButton } from '@/Components/form';

const Custom404 = () => {
  const router = useRouter();
  return (
    <div className="tw-border-2 tw-border-yellow tw-border-solid tw-rounded-lg">
      <h1 className="tw-text-center">
        <strong className="tw-text-not-found-caption tw-leading-tight tw-text-yellow">404</strong>
        <div className="tw-font-black tw-text-yellow-light">PAGE NOT FOUND</div>
      </h1>
      <div className="tw-flex tw-justify-center tw-mt-6 tw-mb-4">
        <PrimaryButton
          text="回首頁"
          colorStyle="green-dark"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
};

export default Custom404;
