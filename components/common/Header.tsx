import * as React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../styles/modules/Header.module.scss';

// Redux
import { setMenuControl } from '../../store/slice/menuControlSlice';

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header id={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.logo}>
          <span>Words Up</span>
        </h1>
        <button
          type="button"
          aria-label="open-menu"
          className={styles['header__menu-btn']}
          onClick={() => { dispatch(setMenuControl(true)); }}
        />
      </div>
    </header>
  );
};

export default HeaderComponent;
