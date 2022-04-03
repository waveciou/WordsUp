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
      <div className={styles.wordItemDaily__header}>
        <h1 className={styles.wordItemDaily__title}>
          今日單字
        </h1>
        <div className={styles.wordItemDaily__date}>{ dateCaption }</div>
      </div>
      <div className={styles.wordItemDaily__body}>
        <div className={styles.wordItemDaily__caption}>{ en }</div>
        <div className={styles.wordItemDaily__feature}>
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
              <div className={styles.wordItemDaily__subtitle} key={key}>
                <span className={styles.wordItemDaily__part}>{ parts[index] }</span>
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
