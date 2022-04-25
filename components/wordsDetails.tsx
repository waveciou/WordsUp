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
      </div>
    </div>
  );
};

export default WordsDetails;
