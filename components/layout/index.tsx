import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/Components/common/Header';
import Loader from '@/Components/common/Loader';
import Menu from '@/Components/common/Menu';
import Meta from '@/Components/common/Meta';
import HandleGetGoogleSheetData from '@/Functions/getGoogleSheetData';
import loadGapiScrpit from '@/Functions/googleSheetAPI/loadAPIScrpit';
import { getItemWithObject, removeItem, setItemWithObject } from '@/Functions/localStorage';
import { IProps } from '@/Interfaces/I_Global';
import { setIsMounted } from '@/Slice/isMountedSlice';
import { setLoaderControl } from '@/Slice/loaderControlSlice';
import { setMenuControl } from '@/Slice/menuControlSlice';
import { setScreenWidth } from '@/Slice/screenWidthSlice';
import { setScrollValue } from '@/Slice/scrollValueSlice';
import { setSettingsOption } from '@/Slice/settingsOptionSlice';
import { setWordsCollection } from '@/Slice/wordsCollectionSlice';
import { RootState } from '@/Store/index';
import styles from '@/Styles/common/Layout.module.scss';

declare global {
  interface Window {
    gapi: any;
  }
}

const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const SETTINGS_OPTION = useSelector((state: RootState) => state.settingsOption.value);
  const MENU_IS_OPEN = useSelector((state: RootState) => state.menuControl.value);
  const IS_MOUNTED = useSelector((state: RootState) => state.isMounted.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = HandleGetGoogleSheetData();

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

  // Get LocalStorage Data
  const handleGetLocalStorageData = useCallback(async () => {
    const options = getItemWithObject('settingsOption');
    if ((typeof options === 'object') && (options instanceof Array === false)) {
      await dispatch(setSettingsOption(options));
    }
    dispatch(setIsMounted(true));
  }, [dispatch]);

  // Set initialization settings option
  useEffect(() => {
    handleGetLocalStorageData();
  }, [handleGetLocalStorageData]);

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
    dispatch(setMenuControl(false));
  }, [dispatch, router]);

  // Layout fixed when menu opening
  useEffect(() => {
    if (MENU_IS_OPEN === true) {
      document.documentElement.classList.add('is-fixed');
    } else {
      document.documentElement.classList.remove('is-fixed');
    }
  }, [MENU_IS_OPEN]);

  // Set settings option in localStorage
  useEffect(() => {
    const { saveOption } = SETTINGS_OPTION;
    if (saveOption === true) {
      setItemWithObject('settingsOption', SETTINGS_OPTION);
    } else {
      removeItem('settingsOption');
    }
  }, [SETTINGS_OPTION]);

  useEffect(() => {
    if (IS_MOUNTED === true) {
      const { updateInstall } = SETTINGS_OPTION;
      const wordsCollection: any = getItemWithObject('wordsCollection');

      // 載入 Google Sheet API
      loadGapiScrpit(() => {
        window.gapi.load('client:auth2', () => {
          if (updateInstall === false && Array.isArray(wordsCollection) === true) {
            (async () => {
              await dispatch(setWordsCollection(wordsCollection));
              await dispatch(setLoaderControl(false));
            })();
          } else {
            handleGetData();
          }
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IS_MOUNTED]);

  const ClassHandleOverlay = () => `${styles.overlay} ${MENU_IS_OPEN === true ? styles['is-active'] : ''}`;

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
