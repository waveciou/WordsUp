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
import { RootState } from '@/Store/index';

declare global {
  interface Window {
    gapi: any;
  }
}

const Layout: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGetData = useGetSheetData();

  const { isAppMounted, isMenuOpen } = useSelector((state: RootState) => state.common);

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
        <main id="__main" className="tw-pt-header-height">{ children }</main>
        <div
          aria-hidden="true"
          onClick={() => dispatch(setIsMenuOpen(false))}
          className={`tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-0 tw-z-4000 tw-bg-black/70 tw-transition-opacity ${isMenuOpen ? 'tw-opacity-100 tw-visible tw-pointer-events-auto' : 'tw-opacity-0 tw-invisible tw-pointer-events-none'}`}
        />
        <Menu />
      </div>
      <Loader />
    </>
  );
};

export default Layout;
