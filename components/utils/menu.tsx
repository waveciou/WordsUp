import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@/Components/utils/alert';
import { IRouteItem } from '@/Interfaces/global';
import { setIsMenuOpen } from '@/Slice/common';
import { RootState } from '@/Store/index';

const ROUTE = require('../../src/data/route.json');

const Menu: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.common);
  const { isExamTesting, examGuardAlert } = useSelector(
    (state: RootState) => state.exam
  );
  const [routeList, setRouteList] = useState<IRouteItem[]>([]);
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] =
    useState<boolean>(false);
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
        menu__item
        ${`icon-${id}`}
        ${isCurrent ? 'current' : ''}
      `;
    };

    return routeList.map((route: IRouteItem) => {
      const { id, path, name } = route;
      return (
        <li key={id} className="px-4 mb-2.5">
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
        className={`w-menu-width min-w-140 max-w-400 h-full flex fixed top-0 right-0 bg-white z-4500 transition-transform duration-300 flex-col ${
          isMenuOpen === true ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-start justify-end basis-12">
          <button
            type="button"
            aria-label="close-menu"
            className="w-12 h-12 flex items-center justify-center text-center before-font-material before:content-['\e5cd'] before:w-6 before:h-6 before:leading-6 before:block before:m-auto before:text-black"
            onClick={() => dispatch(setIsMenuOpen(false))}
          />
        </div>
        <div className="relative overflow-hidden grow">
          <div className="w-full h-full absolute top-0 left-0 overflow-x-hidden overflow-y-auto">
            <ul>{routeListMemo}</ul>
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
