import * as React from 'react';
import { useState, useEffect } from 'react';

// Style
import styles from '../styles/components/Collection.module.scss';

// Component
import Popup from './common/Popup';
import WordDetail from './WordDetail';

// Interface
import { IWordItem } from '../src/interfaces/I_WordCase';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const [isShow, setIsShow] = useState(false);
  const { english, chinese, parts } = word;

  // Parts Text
  const [partsText, setPartsText] = useState('');

  useEffect(() => {
    const result: string = parts.reduce((prevText, currentText, index) => {
      if (index === 0) {
        return `${currentText}`;
      }
      return `${prevText}、${currentText}`;
    }, '');
    setPartsText(result);
  }, [parts]);

  return (
    <>
      <div
        className={styles.collectedCard}
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className={styles.collectedCard__title}>{ english }</div>
        <div className={styles.collectedCard__subtitle}>
          <span className={styles.collectedCard__part}>{ partsText }</span>
          <span>{ chinese }</span>
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <WordDetail word={word} />
      </Popup>
    </>
  );
};

export default CollectedCard;
