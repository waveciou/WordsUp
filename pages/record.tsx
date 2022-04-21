import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import RecordCard from '@/Components/recordCard';
import { RootState } from '@/Store/index';

const Record: React.FC = () => {
  const { recordCollection } = useSelector((state: RootState) => state.exam);

  const recordListMemo = useMemo(() => recordCollection.map((item) => (
    <li key={uuidv4()}>
      <RecordCard recordData={item} />
    </li>
  )), [recordCollection]);

  return (
    <>
      <h1 className="title">測驗紀錄</h1>
      <div className="content">
        {
          recordCollection.length > 0
            ? (
              <ul>{ recordListMemo }</ul>
            ) : (
              <div className="tw-flex tw-justify-center tw-text-gray tw-py-8">目前沒有資料</div>
            )
        }
      </div>
    </>
  );
};

export default Record;
