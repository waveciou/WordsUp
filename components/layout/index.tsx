import * as React from 'react';
import { useEffect } from 'react';
import Meta from '../Meta';
import styles from '../styles/modules/Layout.module.scss';

// Redux
import { useDispatch } from 'react-redux';
import { setScreenWidth } from '../../store/slice/screenWidthSlice';

interface IProps {
  children?: React.ReactNode
};

const LayoutComponent: React.FC = ({ children }: IProps) => {
  const dispatch = useDispatch();

  // 取得瀏覽器寬度
  const handleGetScreenWidth = () => {
    const value = window.innerWidth;
    dispatch(setScreenWidth(value));
  };

  useEffect(() => {
    window.addEventListener('resize', handleGetScreenWidth);
    handleGetScreenWidth();
    return () => {
      window.removeEventListener('resize', handleGetScreenWidth);
    }
  }, []);

  return (
    <>
      <Meta />
      <main className="__layout">
        { children }
      </main>
    </>
  );
};

export default LayoutComponent;