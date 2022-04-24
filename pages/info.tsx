import React, { useState } from 'react';

import Alert from '@/Components/alert';
import useGetSheetData from '@/Hook/useGetSheetData';

import pkg from '../package.json';

const Info: React.FC = () => {
  const handleGetData = useGetSheetData();
  const [isShowClearAlert, setIsShowClearAlert] = useState<boolean>(false);

  return (
    <>
      <h1 className="title">更多資訊</h1>
      <div className="content size-small">
        <ul>
          <li className="tw-mb-3">
            <button
              type="button"
              className="tw-w-full tw-flex tw-items-center tw-text-xs tw-text-left tw-p-3 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:tw-content-['\e1db'] before:tw-block before:tw-mr-2"
              title="清空 LocalStorage"
              onClick={() => setIsShowClearAlert(true)}
            >
              <span className="tw-block tw-truncate tw-leading-relaxed">
                清空 LocalStorage
              </span>
            </button>
          </li>
          <li className="tw-mb-3">
            <button
              type="button"
              className="tw-w-full tw-flex tw-items-center tw-text-xs tw-text-left tw-p-3 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:tw-content-['\e5d5'] before:tw-block before:tw-mr-2"
              onClick={handleGetData}
              title="更新單字資料庫"
            >
              <span className="tw-block tw-truncate tw-leading-relaxed">
                更新單字資料庫
              </span>
            </button>
          </li>
          <li className="tw-mb-3">
            <a
              className="tw-w-full tw-flex tw-items-center tw-text-xs tw-text-left tw-p-3 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:tw-w-6 before:tw-h-6 before:tw-block before:tw-bg-no-repeat before:tw-bg-center before:tw-bg-contain before:tw-bg-[url('../public/img/github.svg')] before:tw-mr-2"
              href="https://github.com/waveciou/words-up"
              target="_blank"
              title="GitHub - Words Up"
              rel="noreferrer"
            >
              <span className="tw-block tw-truncate tw-leading-relaxed">
                GitHub
              </span>
            </a>
          </li>
        </ul>
        <div className="tw-mt-8 tw-mb-2 tw-text-center tw-text-xs tw-leading-6">
          <p>
            Version:
            {' '}
            {pkg.version}
          </p>
          <p>
            Created By
            {' '}
            <a
              href="https://github.com/waveciou"
              target="_blank"
              title="GitHub @waveciou"
              rel="noreferrer"
              className="hover:tw-text-green-dark"
            >
              @waveciou
            </a>
          </p>
        </div>
      </div>

      <Alert
        show={isShowClearAlert}
        title="確定要清空 LocalStorage？"
        content="此動作將會清除所有測驗紀錄以及重置今日單字資料"
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => {
          setIsShowClearAlert(false);
          localStorage.clear();
        }}
        onCancel={() => setIsShowClearAlert(false)}
      />
    </>
  );
};

export default Info;
