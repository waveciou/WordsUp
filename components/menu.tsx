import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRouteItem } from '@/Interfaces/global';
import { setIsMenuOpen } from '@/Slice/common';
import { RootState } from '@/Store/index';
import styles from '@/Styles/menu.module.scss';

const ROUTE = require('../src/data/route.json');

const Menu: React.FC = () => {
  const [routeLinks, setRouteLinks] = useState<IRouteItem[]>([]);
  const { isMenuOpen } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { route } = ROUTE;
    setRouteLinks(route);
  }, []);

  const ClassHandleMenu = () => `${isMenuOpen === true ? styles['is-active'] : ''}`;

  const routeLinksMemo = useMemo(() => {
    const ClassHandle = (path: string, id: string) => `
      ${styles.item}
      ${styles[`icon-${id}`]}
      ${router.pathname === path ? styles.current : ''}
    `;

    return routeLinks.map((route: IRouteItem) => {
      const { id, path, name } = route;
      return (
        <li key={id} className="tw-px-4 tw-mb-2.5">
          <Link href={path} passHref>
            <a href="replace" className={ClassHandle(path, id)}>{name}</a>
          </Link>
        </li>
      );
    });
  }, [routeLinks, router]);

  return (
    <nav id={styles.menu} className={ClassHandleMenu()}>
      <div className="tw-flex tw-items-start tw-justify-end tw-basis-12">
        <button
          type="button"
          aria-label="close-menu"
          className="tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-text-center before-font-material before:tw-content-['\e5cd'] before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-text-black"
          onClick={() => { dispatch(setIsMenuOpen(false)); }}
        />
      </div>
      <div className="tw-relative tw-overflow-hidden tw-grow">
        <div className="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-overflow-x-hidden tw-overflow-y-auto">
          <ul>
            { routeLinksMemo }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
