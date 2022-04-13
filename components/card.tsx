import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/popup';
import WordItemDetail from '@/Components/wordItemDetail';
import WordsCaption from '@/Components/wordsCaption';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/card.module.scss';

interface ICardProps {
  wordData: IWordItem
}

const Card: React.FC<ICardProps> = ({ wordData }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const {
    id, en, zh, parts,
  } = wordData;

  return (
    <>
      <div
        className={styles.roof}
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className={styles.title}>{ en }</div>
        <div className={styles.description}>
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <WordItemDetail id={uuidv4()} wordData={wordData} />
      </Popup>
    </>
  );
};

export default Card;
