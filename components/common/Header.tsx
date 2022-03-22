import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsMenuOpen } from '@/Slice/common';
import styles from '@/Styles/common/Header.module.scss';

const Header: React.FC = () => {
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
          onClick={() => { dispatch(setIsMenuOpen(true)); }}
        />
      </div>
    </header>
  );
};

export default Header;
