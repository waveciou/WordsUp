import * as React from 'react';
import styles from '../styles/components/CollectedList.module.scss';

interface IWordItem {
  word: IWordCase;
}

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const { part, english, chinese } = word;
  return (
    <div className={styles.collectedCard}>
      <div className={styles.collectedCard__title}>{ english }</div>
      <div className={styles.collectedCard__subtitle}>
        <span className={styles.collectedCard__part}>{ part }</span>
        <span>{ chinese }</span>
      </div>
    </div>
  );
};

export default CollectedCard;
