import React from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/wordItemDaily.module.scss';

interface IWordItemDailyProps {
  dateCaption: string,
  wordData: IWordItem,
}

const WordItemDaily: React.FC<IWordItemDailyProps> = ({ dateCaption, wordData }) => {
  const handleSpeechSpeak = useSpeechSpeak();

  const {
    id, en, zh, parts,
  } = wordData;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          今日單字
        </h1>
        <div className="tw-text-xs">{ dateCaption }</div>
      </div>
      <div className={styles.body}>
        <div className={styles.caption}>{ en }</div>
        <WordsCaption
          id={id}
          wordsList={zh}
          partsList={parts}
          hasBrackets
          hasTextCenter
          hasSpeechButton
          handleSpeech={() => { handleSpeechSpeak(en); }}
        />
      </div>
    </>
  );
};

export default WordItemDaily;
