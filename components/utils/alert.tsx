import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IAlertModalProps {
  show: boolean;
  title: string;
  content?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  theme?: '' | 'warn';
}

const Alert: React.FC<IAlertModalProps> = ({
  show,
  title,
  content = '',
  confirmText,
  cancelText,
  onConfirm = () => {},
  onCancel = () => {},
  theme = '',
}) => {
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
        className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-6000 bg-black/90"
      >
        <div className="w-72 relative overflow-hidden rounded-lg bg-white">
          <div className="p-4 text-center">
            <div className="text-sm leading-7 mb-2">{title}</div>
            {theme === '' && (
              <div className="text-xxs leading-5">{content}</div>
            )}
            {theme === 'warn' && content !== '' && (
              <div className="flex items-center justify-center text-xxs leading-5 text-red before-font-material before:content-['\e002'] before:block before:mr-1">
                {content}
              </div>
            )}
          </div>
          <div className="flex border-t border-gray border-solid">
            <button
              type="button"
              className="px-1 py-2 grow text-sm"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            {cancelText && onCancel && (
              <button
                type="button"
                className="px-1 py-2 grow text-sm border-l border-t-0 border-r-0 border-b-0 border-gray border-solid"
                onClick={onCancel}
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  if (isBrowser === true) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root-alert')!
    );
  }
  return null;
};

export default Alert;
