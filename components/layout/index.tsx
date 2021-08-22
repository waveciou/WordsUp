import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Component
import Meta from '../common/Meta';
import Menu from '../common/Menu';
import Header from '../common/Header';
import Loader from '../common/Loader';

// Style
import styles from '../../styles/modules/Layout.module.scss';

// Redux
import { RootState } from '../../store';
import { setScreenWidth } from '../../store/slice/screenWidthSlice';
import { setMenuControl } from '../../store/slice/menuControlSlice';
import { setLoaderControl } from '../../store/slice/loaderControlSlice';
import { setWordsCollection } from '../../store/slice/wordsCollectionSlice';

// Functions
import loadGapiScrpit from '../../functions/googleSheetAPI/loadAPIScrpit';
import initGapiClient from '../../functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '../../functions/googleSheetAPI/makeAPICallback';
import handleGetSheetData from '../../functions/handleGetSheetData';

interface IProps {
  children?: React.ReactNode
}

declare global {
  interface Window {
    gapi: any;
  }
}

const LayoutComponent: React.FC = ({ children }: IProps) => {
  const menuIsOpen = useSelector((state: RootState) => state.menuControl.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // 載入 Google Sheet API
    loadGapiScrpit(() => {
      window.gapi.load('client:auth2', initGapiClient((SHEET_ID) => {
        makeGapiCallback(SHEET_ID).then(async (response: any) => {
          const sheetData = handleGetSheetData(response);
          await dispatch(setWordsCollection(sheetData));
          await dispatch(setLoaderControl(false));
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      }));
    });

    // 取得瀏覽器寬度
    const handleGetScreenWidth = () => {
      const value: number = window.innerWidth;
      dispatch(setScreenWidth(value));
    };

    window.addEventListener('resize', handleGetScreenWidth);
    handleGetScreenWidth();
    return () => {
      window.removeEventListener('resize', handleGetScreenWidth);
    };
  }, [dispatch]);

  const classHandleOverlay = () => `${styles.overlay} ${menuIsOpen === true ? styles['is-active'] : ''}`;

  return (
    <>
      <Meta />
      <div id="__layout">
        <Header />
        <main className="main">{ children }</main>
        <div
          onClick={() => { dispatch(setMenuControl(false)); }}
          aria-hidden="true"
          className={classHandleOverlay()}
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
