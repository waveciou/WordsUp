import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IWordItemDetailProps {
  uuId: string,
  wordItem: IWordItem
}

const WordsDetails: React.FC<IWordItemDetailProps> = ({ uuId, wordItem }) => {
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { id, en, zh, parts } = wordItem;

  const handleSetFavorite = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
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
    <div className="tw-text-sm">
      <div className="tw-relative tw-pr-9">
        <div className="tw-text-lg tw-text-wine tw-leading-9">{ en }</div>
        <button
          type="button"
          aria-label="favorite-button"
          className={`favorite-button before-icon-star tw-w-9 tw-h-9 tw-absolute tw-right-0 tw-top-0 before:tw-leading-9 ${isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'}`}
          title={isFavorite ? '移除收藏' : '加入收藏'}
          onClick={handleSetFavorite}
        />
      </div>
      <div className="tw-leading-7">
        <div className="tw-my-2">
          <button
            type="button"
            aria-label="speech"
            className="tw-w-7 tw-h-7 tw-block tw-mr-1 tw-leading-7 before-font-material before:tw-content-['\e050'] before:tw-block before:tw-leading-7"
            onClick={() => handleSpeechSpeak(en)}
          />
        </div>
        <WordsCaption id={uuId} wordsList={zh} partsList={parts} hasBrackets />
        <div className="tw-w-full tw-h-px tw-mt-4 tw-mb-3 tw-bg-gray" />
        <a
          href={`https://dictionary.cambridge.org/zht/詞典/英語-漢語-繁體/${en}`}
          target="_blank"
          rel="noreferrer"
          title="劍橋辭典連結"
          className="tw-inline-flex tw-items-center tw-text-xs before-font-material before:tw-content-['\ea19'] before:tw-block before:tw-mr-2 desktop:hover:tw-text-green"
        >
          劍橋辭典連結
        </a>
      </div>
    </div>
  );
};

export default WordsDetails;
