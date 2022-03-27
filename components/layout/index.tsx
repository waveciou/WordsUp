/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/Components/header';
import Loader from '@/Components/loader';
import Menu from '@/Components/menu';
import Meta from '@/Components/meta';
import loadGapiScrpit from '@/Functions/googleSheetAPI/loadAPIScrpit';
import useGetSheetData from '@/Hook/useGetSheetData';
import { IProps } from '@/Interfaces/global';
import { setIsMenuOpen, setIsMounted, setScreenWidth, setScrollValue } from '@/Slice/common';
import { RootState } from '@/Store/index';
import styles from '@/Styles/layout.module.scss';

declare global {
  interface Window {
    gapi: any;
  }
}

const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const { isMounted, isMenuOpen } = useSelector((state: RootState) => state.common);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = useGetSheetData();

  // Get browser screen width
  const handleGetScreenWidth = useCallback(() => {
    const value: number = window.innerWidth;
    dispatch(setScreenWidth(value));
  }, [dispatch]);

  // Get Scroll Value
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
    dispatch(setIsMounted(true));
  }, [dispatch]);

  // Get initialization data flow
  useEffect(() => {
    window.addEventListener('resize', handleGetScreenWidth);
    window.addEventListener('scroll', handleGetScrollValue);
    handleGetScreenWidth();
    handleGetScrollValue();

    return () => {
      window.removeEventListener('resize', handleGetScreenWidth);
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
    if (isMounted) {
      // 載入 Google Sheet API
      loadGapiScrpit(() => {
        window.gapi.load('client:auth2', () => {
          handleGetData();
        });
      });
    }
  }, [isMounted]);

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

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutComponent;
