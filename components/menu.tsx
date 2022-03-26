import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRouteItem } from '@/Interfaces/I_Global';
import { setIsMenuOpen } from '@/Slice/common';
import { RootState } from '@/Store/index';
import styles from '@/Styles/menu.module.scss';

const ROUTE = require('../src/data/route.json');

const Menu: React.FC = () => {
  const [routeLinks, setRouteLinks] = useState<[]>([]);
  const { isMenuOpen } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { route } = ROUTE;
    setRouteLinks(route);
  }, []);

  const ClassHandleMenu = () => `${isMenuOpen === true ? styles['is-active'] : ''}`;
  const ClassHandleLink = (path: string, id: string) => `${styles.menu__item} ${styles[`icon-${id}`]} ${router.asPath === path ? styles.current : ''}`;

  return (
    <nav id={styles.menu} className={ClassHandleMenu()}>
      <div className={styles.menu__header}>
        <button
          type="button"
          aria-label="close-menu"
          className={styles['menu__close-btn']}
          onClick={() => { dispatch(setIsMenuOpen(false)); }}
        />
      </div>
      <div className={styles.menu__body}>
        <div className={styles.menu__content}>
          <ul className={styles.menu__list}>
            {
              routeLinks.map((route: IRouteItem) => {
                const { id, path, name } = route;
                return (
                  <li key={id}>
                    <Link href={path} passHref>
                      <a href="replace" className={ClassHandleLink(path, id)}>{name}</a>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
