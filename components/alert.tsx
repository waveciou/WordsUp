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
}

const Alert: React.FC<IAlertModalProps> = ({
  show,
  title,
  content = '',
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
        className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-fixed tw-top-0 tw-left-0 tw-z-6000 tw-bg-black/90"
      >
        <div className="tw-w-72 tw-relative tw-overflow-hidden tw-rounded-lg tw-bg-white">
          <div className="tw-p-4 tw-text-center">
            <div className="tw-text-sm tw-leading-7 tw-mb-2">{ title }</div>
            <div className="tw-text-xxs tw-leading-5">{ content }</div>
          </div>
          <div className="tw-flex tw-border-t tw-border-gray tw-border-solid">
            <button
              type="button"
              className="tw-px-1 tw-py-2 tw-grow tw-text-sm"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            {
              cancelText && onCancel
              && (
                <button
                  type="button"
                  className="tw-px-1 tw-py-2 tw-grow tw-text-sm tw-border-l tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-border-gray tw-border-solid"
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
              )
            }
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

export default Alert;
