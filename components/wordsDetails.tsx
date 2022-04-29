import React from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';

interface IWordItemDetailProps {
  id: string,
  wordData: IWordItem
}

const WordsDetails: React.FC<IWordItemDetailProps> = ({ id, wordData }) => {
  const handleSpeechSpeak = useSpeechSpeak();
  const { en, zh, parts } = wordData;

  return (
    <div className="tw-text-sm">
      <div className="tw-text-lg tw-text-wine tw-leading-9">{ en }</div>
      <div className="tw-leading-7">
        <div className="tw-my-2">
          <button
            type="button"
            aria-label="speech"
            className={stylesButton['speech-btn']}
            onClick={() => handleSpeechSpeak(en)}
          />
        </div>
        <WordsCaption id={id} wordsList={zh} partsList={parts} hasBrackets />
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
