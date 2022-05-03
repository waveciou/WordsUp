import React from 'react';

const Error = () => (
  <>
    <div className="tw-border-2 tw-border-yellow tw-border-solid tw-rounded-lg">
      <h1 className="tw-text-center tw-my-12">
        <strong className="tw-text-xl mini:tw-text-error-caption tw-leading-tight tw-text-yellow">ERROR</strong>
        <div className="tw-font-500 tw-text-yellow-light">資料載入錯誤</div>
      </h1>
    </div>
  </>
);

export default Error;
