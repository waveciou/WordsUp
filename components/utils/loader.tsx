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
      <div
        ref={nodeRef}
        className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-green z-7000"
      >
        <div>
          <div className="flex items-center justify-center">
            <span className="bouncing-animation w-4 h-4 block my-12 mx-1 bg-yellow rounded-full" />
            <span className="bouncing-animation bouncing-animation_delay-2 w-4 h-4 block my-12 mx-1 bg-yellow rounded-full" />
            <span className="bouncing-animation bouncing-animation_delay-4 w-4 h-4 block my-12 mx-1 bg-yellow rounded-full" />
          </div>
          <strong className="block font-normal text-center text-white">
            資料載入中
          </strong>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Loader;
