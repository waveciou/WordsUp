import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/modules/Menu.module.scss';

// Redux
import { RootState } from '../../store';
import { setMenuControl } from '../../store/slice/menuControlSlice';

const MenuComponent: React.FC = () => {
  const menuIsOpen = useSelector((state: RootState) => state.menuControl.value);
  const dispatch = useDispatch();

  const classHandleMenu = () => `${menuIsOpen === true ? styles['is-active'] : ''}`;

  return (
    <nav id={styles.menu} className={classHandleMenu()}>
      <div className={styles.menu__header} />
      <div className={styles.menu__body} />
    </nav>
  );
};

export default MenuComponent;
