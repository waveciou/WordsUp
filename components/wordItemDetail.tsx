import React from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';

interface IWordItemDetailProps {
  id: string,
  wordData: IWordItem
}

const WordItemDetail: React.FC<IWordItemDetailProps> = ({ id, wordData }) => {
  const handleSpeechSpeak = useSpeechSpeak();
  const { en, zh, parts } = wordData;

  return (
    <div className="tw-text-sm">
      <div className="tw-text-lg tw-text-wine tw-leading-7">{ en }</div>
      <div className="tw-leading-7">
        <div>
          <button
            type="button"
            aria-label="speech"
            className={stylesButton['speech-btn']}
            onClick={() => handleSpeechSpeak(en)}
          />
        </div>
        <WordsCaption id={id} wordsList={zh} partsList={parts} hasBrackets />
      </div>
    </div>
  );
};

export default WordItemDetail;
