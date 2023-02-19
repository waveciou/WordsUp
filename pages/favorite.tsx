import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/Components/card';
import ColumnItem from '@/Components/columnItem';
import Alert from '@/Components/utils/alert';
import { IWordItem } from '@/Interfaces/word';
import { setFavoriteItems } from '@/Slice/collection';
import { RootState } from '@/Store/index';

const Favorite = () => {
  const dispatch = useDispatch();
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);

  // List Memo
  const wordListMemo = useMemo(
    () =>
      FAVORITES_DATA.map((wordItem: IWordItem, index: number) => (
        <ColumnItem
          id={wordItem.id}
          length={FAVORITES_DATA.length}
          index={index}
        >
          <Card wordItem={wordItem} />
        </ColumnItem>
      )),
    [FAVORITES_DATA]
  );

  return (
    <>
      <h1 className="title">收藏單字</h1>
      {FAVORITES_DATA.length > 0 && (
        <div className="content size-large p-0 rounded-none bg-transparent">
          <div className="flex justify-between items-center">
            <div className="text-yellow text-xs">
              共<span className="mx-1">{FAVORITES_DATA.length}</span>
              筆資料
            </div>
            <button
              type="button"
              className="inline-flex items-center py-2 pl-2 pr-3 rounded-lg bg-white text-black text-xxs before-font-material before:content-['\e92b'] before:text-black desktop:hover:bg-green-dark desktop:hover:text-white desktop:hover:before:text-white"
              aria-label="data-update-button"
              onClick={() => setIsShowDeleteAlert(true)}
            >
              清除所有單字
            </button>
          </div>
        </div>
      )}

      <div className="content size-large">
        {FAVORITES_DATA.length ? (
          <ul className="flex flex-wrap">{wordListMemo}</ul>
        ) : (
          <div className="text-center text-gray py-8">目前沒有任何收藏單字</div>
        )}
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
