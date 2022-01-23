import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import styles from '@/Styles/common/Alert.module.scss';

interface IAlertModal {
  show: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const AlertModalComponent: React.FC<IAlertModal> = ({
  show,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (show === true) {
      document.documentElement.classList.add('is-fixed');
    } else {
      document.documentElement.classList.remove('is-fixed');
    }
  }, [show]);

  const modalContent = (
    <CSSTransition
      in={show}
      timeout={400}
      classNames="fade"
      nodeRef={nodeRef}
      unmountOnExit
      appear
    >
      <div
        ref={nodeRef}
        className={styles['alert-desktop']}
      >
        <div className={styles.alert__wrapper}>
          <div className={styles.alert__container}>
            <div className={styles.alert__title}>{ title }</div>
            <div className={styles.alert__content}>{ content }</div>
          </div>
          <div className={styles.alert__footer}>
            {
              cancelText && onCancel
              && (<button type="button" onClick={onCancel}>{cancelText}</button>)
            }
            <button type="button" onClick={onConfirm}>{confirmText}</button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  if (isBrowser === true) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root-alert')!,
    );
  }
  return null;
};

export default AlertModalComponent;
