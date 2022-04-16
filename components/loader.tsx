import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '@/Store/index';

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
      <div ref={nodeRef} className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-fixed tw-top-0 tw-left-0 tw-bg-green tw-z-7000">
        <div>
          <div className="tw-flex tw-items-center tw-justify-center">
            <span className="bouncing-animation tw-w-4 tw-h-4 tw-block tw-my-12 tw-mx-1 tw-bg-yellow tw-rounded-full" />
            <span className="bouncing-animation bouncing-animation_delay-2 tw-w-4 tw-h-4 tw-block tw-my-12 tw-mx-1 tw-bg-yellow tw-rounded-full" />
            <span className="bouncing-animation bouncing-animation_delay-4 tw-w-4 tw-h-4 tw-block tw-my-12 tw-mx-1 tw-bg-yellow tw-rounded-full" />
          </div>
          <strong className="tw-block tw-font-normal tw-text-center tw-text-white">資料載入中</strong>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Loader;
