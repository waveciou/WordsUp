import { clear, createStore } from 'idb-keyval';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@/Components/utils/alert';
import randomCollection from '@/Functions/randomCollection';
import useGetSheetData from '@/Hooks/useGetSheetData';
import useSetDailyWords from '@/Hooks/useSetDailyWords';
import useSetDate from '@/Hooks/useSetDate';
import { setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

import pkg from '../package.json';

const Info: React.FC = () => {
  const dispatch = useDispatch();
  const handleGetData = useGetSheetData();
  const handleSetDate = useSetDate();
  const handleSetDailyWords = useSetDailyWords();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const [isShowClearAlert, setIsShowClearAlert] = useState<boolean>(false);

  const handleClearIndexedDB = useCallback(() => {
    const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');
    const randoms: number[] = randomCollection(10, WORDS_DATA.length);

    clear(wordsUpStore);

    handleSetDailyWords({
      date: handleSetDate(),
      words: randoms.map((num: number) => WORDS_DATA[num].id),
    });

    dispatch(setRecordCollection([]));
    setIsShowClearAlert(false);
  }, [WORDS_DATA]);

  return (
    <>
      <h1 className="title">更多資訊</h1>
      <div className="content size-small">
        <ul>
          <li className="mb-3">
            <button
              type="button"
              className="w-full flex items-center text-xs text-left p-3 rounded-lg shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:content-['\e1db'] before:block before:mr-2"
              title="清空 IndexedDB"
              onClick={() => setIsShowClearAlert(true)}
            >
              <span className="block truncate leading-relaxed">
                清空 IndexedDB
              </span>
            </button>
          </li>
          <li className="mb-3">
            <button
              type="button"
              className="w-full flex items-center text-xs text-left p-3 rounded-lg shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:content-['\e5d5'] before:block before:mr-2"
              onClick={handleGetData}
              title="更新單字資料庫"
            >
              <span className="block truncate leading-relaxed">
                更新單字資料庫
              </span>
            </button>
          </li>
          <li className="mb-3">
            <a
              className="w-full flex items-center text-xs text-left p-3 rounded-lg shadow-[0_1px_3px_0_rgba(51,51,51,0.2)] before-font-material before:w-6 before:h-6 before:block before:bg-no-repeat before:bg-center before:bg-contain before:bg-[url('../public/img/github.svg')] before:mr-2"
              href="https://github.com/waveciou/WordsUp"
              target="_blank"
              title="GitHub - Words Up"
              rel="noreferrer"
            >
              <span className="block truncate leading-relaxed">GitHub</span>
            </a>
          </li>
        </ul>
        <div className="mt-8 mb-2 text-center text-xs leading-6">
          <p>Version: {pkg.version}</p>
          <p>
            Created By{' '}
            <a
              href="https://github.com/waveciou"
              target="_blank"
              title="GitHub @waveciou"
              rel="noreferrer"
              className="hover:text-green-dark"
            >
              @waveciou
            </a>
          </p>
        </div>
      </div>

      <Alert
        show={isShowClearAlert}
        title="確定要清空 IndexedDB？"
        content="此動作將會清空測驗紀錄、收藏單字並重置今日單字資料"
        confirmText="確定"
        cancelText="取消"
        onConfirm={handleClearIndexedDB}
        onCancel={() => setIsShowClearAlert(false)}
      />
    </>
  );
};

export default Info;
