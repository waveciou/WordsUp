import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import styles from '@/Styles/popup.module.scss';

interface IPopupProps {
  children: React.ReactNode,
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<IPopupProps> = ({ children, show, onClose }) => {
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

  const handleClosePopup = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

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
        className={styles['popup-desktop']}
        aria-hidden="true"
        onClick={handleClosePopup}
      >
        <div
          className={styles.popup__wrapper}
          aria-hidden="true"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <button
            type="button"
            aria-label="close-popup"
            className={styles['popup__close-btn']}
            onClick={handleClosePopup}
          >
            <span />
            <span />
          </button>
          <div className={styles.popup__content}>
            { children }
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  if (isBrowser === true) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root-popup')!,
    );
  }
  return null;
};

export default Popup;
