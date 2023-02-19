import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import RecordCard from '@/Components/recordCard';
import Alert from '@/Components/utils/alert';
import { IRecordItem } from '@/Interfaces/exam';
import { setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Record: React.FC = () => {
  const dispatch = useDispatch();
  const { recordCollection } = useSelector((state: RootState) => state.exam);
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);

  const recordListMemo = useMemo(
    () =>
      recordCollection.map((item: IRecordItem, index: number) => (
        <li
          key={uuidv4()}
          className={`${index + 1 < recordCollection.length ? 'mb-3' : ''}`}
        >
          <RecordCard recordData={item} />
        </li>
      )),
    [recordCollection]
  );

  return (
    <>
      <h1 className="title">測驗紀錄</h1>
      {recordCollection.length > 0 && (
        <div className="content p-0 rounded-none bg-transparent">
          <div className="flex justify-between items-center">
            <div className="text-yellow text-xs">
              共<span className="mx-1">{recordCollection.length}</span>
              筆紀錄
            </div>
            <button
              type="button"
              className="inline-flex items-center py-2 pl-2 pr-3 rounded-lg bg-white text-black text-xxs before-font-material before:content-['\e92b'] before:text-black desktop:hover:bg-green-dark desktop:hover:text-white desktop:hover:before:text-white"
              aria-label="data-update-button"
              onClick={() => setIsShowDeleteAlert(true)}
            >
              清除全部紀錄
            </button>
          </div>
        </div>
      )}

      <div className="content">
        {recordCollection.length > 0 ? (
          <ul>{recordListMemo}</ul>
        ) : (
          <div className="text-center text-gray py-8">目前沒有任何測驗紀錄</div>
        )}
      </div>

      <Alert
        show={isShowDeleteAlert}
        title="確定要清除全部紀錄？"
        content="此動作將無法復原"
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => {
          dispatch(setRecordCollection([]));
          setIsShowDeleteAlert(false);
        }}
        onCancel={() => setIsShowDeleteAlert(false)}
      />
    </>
  );
};

export default Record;
