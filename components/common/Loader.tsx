import * as React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// Style
import styles from '../../styles/common/Loader.module.scss';

// Redux
import { RootState } from '../../store';

const LoaderComponent: React.FC = () => {
  const LOADER_IS_OPEN = useSelector((state: RootState) => state.loaderControl.value);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={LOADER_IS_OPEN}
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

export default LoaderComponent;
