import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

// Style
import styles from '../../styles/common/Popup.module.scss';

// Interface
import { IProps } from '../../src/interfaces/I_Global';

interface IPopupModal extends IProps {
  show: boolean;
  onClose: () => void;
}

const PopupModalComponent: React.FC<IPopupModal> = ({ children, show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (show === true) {
      document.documentElement.classList.add('is-overflow-fixed');
    } else {
      document.documentElement.classList.remove('is-overflow-fixed');
    }
  }, [show]);

  const handleClosePopup = (e: { preventDefault: () => void; }) => {
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
      <div ref={nodeRef} className={styles['popup-desktop']}>
        <div className={styles.popup__wrapper}>
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

export default PopupModalComponent;
