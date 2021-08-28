import * as React from 'react';
import { useState } from 'react';

// Style
import styles from '../styles/components/CollectedList.module.scss';

// Component
import Popup from './common/Popup';

// Interface
import { IWordItem } from '../src/interfaces/I_WordCase';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const [isShow, setIsShow] = useState(false);
  const {
    english, chinese, part, status, englishExample, chineseExample,
  } = word;

  return (
    <>
      <div
        className={styles.collectedCard}
        aria-hidden="true"
        onClick={() => { setIsShow(true); }}
      >
        <div className={styles.collectedCard__title}>{ english }</div>
        <div className={styles.collectedCard__subtitle}>
          <span className={styles.collectedCard__part}>{ part }</span>
          <span>{ chinese }</span>
        </div>
      </div>
      <Popup show={isShow} onClose={() => { setIsShow(false); }}>
        <div>
          <div>{ english }</div>
          <div>{ part }</div>
          <div>{ chinese }</div>
          <div>{ status }</div>
          <div>{ englishExample.sentence }</div>
          <div>{ chineseExample.sentence }</div>
        </div>
      </Popup>
    </>
  );
};

export default CollectedCard;
