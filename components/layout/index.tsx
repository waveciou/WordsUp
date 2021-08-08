import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Component
import Meta from '../common/Meta';
import Menu from '../common/Menu';

// Style
import styles from '../../styles/modules/Layout.module.scss';

// Redux
import { RootState } from '../../store';
import { setScreenWidth } from '../../store/slice/screenWidthSlice';
import { setMenuControl } from '../../store/slice/menuControlSlice';

interface IProps {
  children?: React.ReactNode
}

const LayoutComponent: React.FC = ({ children }: IProps) => {
  const menuIsOpen = useSelector((state: RootState) => state.menuControl.value);
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

  const classHandleOverlay = () => `${styles.overlay} ${menuIsOpen === true ? styles['is-active'] : null}`;

  return (
    <>
      <Meta />
      <div id="__layout">
        <main className="main">{ children }</main>
        <div
          onClick={() => { dispatch(setMenuControl(false)); }}
          aria-hidden="true"
          className={classHandleOverlay()}
        />
        <Menu />
      </div>
    </>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutComponent;
