import { useRouter } from 'next/router';
import React from 'react';

import { PrimaryButton } from '@/Components/utils/form';

const Custom404 = () => {
  const router = useRouter();
  return (
    <div className="border-2 border-yellow border-solid rounded-lg">
      <h1 className="text-center">
        <strong className="text-not-found-caption leading-tight text-yellow">
          404
        </strong>
        <div className="font-black text-yellow-light">PAGE NOT FOUND</div>
      </h1>
      <div className="flex justify-center mt-6 mb-4">
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
