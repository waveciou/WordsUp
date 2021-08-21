import * as React from 'react';
import styles from '../../styles/modules/Loader.module.scss';

const LoaderComponent: React.FC = () => (
  <div className={styles['loader-desktop']}>
    <div className={styles.loader__container}>
      <div className={styles.loader__bouncing}>
        <div />
        <div />
        <div />
      </div>
      <strong className={styles.loader__captain}>資料載入中</strong>
    </div>
  </div>
);

export default LoaderComponent;
