import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@/Components/alert';
import { IRouteItem } from '@/Interfaces/global';
import { setIsMenuOpen } from '@/Slice/common';
import { RootState } from '@/Store/index';
import styles from '@/Styles/menu.module.scss';

const ROUTE = require('../src/data/route.json');

const Menu: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.common);
  const { isExamTesting, examGuardAlert } = useSelector((state: RootState) => state.exam);
  const [routeList, setRouteList] = useState<IRouteItem[]>([]);
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] = useState<boolean>(false);
  const [pathTarget, setPathTarget] = useState<string>('');

  useEffect(() => {
    const { route } = ROUTE;
    setRouteList(route);
  }, []);

  useEffect(() => {
    if (isShowExamGuardAlert === false) {
      setPathTarget('');
    }
  }, [isShowExamGuardAlert]);

  const routeListMemo = useMemo(() => {
    const ClassHandle = (path: string, id: string): string => {
      const routePath: string = `/${router.pathname.split('/')[1]}`;
      const isCurrent: boolean = !!(routePath === path);
      return `
        ${styles.item}
        ${styles[`icon-${id}`]}
        ${isCurrent ? styles.current : ''}
      `;
    };

    return routeList.map((route: IRouteItem) => {
      const { id, path, name } = route;
      return (
        <li key={id} className="tw-px-4 tw-mb-2.5">
          <button
            type="button"
            className={ClassHandle(path, id)}
            onClick={() => {
              if (isExamTesting) {
                setPathTarget(path);
                setIsShowExamGuardAlert(true);
              } else {
                router.push(path);
              }
            }}
          >
            {name}
          </button>
        </li>
      );
    });
  }, [routeList, router, isExamTesting]);

  const handlePushRoute = useCallback(() => {
    const path: string = pathTarget !== '' ? pathTarget : '/';
    router.push(path);
    setIsShowExamGuardAlert(false);
  }, [pathTarget]);

  return (
    <>
      <nav
        className={`tw-w-menu-width tw-min-w-140 tw-max-w-400 tw-h-full tw-flex tw-fixed tw-top-0 tw-right-0 tw-bg-white tw-z-4500 tw-transition-transform tw-duration-300 tw-translate-x-full tw-flex-col ${isMenuOpen === true ? 'tw-translate-x-0' : ''}`}
      >
        <div className="tw-flex tw-items-start tw-justify-end tw-basis-12">
          <button
            type="button"
            aria-label="close-menu"
            className="tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-text-center before-font-material before:tw-content-['\e5cd'] before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-text-black"
            onClick={() => dispatch(setIsMenuOpen(false))}
          />
        </div>
        <div className="tw-relative tw-overflow-hidden tw-grow">
          <div className="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-overflow-x-hidden tw-overflow-y-auto">
            <ul>
              { routeListMemo }
            </ul>
          </div>
        </div>
      </nav>
      <Alert
        show={isShowExamGuardAlert}
        title={examGuardAlert.title}
        content={examGuardAlert.content}
        confirmText="確定"
        cancelText="取消"
        onConfirm={handlePushRoute}
        onCancel={() => {
          setIsShowExamGuardAlert(false);
          dispatch(setIsMenuOpen(false));
        }}
        theme="warn"
      />
    </>
  );
};

export default Menu;
