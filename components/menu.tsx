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
        <li key={id}>
          <Link href={path} passHref>
            <a href="replace" className={ClassHandle(path, id)}>{name}</a>
          </Link>
        </li>
      );
    });
  }, [routeLinks, router]);

  return (
    <nav id={styles.menu} className={ClassHandleMenu()}>
      <div className={styles.header}>
        <button
          type="button"
          aria-label="close-menu"
          className={styles['close-btn']}
          onClick={() => { dispatch(setIsMenuOpen(false)); }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <ul className={styles.list}>
            { routeLinksMemo }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
