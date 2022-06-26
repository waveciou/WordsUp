import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsMenuOpen } from '@/Slice/common';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className="tw-w-full tw-h-header-height tw-fixed tw-top-0 tw-left-0 tw-bg-white tw-z-3000 tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.1)]">
      <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
        <Link href="/" passHref>
          <a
            href="replace"
            className="tw-pr-2 tw-pl-2 tw-flex tw-items-center tw-font-bold tw-text-base tw-text-green before:tw-w-8 before:tw-h-8 before:tw-mr-2 before:tw-block before:tw-bg-no-repeat before:tw-bg-center before:tw-bg-contain before:tw-bg-[url('../public/img/icon.svg')]"
          >
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
