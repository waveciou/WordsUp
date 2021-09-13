import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Component
import Meta from '../common/Meta';
import Menu from '../common/Menu';
import Header from '../common/Header';
import Loader from '../common/Loader';

// Style
import styles from '../../styles/common/Layout.module.scss';

// Redux
import { RootState } from '../../store';
import { setScreenWidth } from '../../store/slice/screenWidthSlice';
import { setScrollValue } from '../../store/slice/scrollValueSlice';
import { setMenuControl } from '../../store/slice/menuControlSlice';

// Functions
import loadGapiScrpit from '../../src/functions/googleSheetAPI/loadAPIScrpit';
import HandleGetGoogleSheetData from '../../src/functions/handleGetGoogleSheetData';

// Interface
import { IProps } from '../../src/interfaces/I_Global';

declare global {
  interface Window {
    gapi: any;
  }
}

const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const menuIsOpen = useSelector((state: RootState) => state.menuControl.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = HandleGetGoogleSheetData();

  // 取得瀏覽器寬度
  const handleGetScreenWidth = useCallback(() => {
    const value: number = window.innerWidth;
    dispatch(setScreenWidth(value));
  }, [dispatch]);

  // 取得 Scroll Value
  const handleGetScrollValue = useCallback(() => {
    const value: number = window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop;
    dispatch(setScrollValue(value));
  }, [dispatch]);

  const handleGetLayoutScrollValue = useCallback((e) => {
    const value: number = e.target.scrollTop;
    dispatch(setScrollValue(value));
  }, [dispatch]);

  useEffect(() => {
    // 載入 Google Sheet API
    loadGapiScrpit(() => {
      window.gapi.load('client:auth2', handleGetData);
    });

    window.addEventListener('resize', handleGetScreenWidth);
    window.addEventListener('scroll', handleGetScrollValue);
    handleGetScreenWidth();
    handleGetScrollValue();

    return () => {
      window.removeEventListener('resize', handleGetScreenWidth);
      window.removeEventListener('scroll', handleGetScrollValue);
    };
  }, [dispatch, handleGetData, handleGetScreenWidth, handleGetScrollValue]);

  useEffect(() => {
    dispatch(setMenuControl(false));
  }, [dispatch, router]);

  useEffect(() => {
    if (menuIsOpen === true) {
      document.documentElement.classList.add('is-fixed');
    } else {
      document.documentElement.classList.remove('is-fixed');
    }
  }, [menuIsOpen]);

  const ClassHandleOverlay = () => `${styles.overlay} ${menuIsOpen === true ? styles['is-active'] : ''}`;

  return (
    <>
      <Meta />
      <div id="__layout" onScroll={handleGetLayoutScrollValue}>
        <Header />
        <main className={styles.main}>{ children }</main>
        <div
          onClick={() => { dispatch(setMenuControl(false)); }}
          aria-hidden="true"
          className={ClassHandleOverlay()}
        />
        <Menu />
      </div>
      <Loader />
    </>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutComponent;
