/* eslint-disable object-curly-newline */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/Components/header';
import Loader from '@/Components/loader';
import Menu from '@/Components/menu';
import Meta from '@/Components/meta';
import debounce from '@/Functions/debounce';
import loadGapiScrpit from '@/Functions/googleSheetAPI/loadAPIScrpit';
import useGetSheetData from '@/Hook/useGetSheetData';
import { IProps } from '@/Interfaces/global';
import { setIsAppMounted, setIsMenuOpen, setScreenWidth, setScrollValue } from '@/Slice/common';
import { setQuestions } from '@/Slice/examination';
import { RootState } from '@/Store/index';
import styles from '@/Styles/layout.module.scss';

declare global {
  interface Window {
    gapi: any;
  }
}

const Layout: React.FC<IProps> = ({ children }) => {
  const { isAppMounted, isMenuOpen } = useSelector((state: RootState) => state.common);
  const { isExamTesting } = useSelector((state: RootState) => state.examination);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = useGetSheetData();

  // Get browser screen width
  const handleGetScreenWidth = useCallback(() => {
    const value: number = window.innerWidth;
    dispatch(setScreenWidth(value));
  }, [dispatch]);

  // Get Scroll Value (>= 1025)
  const handleGetScrollValue = useCallback(() => {
    const value: number = window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop;
    dispatch(setScrollValue(value));
  }, [dispatch]);

  // Get Scroll Value (<= 1024)
  const handleGetLayoutScrollValue = useCallback((e) => {
    const value: number = e.target.scrollTop;
    dispatch(setScrollValue(value));
  }, [dispatch]);

  // // Get LocalStorage Data
  // const handleGetLocalStorageData = useCallback(async () => {
  //   const options = getItemWithObject('settingsOption');
  //   if ((typeof options === 'object') && (options instanceof Array === false)) {
  //     await dispatch(setSettingsOption(options));
  //   }
  //   dispatch(setIsMounted(true));
  // }, [dispatch]);

  // // Set initialization settings option
  // useEffect(() => {
  //   handleGetLocalStorageData();
  // }, [handleGetLocalStorageData]);

  useEffect(() => {
    dispatch(setIsAppMounted(true));
  }, [dispatch]);

  // Get initialization data flow
  useEffect(() => {
    const handleResize = debounce(() => handleGetScreenWidth(), 400);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleGetScrollValue);
    handleGetScreenWidth();
    handleGetScrollValue();

    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleGetScrollValue);
    };
  }, [dispatch, handleGetScreenWidth, handleGetScrollValue]);

  // Close menu when router change
  useEffect(() => {
    dispatch(setIsMenuOpen(false));
  }, [dispatch, router]);

  // Layout fixed when menu opening
  useEffect(() => {
    if (isMenuOpen === true) {
      document.documentElement.classList.add('is-fixed');
    } else {
      document.documentElement.classList.remove('is-fixed');
    }
  }, [isMenuOpen]);

  // If it's not testing, it will clear question items.
  useEffect(() => {
    if (isExamTesting === false) {
      dispatch(setQuestions([]));
    }
  }, [dispatch, isExamTesting]);

  // Set settings option in localStorage
  // useEffect(() => {
  //   const { saveOption } = SETTINGS_OPTION;
  //   if (saveOption === true) {
  //     setItemWithObject('settingsOption', SETTINGS_OPTION);
  //   } else {
  //     removeItem('settingsOption');
  //   }
  // }, [SETTINGS_OPTION]);

  useEffect(() => {
    if (isAppMounted) {
      // 載入 Google Sheet API
      loadGapiScrpit(() => {
        window.gapi.load('client:auth2', () => {
          handleGetData();
        });
      });
    }
  }, [handleGetData, isAppMounted]);

  return (
    <>
      <Meta />
      <div id="__layout" onScroll={handleGetLayoutScrollValue}>
        <Header />
        <main className={styles.main}>{ children }</main>
        <div
          aria-hidden="true"
          onClick={() => { dispatch(setIsMenuOpen(false)); }}
          className={`${styles.overlay} ${isMenuOpen ? styles['is-active'] : ''}`}
        />
        <Menu />
      </div>
      <Loader />
    </>
  );
};

export default Layout;
