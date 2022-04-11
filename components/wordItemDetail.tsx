import React from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';
import styles from '@/Styles/wordItemDetail.module.scss';

interface IWordItemDetailProps {
  id: string,
  wordData: IWordItem
}

const WordItemDetail: React.FC<IWordItemDetailProps> = ({ id, wordData }) => {
  const handleSpeechSpeak = useSpeechSpeak();
  const { en, zh, parts } = wordData;

  return (
    <div className={styles.roof}>
      <div className={styles.title}>{ en }</div>
      <div className={styles.body}>
        <div className={styles.feature}>
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
