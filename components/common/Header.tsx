import * as React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

// Style
import styles from '../../styles/common/Header.module.scss';

// Redux
import { setMenuControl } from '../../store/slice/menuControlSlice';

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header id={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" passHref>
          <a href="replace" className={styles.logo}>
            <span>Words Up</span>
          </a>
        </Link>
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
