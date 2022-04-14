import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsMenuOpen } from '@/Slice/common';
import styles from '@/Styles/header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header id={styles.header}>
      <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
        <Link href="/" passHref>
          <a href="replace" className={styles.logo}>
            <span>Words Up</span>
          </a>
        </Link>
        <button
          type="button"
          aria-label="open-menu"
          className={styles['menu-btn']}
          onClick={() => { dispatch(setIsMenuOpen(true)); }}
        />
      </div>
    </header>
  );
};

export default Header;
