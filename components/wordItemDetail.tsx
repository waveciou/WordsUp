import React from 'react';

import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/wordItemDetail.module.scss';

interface IWordItemDetailProps {
  id: string,
  wordData: IWordItem
}

const WordItemDetail: React.FC<IWordItemDetailProps> = ({ id, wordData }) => {
  // Speech Synthesis
  const handleSpeechSpeak = useSpeechSpeak();
  const { en, zh, parts } = wordData;

  return (
    <div className={styles.wordItemDetail}>
      <div className={styles.wordItemDetail__title}>{ en }</div>
      <div className={styles.wordItemDetail__subtitle}>
        <button
          type="button"
          aria-label="speech"
          className={styles['speech-btn']}
          onClick={() => handleSpeechSpeak(en)}
        />
        {
          zh.map((textItem, index) => {
            const key: string = `${id}_zh-${index}`;
            return (
              <div key={key}>
                <span className={styles.wordItemDetail__part}>{ parts[index] }</span>
                <span>{ textItem }</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default WordItemDetail;
