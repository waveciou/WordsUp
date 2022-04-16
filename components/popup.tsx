import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

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
        className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-fixed tw-top-0 tw-left-0 tw-z-5000 tw-bg-black/90"
        aria-hidden="true"
        onClick={handleClosePopup}
      >
        <div
          className="tw-w-[calc(100%-20px)] tw-max-w-2xl tw-min-h-300 tw-max-h-[calc(100%-20px)] tw-py-8 tw-px-4 tw-relative tw-overflow-hidden tw-rounded-lg tw-bg-white desktop:tw-px-5"
          aria-hidden="true"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <button
            type="button"
            aria-label="close-popup"
            className="tw-w-5 tw-h-5 tw-absolute tw-overflow-hidden tw-top-2.5 tw-right-2.5"
            onClick={handleClosePopup}
          >
            <span className="tw-w-0.5 tw-h-5 tw-ml-2 tw-block tw-absolute tw-top-0 tw-bg-gray tw-rotate-45" />
            <span className="tw-w-0.5 tw-h-5 tw-ml-2 tw-block tw-absolute tw-top-0 tw-bg-gray tw--rotate-45" />
          </button>
          <div className="tw-w-full tw-h-full tw-overflow-x-hidden tw-overflow-y-auto">
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
