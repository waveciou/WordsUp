import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/popup';
import WordItemDetail from '@/Components/wordItemDetail';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/card.module.scss';

interface ICardProps {
  id: string,
  wordData: IWordItem
}

const Card: React.FC<ICardProps> = ({ id, wordData }) => {
  const { en, zh, parts } = wordData;
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.card}
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className={styles.card__title}>{ en }</div>
        <div className={styles.card__subtitle}>
          { zh.map((textItem, index) => {
            const key: string = `${id}_zh-${index}`;
            return (
              <div key={key}>
                <span className={styles.card__part}>{ parts[index] }</span>
                <span>{ textItem }</span>
              </div>
            );
          })}
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <WordItemDetail id={uuidv4()} wordData={wordData} />
      </Popup>
    </>
  );
};

export default Card;
