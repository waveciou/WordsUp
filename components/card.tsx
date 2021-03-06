import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/utils/popup';
import WordsCaption from '@/Components/wordsCaption';
import WordsDetails from '@/Components/wordsDetails';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface ICardProps {
  wordItem: IWordItem;
}

const Card: React.FC<ICardProps> = ({ wordItem }) => {
  const dispatch = useDispatch();
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { id, en, zh, parts } = wordItem;

  const handleSetFavorite = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(deleteFavoriteItem(id));
    } else {
      dispatch(addFavoriteItem(id));
    }
  };

  useEffect(() => {
    const dataSet: Set<IWordItem> = new Set(FAVORITES_DATA);
    setIsFavorite(dataSet.has(wordItem));
  }, [FAVORITES_DATA]);

  return (
    <>
      <div
        className="tw-h-full tw-p-3 tw-block tw-rounded-lg tw-cursor-pointer tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]"
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className="tw-relative">
          <div className="tw-text-base tw-text-wine tw-leading-7 tw-break-all tw-pr-7">
            {en}
          </div>
          <div className="tw-text-xs tw-text-black tw-leading-6">
            <WordsCaption id={id} wordsList={zh} partsList={parts} />
          </div>
          <button
            type="button"
            aria-label="favorite-button"
            className={`favorite-button before-icon-star tw-w-7 tw-h-7 tw-absolute tw-right-0 tw-top-0 before:tw-leading-7 ${
              isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'
            }`}
            title={isFavorite ? '????????????' : '????????????'}
            onClick={handleSetFavorite}
          />
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <WordsDetails uuId={uuidv4()} wordItem={wordItem} />
      </Popup>
    </>
  );
};

export default Card;
