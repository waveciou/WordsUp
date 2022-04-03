import React from 'react';

import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';
import styles from '@/Styles/wordItemDaily.module.scss';

interface IWordItemDailyProps {
  dateCaption: string,
  wordData: IWordItem,
}

const WordItemDaily: React.FC<IWordItemDailyProps> = ({ dateCaption, wordData }) => {
  // Speech Synthesis
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
        <div className={styles.date}>{ dateCaption }</div>
      </div>
      <div className={styles.body}>
        <div className={styles.caption}>{ en }</div>
        <div className={styles.feature}>
          <button
            type="button"
            aria-label="speech"
            className={stylesButton['speech-btn']}
            onClick={() => handleSpeechSpeak(en)}
          />
        </div>
        {
          zh.map((textItem, index) => {
            const key: string = `${id}_zh-${index}`;
            return (
              <div className={styles.subtitle} key={key}>
                <span className={styles.part}>{ parts[index] }</span>
                <span>{ textItem }</span>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default WordItemDaily;
