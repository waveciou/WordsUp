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
import { setSettingsOption } from '../../store/slice/settingsOptionSlice';
import { setIsMounted } from '../../store/slice/isMountedSlice';
import { setLoaderControl } from '../../store/slice/loaderControlSlice';
import { setWordsCollection } from '../../store/slice/wordsCollectionSlice';

// Functions
import loadGapiScrpit from '../../src/functions/googleSheetAPI/loadAPIScrpit';
import HandleGetGoogleSheetData from '../../src/functions/handleGetGoogleSheetData';
import {
  getItemWithObject,
  setItemWithObject,
  removeItem,
} from '../../src/functions/handleLocalStorage';

// Interface
import { IProps } from '../../src/interfaces/I_Global';

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
