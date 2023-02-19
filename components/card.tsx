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
        className="h-full p-3 block rounded-lg cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]"
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className="relative">
          <div className="text-base text-wine leading-7 break-all pr-7">
            {en}
          </div>
          <div className="text-xs text-black leading-6">
            <WordsCaption id={id} wordsList={zh} partsList={parts} />
          </div>
          <button
            type="button"
            aria-label="favorite-button"
            className={`favorite-button before-icon-star w-7 h-7 absolute right-0 top-0 before:leading-7 ${
              isFavorite ? 'text-yellow-dark' : 'text-gray/60'
            }`}
            title={isFavorite ? '移除收藏' : '加入收藏'}
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
