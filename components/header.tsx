import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsMenuOpen } from '@/Slice/common';
import styles from '@/Styles/header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className="tw-w-full tw-h-header-height tw-fixed tw-top-0 tw-left-0 tw-bg-white tw-z-3000 tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.1)]">
      <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
        <Link href="/" passHref>
          <a href="replace" className={styles.logo}>
            <span>Words Up</span>
          </a>
        </Link>
        <button
          type="button"
          aria-label="open-menu"
          className="tw-w-header-height tw-h-header-height tw-flex tw-items-center tw-justify-center tw-text-center before-font-material before:tw-content-['\e5d2'] before:tw-w-6 before:tw-h-6 before:tw-m-auto before:tw-block before:tw-leading-6 before:tw-text-green"
          onClick={() => dispatch(setIsMenuOpen(true))}
        />
      </div>
    </header>
  );
};

export default Header;
