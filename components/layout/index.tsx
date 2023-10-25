import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { createStore, get } from 'idb-keyval';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/Components/utils/header';
import Loader from '@/Components/utils/loader';
import Menu from '@/Components/utils/menu';
import Meta from '@/Components/utils/meta';
import debounce from '@/Functions/debounce';
import loadGapiScrpit from '@/Functions/googleSheetAPI/loadAPIScrpit';
import useGetSheetData from '@/Hooks/useGetSheetData';
import useScrollToTop from '@/Hooks/useScrollToTop';
import useSetDailyCase from '@/Hooks/useSetDailyCase';
import useSetDailyWords from '@/Hooks/useSetDailyWords';
import useSetDate from '@/Hooks/useSetDate';
import useSetFavorate from '@/Hooks/useSetFavorate';
import useSetRecord from '@/Hooks/useSetRecord';
import { IRecordItem } from '@/Interfaces/exam';
import { IProps } from '@/Interfaces/global';
import { IDailyCase } from '@/Interfaces/word';
import {
  setIsAppMounted,
  setIsMenuOpen,
  setScreenWidth,
  setScrollValue,
} from '@/Slice/common';
import { RootState } from '@/Store/index';

declare global {
  interface Window {
    gapi: any;
  }
}

const Layout: React.FC<IProps> = ({ children }) => {
  dayjs.extend(utc);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = useGetSheetData();
  const handleScrollToTop = useScrollToTop();
  const handleSetDate = useSetDate();
  const handleSetDailyCase = useSetDailyCase();
  const handleSetDailyWords = useSetDailyWords();
  const handleSetFavorate = useSetFavorate();
  const handleSetRecord = useSetRecord();

  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { isAppMounted, isMenuOpen, scrollValue } = useSelector(
    (state: RootState) => state.common
  );
  const { dateId } = useSelector((state: RootState) => state.daily);

  // Get browser screen width
  const handleGetScreenWidth = useCallback(() => {
    const value: number = window.innerWidth;
    dispatch(setScreenWidth(value));
  }, [dispatch]);

  // Get Scroll Value (Desktop, >= 1025)
  const handleGetScrollValue = useCallback(() => {
    const value: number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    dispatch(setScrollValue(value));
  }, [dispatch]);

  // Get Scroll Value (Tablet, Mobile, <= 1024)
  const handleGetLayoutScrollValue = useCallback(
    (e: any) => {
      const value: number = e.target.scrollTop;
      dispatch(setScrollValue(value));
    },
    [dispatch]
  );

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
    handleScrollToTop();
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

  // Get date and set date caption
  useEffect(() => {
    handleSetDate();
  }, []);

  useEffect(() => {
    if (!!dateId && WORDS_DATA.length > 10) {
      const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

      get('daily', wordsUpStore).then((value) => {
        const dailyCase: IDailyCase = handleSetDailyCase(dateId, value);
        handleSetDailyWords(dailyCase);
      });
    }
  }, [dateId, WORDS_DATA]);

  // Get record and set record collection
  useEffect(() => {
    if (WORDS_DATA.length) {
      const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

      get('record', wordsUpStore).then((value) => {
        const localData: IRecordItem[] = value || [];
        handleSetRecord(localData);
      });
    }
  }, [WORDS_DATA]);

  // Get local data and set favorate words
  useEffect(() => {
    if (WORDS_DATA.length) {
      const wordsUpStore = createStore('wordsUpDB', 'wordsUpStore');

      get('favorite', wordsUpStore).then((value) => {
        const localData: string[] = value || [];

        if (Array.isArray(localData) && localData.length > 0) {
          handleSetFavorate(localData);
        }
      });
    }
  }, [WORDS_DATA]);

  // Import Google Sheet API
  useEffect(() => {
    if (isAppMounted) {
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
        <main id="__main" className="pt-header-height">
          {children}
        </main>
        {scrollValue > 0 && (
          <button
            type="button"
            aria-label="scroll-to-top-button"
            className="w-10 h-10 block fixed right-5 bottom-12 bg-green-dark/60 rounded-full before-font-material before:content-['\e5d8'] before:leading-10 before:text-yellow"
            onClick={handleScrollToTop}
          />
        )}
        <div
          aria-hidden="true"
          onClick={() => dispatch(setIsMenuOpen(false))}
          className={`w-full h-full fixed top-0 left-0 z-4000 bg-black/70 transition-opacity ${
            isMenuOpen
              ? 'opacity-100 visible pointer-events-auto'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        />
        <Menu />
      </div>
      <Loader />
    </>
  );
};

export default Layout;
