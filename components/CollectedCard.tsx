import * as React from 'react';
import { useState, useEffect } from 'react';

// Style
import styles from '../styles/components/Collection.module.scss';

// Component
import Popup from './common/Popup';
import WordDetail from './WordDetail';

// Interface
import { IWordItem } from '../src/interfaces/I_WordCase';

// Function
import handleGetPartsText from '../src/functions/getPartsText';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const { english, chinese, parts } = word;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [partsText, setPartsText] = useState<string>('');

  // Parts Text

  useEffect(() => {
    const result: string = handleGetPartsText(parts);
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
