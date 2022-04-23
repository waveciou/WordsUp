import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Alert from '@/Components/alert';
import RecordCard from '@/Components/recordCard';
import { IRecordItem } from '@/Interfaces/exam';
import { setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Record: React.FC = () => {
  const dispatch = useDispatch();
  const { recordCollection } = useSelector((state: RootState) => state.exam);
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);

  const recordListMemo = useMemo(() => recordCollection.map((item: IRecordItem, index: number) => (
    <li
      key={uuidv4()}
      className={`${index + 1 < recordCollection.length ? 'tw-mb-3' : ''}`}
    >
      <RecordCard recordData={item} />
    </li>
  )), [recordCollection]);

  return (
    <>
      <h1 className="title">測驗紀錄</h1>
      {
        recordCollection.length > 0
        && (
          <div className="content tw-p-0 tw-rounded-none tw-bg-transparent">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div className="tw-text-yellow tw-text-xs">
                共
                <span className="tw-mx-1">{ recordCollection.length }</span>
                筆紀錄
              </div>
              <button
                type="button"
                className="tw-inline-flex tw-items-center tw-py-2 tw-pl-2 tw-pr-3 tw-rounded-lg tw-bg-white tw-text-black tw-text-xxs before-font-material before:tw-content-['\e92b'] before:tw-text-black desktop:hover:tw-bg-green-dark desktop:hover:tw-text-white desktop:hover:before:tw-text-white"
                aria-label="data-update-button"
                onClick={() => setIsShowDeleteAlert(true)}
              >
                清除全部紀錄
              </button>
            </div>
          </div>
        )
      }

      <div className="content">
        { recordCollection.length > 0
          ? (
            <ul>{ recordListMemo }</ul>
          ) : (
            <div className="tw-flex tw-justify-center tw-text-gray tw-py-8">目前沒有任何測驗紀錄</div>
          )}
      </div>

      <Alert
        show={isShowDeleteAlert}
        title="確定要清除全部紀錄？"
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
