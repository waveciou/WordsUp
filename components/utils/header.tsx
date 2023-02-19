import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsMenuOpen } from '@/Slice/common';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className="w-full h-header-height fixed top-0 left-0 bg-white z-3000 shadow-[0_1px_3px_0_rgba(51,51,51,0.1)]">
      <div className="w-full flex items-center justify-between">
        <Link href="/" passHref>
          <a
            href="replace"
            className="pr-2 pl-2 flex items-center font-bold text-base text-green before:w-8 before:h-8 before:mr-2 before:block before:bg-no-repeat before:bg-center before:bg-contain before:bg-[url('../public/img/icon.svg')]"
          >
            <span>Words Up</span>
          </a>
        </Link>
        <button
          type="button"
          aria-label="open-menu"
          className="w-header-height h-header-height flex items-center justify-center text-center before-font-material before:content-['\e5d2'] before:w-6 before:h-6 before:m-auto before:block before:leading-6 before:text-green"
          onClick={() => dispatch(setIsMenuOpen(true))}
        />
      </div>
    </header>
  );
};

export default Header;
