import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Meta from '../Meta';
// import styles from '../styles/modules/Layout.module.scss';

// Redux
import { setScreenWidth } from '../../store/slice/screenWidthSlice';

interface IProps {
  children?: React.ReactNode
}

const LayoutComponent: React.FC = ({ children }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 取得瀏覽器寬度
    const handleGetScreenWidth = () => {
      const value = window.innerWidth;
      dispatch(setScreenWidth(value));
    };

    window.addEventListener('resize', handleGetScreenWidth);
    handleGetScreenWidth();
    return () => {
      window.removeEventListener('resize', handleGetScreenWidth);
    };
  }, [dispatch]);

  return (
    <>
      <Meta />
      <main className="__layout">
        { children }
      </main>
    </>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutComponent;
