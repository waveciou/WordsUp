import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
import { IProps } from '@/Interfaces/global';
import { IDailyCase } from '@/Interfaces/word';
import { setIsAppMounted, setIsMenuOpen, setScreenWidth, setScrollValue } from '@/Slice/common';
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
    (e) => {
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
      const localData: string = localStorage.getItem('daily') || '';
      const dailyCase: IDailyCase = handleSetDailyCase(dateId, localData);
      handleSetDailyWords(dailyCase);
    }
  }, [dateId, WORDS_DATA]);

  // Get record and set record collection
  useEffect(() => {
    if (WORDS_DATA.length) {
      const localData: string = localStorage.getItem('record') || '';
      handleSetRecord(localData);
    }
  }, [WORDS_DATA]);

  // Get local data and set favorate words
  useEffect(() => {
    if (WORDS_DATA.length) {
      const localData: string = localStorage.getItem('favorite') || '[]';
      const parseData: string[] = JSON.parse(localData);

      if (Array.isArray(parseData) && parseData.length > 0) {
        handleSetFavorate(parseData);
      }
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
        <main id="__main" className="tw-pt-header-height">
          {children}
        </main>
        {scrollValue > 0 && (
          <button
            type="button"
            aria-label="scroll-to-top-button"
            className="tw-w-10 tw-h-10 tw-block tw-fixed tw-right-5 tw-bottom-12 tw-bg-green-dark/60 tw-rounded-full before-font-material before:tw-content-['\e5d8'] before:tw-leading-10 before:tw-text-yellow"
            onClick={handleScrollToTop}
          />
        )}
        <div
          aria-hidden="true"
          onClick={() => dispatch(setIsMenuOpen(false))}
          className={`tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-0 tw-z-4000 tw-bg-black/70 tw-transition-opacity ${
            isMenuOpen
              ? 'tw-opacity-100 tw-visible tw-pointer-events-auto'
              : 'tw-opacity-0 tw-invisible tw-pointer-events-none'
          }`}
        />
        <Menu />
      </div>
      <Loader />
    </>
  );
};

export default Layout;
