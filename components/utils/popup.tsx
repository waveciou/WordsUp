import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IPopupProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<IPopupProps> = ({ children, show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsBrowser(true);
    return () => {
      document.documentElement.classList.remove('is-fixed');
    };
  }, []);

  useEffect(() => {
    if (show === true) {
      document.documentElement.classList.add('is-fixed');
    } else {
      document.documentElement.classList.remove('is-fixed');
    }
  }, [show]);

  const handleClosePopup = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
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
        className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-5000 bg-black/90"
        aria-hidden="true"
        onClick={handleClosePopup}
      >
        <div
          className="max-w-670 w-[calc(100%-20px)] min-h-300 max-h-[calc(100%-20px)] py-8 px-4 relative overflow-hidden rounded-lg bg-white desktop:px-5"
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            type="button"
            aria-label="close-popup"
            className="w-5 h-5 absolute overflow-hidden top-2.5 right-2.5 flex items-center justify-center text-center before-font-material before:content-['\e5cd'] before:w-6 before:h-6 before:leading-6 before:block before:m-auto before:text-black"
            onClick={handleClosePopup}
          />
          <div className="w-full h-full max-h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  if (isBrowser === true) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root-popup')!
    );
  }
  return null;
};

export default Popup;
