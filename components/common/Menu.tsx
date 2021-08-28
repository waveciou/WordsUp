import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// Style
import styles from '../../styles/common/Menu.module.scss';

// Redux
import { RootState } from '../../store';
import { setMenuControl } from '../../store/slice/menuControlSlice';

const ROUTE = require('../../src/data/route.json');

interface IRouteItem {
  id: string;
  name: string;
  path: string;
}

const MenuComponent: React.FC = () => {
  const [routeLinks, setRouteLinks] = useState([]);
  const menuIsOpen = useSelector((state: RootState) => state.menuControl.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { route } = ROUTE;
    setRouteLinks(route);
  }, []);

  const ClassHandleMenu = () => `${menuIsOpen === true ? styles['is-active'] : ''}`;
  const ClassHandleLink = (path: string) => `${styles.menu__item} ${router.asPath === path ? styles.current : ''}`;

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
                      <a href="replace" className={ClassHandleLink(path)}>{name}</a>
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
