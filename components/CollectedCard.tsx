import React, { useEffect, useState } from 'react';

import Popup from '@/Components/popup';
import WordDetail from '@/Components/WordDetail';
import handleGetPartsText from '@/Functions/getPartsText';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/components/Collection.module.scss';

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
