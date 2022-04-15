import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/Store/index';

const useScrollToTop = () => {
  const { screenWidth } = useSelector((state: RootState) => state.common);

  return useCallback(() => {
    if (screenWidth > 1024) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      const element: Element | null = document.getElementById('__layout');

      if (element !== null) {
        element.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [screenWidth]);
};

export default useScrollToTop;
