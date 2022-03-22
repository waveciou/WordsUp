import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '@/Store/index';
import styles from '@/Styles/common/Loader.module.scss';

const Loader: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.common);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={isLoading}
      timeout={400}
      classNames="fade"
      nodeRef={nodeRef}
      unmountOnExit
      appear
    >
      <div ref={nodeRef} className={styles['loader-desktop']}>
        <div className={styles.loader__container}>
          <div className={styles.loader__bouncing}>
            <span />
            <span />
            <span />
          </div>
          <strong className={styles.loader__captain}>資料載入中</strong>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Loader;
