import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';
import stylesButton from '@/Styles/button.module.scss';

interface IWordItemDetailProps {
  uuId: string,
  wordData: IWordItem
}

const WordsDetails: React.FC<IWordItemDetailProps> = ({ uuId, wordData }) => {
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { id, en, zh, parts } = wordData;

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
    setIsFavorite(dataSet.has(wordData));
  }, [FAVORITES_DATA]);

  return (
    <div className="tw-text-sm">
      <div className="tw-relative">
        <div className="tw-text-lg tw-text-wine tw-leading-9 tw-pr-9">{ en }</div>
        {
          isFavorite ? (
            <button
              type="button"
              aria-label="favorite-button"
              className="tw-w-9 tw-h-9 tw-flex tw-justify-center tw-items-center tw-absolute tw-right-0 tw-top-0 before-font-material before:tw-content-['\e838'] before:tw-text-center before:tw-leading-9 before:tw-text-yellow-dark"
              onClick={handleSetFavorite}
            />
          ) : (
            <button
              type="button"
              aria-label="favorite-button"
              className="tw-w-9 tw-h-9 tw-flex tw-justify-center tw-items-center tw-absolute tw-right-0 tw-top-0 before-font-material before:tw-content-['\e838'] before:tw-text-center before:tw-leading-9 before:tw-text-gray/60"
              onClick={handleSetFavorite}
            />
          )
        }
      </div>
      <div className="tw-leading-7">
        <div className="tw-my-2">
          <button
            type="button"
            aria-label="speech"
            className={stylesButton['speech-btn']}
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
