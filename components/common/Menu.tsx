import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRouteItem } from '@/Interfaces/I_Global';
import { setMenuControl } from '@/Slice/menuControlSlice';
import { RootState } from '@/Store/index';
import styles from '@/Styles/common/Menu.module.scss';

const ROUTE = require('../../src/data/route.json');

const MenuComponent: React.FC = () => {
  const [routeLinks, setRouteLinks] = useState<[]>([]);
  const MENU_IS_OPEN = useSelector((state: RootState) => state.menuControl.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { route } = ROUTE;
    setRouteLinks(route);
  }, []);

  const ClassHandleMenu = () => `${MENU_IS_OPEN === true ? styles['is-active'] : ''}`;
  const ClassHandleLink = (path: string, id: string) => `${styles.menu__item} ${styles[`icon-${id}`]} ${router.asPath === path ? styles.current : ''}`;

  return (
    <nav id={styles.menu} className={ClassHandleMenu()}>
      <div className={styles.menu__header}>
        <button
          type="button"
          aria-label="close-menu"
          className={styles['menu__close-btn']}
          onClick={() => { dispatch(setMenuControl(false)); }}
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

export default MenuComponent;
