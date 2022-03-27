import React, { useState } from 'react';

import Popup from '@/Components/popup';
import { IWordItem } from '@/Interfaces/word';
import styles from '@/Styles/card.module.scss';

const Card = ({ en, zh, parts }: IWordItem) => {
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
          { zh.map((textItem, index) => (
            <>
              <div key={textItem}>
                <span className={styles.card__part}>{ parts[index] }</span>
                <span>{ textItem }</span>
              </div>
            </>
          ))}
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        123
      </Popup>
    </>
  );
};

export default Card;
