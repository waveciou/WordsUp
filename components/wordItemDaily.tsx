import React from 'react';

import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/wordItemDaily.module.scss';

interface IWordItemDailyProps {
  caption: string,
  wordData: IWordItem,
}

const WordItemDaily: React.FC<IWordItemDailyProps> = ({ caption, wordData }) => (
  <>
    <div className={styles.wordItemDaily__header}>
      <div className={styles.wordItemDaily__title}>
        今日單字
      </div>
      <div className={styles.wordItemDaily__date}>{ caption }</div>
    </div>
    <div className={styles.wordItemDaily__wrap}>
      { wordData.en }
    </div>
  </>
);

export default WordItemDaily;
