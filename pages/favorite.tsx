import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@/Components/alert';
import Card from '@/Components/card';
import { IWordItem } from '@/Interfaces/word';
import { setFavoriteItems } from '@/Slice/collection';
import { RootState } from '@/Store/index';

const Favorite = () => {
  const dispatch = useDispatch();
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);

  // List Memo
  const wordListMemo = useMemo(() => FAVORITES_DATA.map((wordData: IWordItem, index: number) => {
    const { id } = wordData;
    const isEven: boolean = !!(index % 2 === 1);
    const isThirChid: boolean = !!((index + 1) % 3 === 0);
    return (
      <li
        key={id}
        className={`tw-w-full tablet:tw-w-[calc((100%-0.75rem)/2)] tablet:tw-mr-3 desktop:tw-w-[calc((100%-1.5rem)/3)] ${index + 1 < FAVORITES_DATA.length ? 'tw-mb-3' : ''} ${isEven ? 'tablet:tw-mr-0 desktop:tw-mr-3' : ''} ${isThirChid ? 'desktop:tw-mr-0' : ''}`}
      >
        <Card wordData={wordData} />
      </li>
    );
  }), [FAVORITES_DATA]);

  return (
    <>
      <h1 className="title">收藏單字</h1>
      {
        FAVORITES_DATA.length > 0 && (
          <div className="content size-large tw-p-0 tw-rounded-none tw-bg-transparent">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div className="tw-text-yellow tw-text-xs">
                共
                <span className="tw-mx-1">{ FAVORITES_DATA.length }</span>
                筆資料
              </div>
              <button
                type="button"
                className="tw-inline-flex tw-items-center tw-py-2 tw-pl-2 tw-pr-3 tw-rounded-lg tw-bg-white tw-text-black tw-text-xxs before-font-material before:tw-content-['\e92b'] before:tw-text-black desktop:hover:tw-bg-green-dark desktop:hover:tw-text-white desktop:hover:before:tw-text-white"
                aria-label="data-update-button"
                onClick={() => setIsShowDeleteAlert(true)}
              >
                清除所有單字
              </button>
            </div>
          </div>
        )
      }

      <div className="content size-large">
        {
          FAVORITES_DATA.length
            ? (
              <ul className="tw-flex tw-flex-wrap">
                { wordListMemo }
              </ul>
            ) : (
              <div className="tw-text-center tw-text-gray tw-py-8">目前沒有資料</div>
            )
        }
      </div>

      <Alert
        show={isShowDeleteAlert}
        title="確定要清除全部單字？"
        content="此動作將無法復原"
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => {
          dispatch(setFavoriteItems([]));
          setIsShowDeleteAlert(false);
        }}
        onCancel={() => setIsShowDeleteAlert(false)}
      />
    </>
  );
};

export default Favorite;
