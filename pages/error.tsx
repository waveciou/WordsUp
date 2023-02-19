import React from 'react';

const Error = () => (
  <>
    <div className="border-2 border-yellow border-solid rounded-lg">
      <h1 className="text-center my-12">
        <strong className="text-xl mini:text-error-caption leading-tight text-yellow">
          ERROR
        </strong>
        <div className="font-500 text-yellow-light">資料載入錯誤</div>
      </h1>
    </div>
  </>
);

export default Error;
