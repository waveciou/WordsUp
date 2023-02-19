import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IWordItemDetailProps {
  uuId: string;
  wordItem: IWordItem;
}

const WordsDetails: React.FC<IWordItemDetailProps> = ({ uuId, wordItem }) => {
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
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
    <div className="text-sm">
      <div className="relative pr-9">
        <div className="text-lg text-wine leading-9">{en}</div>
        <button
          type="button"
          aria-label="favorite-button"
          className={`favorite-button before-icon-star w-9 h-9 absolute right-0 top-0 before:leading-9 ${
            isFavorite ? 'text-yellow-dark' : 'text-gray/60'
          }`}
          title={isFavorite ? '移除收藏' : '加入收藏'}
          onClick={handleSetFavorite}
        />
      </div>
      <div className="leading-7">
        <WordsCaption id={uuId} wordsList={zh} partsList={parts} hasBrackets />
        <div className="mt-2">
          <button
            type="button"
            aria-label="speech"
            className="w-7 h-7 block mr-1 leading-7 before-font-material before:content-['\e050'] before:block before:leading-7"
            onClick={() => handleSpeechSpeak(en)}
          />
        </div>
        <div className="w-full h-px my-3 bg-gray" />
        <a
          href={`https://dictionary.cambridge.org/zht/詞典/英語-漢語-繁體/${en}`}
          target="_blank"
          rel="noreferrer"
          title="劍橋辭典連結"
          className="inline-flex items-center text-xs before-font-material before:content-['\ea19'] before:block before:mr-2 desktop:hover:text-green"
        >
          劍橋辭典連結
        </a>
      </div>
    </div>
  );
};

export default WordsDetails;
