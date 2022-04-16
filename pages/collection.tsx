/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '@/Components/card';
import { Select } from '@/Components/form';
import useGetSheetData from '@/Hook/useGetSheetData';
import useScrollToTop from '@/Hook/useScrollToTop';
import { ISelectOption } from '@/Interfaces/form';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface IOptionsData {
  id: string,
  name: string
}

const PARTS = require('../src/data/parts.json');
const ALPHABET = require('../src/data/alphabet.json');

const LOAD_AMOUNT: number = 50;

const Collection: React.FC = () => {
  const { partsOptionsData } = PARTS;
  const { alphabetOptionsData } = ALPHABET;
  const handleGetData = useGetSheetData();
  const handleScrollToTop = useScrollToTop();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const PARTS_DATA = useSelector((state: RootState) => state.collection.parts);
  const { scrollValue, screenWidth } = useSelector((state: RootState) => state.common);
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const [words, setWords] = useState<IWordItem[]>([]);
  const [confirmWords, setConfirmWords] = useState<IWordItem[]>([]);

  // Lazyload
  const [loadIndex, setLoadIndex] = useState<number>(0);
  const [loadTotal, setLoadTotal] = useState<number>(0);

  // Filter
  const [filterPart, setFilterPart] = useState<string>('all');
  const [filterPartOption, setFilterPartOption] = useState<ISelectOption[]>([]);

  const [filterAlphabet, setFilterAlphabet] = useState<string>('all');
  const [filterAlphabetOption, setFilterAlphabetOption] = useState<ISelectOption[]>([]);

  // Sort
  const [isSortDownAlt, setIsSortDownAlt] = useState<boolean>(false);

  // Process Words Data
  const processWordsList = useCallback(() => {
    handleScrollToTop();

    const wordsData: IWordItem[] = [...WORDS_DATA];

    const filterListResult: IWordItem[] = wordsData.filter(({ alphabet, parts }) => {
      if (filterAlphabet === 'all' && filterPart === 'all') {
        return true;
      }
      if (filterAlphabet === 'all') {
        return parts.includes(filterPart);
      }
      if (filterPart === 'all') {
        return alphabet === filterAlphabet;
      }
      return alphabet === filterAlphabet && parts.includes(filterPart);
    });

    const sortListResult: IWordItem[] = filterListResult.sort((a, b) => {
      const aText: string = a.en.toLocaleLowerCase();
      const bText: string = b.en.toLocaleLowerCase();

      if (aText > bText) {
        return isSortDownAlt === false ? 1 : -1;
      }

      if (aText < bText) {
        return isSortDownAlt === false ? -1 : 1;
      }
      return 0;
    });

    const total: number = sortListResult.length;

    setWords(sortListResult);
    setLoadIndex(1);
    setLoadTotal(Math.floor(total / LOAD_AMOUNT) + ((total % LOAD_AMOUNT) > 0 ? 1 : 0));
  }, [WORDS_DATA, filterPart, filterAlphabet, isSortDownAlt]);

  // List Memo
  const wordListMemo = useMemo(() => confirmWords.map((wordData: IWordItem, index: number) => {
    const { id } = wordData;
    const isEven: boolean = !!(index % 2 === 1);
    const isThirChid: boolean = !!((index + 1) % 3 === 0);
    return (
      <li
        key={id}
        className={`tw-w-full tw-mb-3 tablet:tw-w-[calc((100%-0.75rem)/2)] tablet:tw-mr-3 develop:tw-w-[calc((100%-1.5rem)/3)] ${isEven ? 'tablet:tw-mr-0 develop:tw-mr-3' : ''} ${isThirChid ? 'develop:tw-mr-0' : ''}`}
      >
        <Card wordData={wordData} />
      </li>
    );
  }), [confirmWords]);

  // Words Total
  const wordsTotalMemo = useMemo(() => (
    <div className="tw-text-yellow tw-text-xs">
      共
      <span className="tw-mx-1">{ words.length }</span>
      個單字
    </div>
  ), [words]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const partsData: ISelectOption[] = ['all', ...PARTS_DATA].map((part) => {
        const { name }: ISelectOption = partsOptionsData.filter(({ id }: IOptionsData) => id === part)[0];
        return { name: name || part, value: part };
      });

      const alphabetData: ISelectOption[] = alphabetOptionsData.map(({ id, name }: IOptionsData) => ({ name, value: id }));

      setFilterPart('all');
      setFilterAlphabet('all');
      setFilterPartOption(partsData);
      setFilterAlphabetOption(alphabetData);
    }
  }, [isMounted, PARTS_DATA, alphabetOptionsData, partsOptionsData]);

  useEffect(() => {
    if (isMounted) {
      processWordsList();
    }
  }, [isMounted, processWordsList, WORDS_DATA, filterPart, filterAlphabet, isSortDownAlt]);

  useEffect(() => {
    const browserHeight: number = window.innerHeight;

    const contentHeight: number = (() => {
      if (screenWidth < 1025) {
        const element: HTMLElement | null = document.getElementById('__main');
        if (element !== null) {
          return element.offsetHeight;
        }
      }
      return document.body.clientHeight;
    })();

    if (scrollValue + browserHeight >= contentHeight - (browserHeight / 2)) {
      if (loadIndex < loadTotal) {
        const index: number = loadIndex + 1;
        setLoadIndex(index);
      }
    }
  }, [scrollValue, screenWidth]);

  useEffect(() => {
    if (loadIndex > 0 && words.length) {
      const sliceBegin: number = (loadIndex - 1) * LOAD_AMOUNT;
      const sliceEnd: number = loadIndex * LOAD_AMOUNT;
      const capture: IWordItem[] = words.slice(sliceBegin, sliceEnd);
      const result: IWordItem[] = [...confirmWords, ...capture];

      if (loadIndex === 1) {
        setConfirmWords(capture);
      } else {
        setConfirmWords(result);
      }
    }
  }, [loadIndex, words]);

  return (
    <>
      <h1 className="title">單字列表</h1>
      <div className="content size-large tw-p-0 tw-rounded-none tw-bg-transparent">
        <div className="tablet:tw-flex tablet:tw-items-center tablet:tw-justify-between">
          { screenWidth > 767 && wordsTotalMemo }
          <div className="tw-flex tw-items-center tw-flex-wrap tw-justify-end">
            <div className="tw-w-6/12 tw-pr-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pr-0">
              <Select
                options={filterAlphabetOption}
                onChange={(event) => { setFilterAlphabet(event.target.value); }}
              />
            </div>
            <div className="tw-w-6/12 tw-pl-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pl-0">
              <Select
                options={filterPartOption}
                onChange={(event) => { setFilterPart(event.target.value); }}
              />
            </div>
            <div className="tw-w-full tw-flex tw-items-center tw-justify-between tablet:tw-justify-start tablet:tw-w-auto">
              { screenWidth < 768 && wordsTotalMemo }
              <div className="tw-flex tw-items-center tablet:tw-justify-start">
                <div className="tw-mr-2.5 tw-leading-none tablet:tw-mb-0">
                  <button
                    type="button"
                    className={`tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg tw-flex tw-justify-center tw-items-center before:tw-w-5 before:tw-h-5 before:tw-block before:bg-no-repeat before:tw-bg-center before:tw-bg-contain ${isSortDownAlt ? "before:tw-bg-[url('../public/img/alphabet_z_to_a.svg')]" : "before:tw-bg-[url('../public/img/alphabet_a_to_z.svg')]"}`}
                    aria-label="sort-alpha-button"
                    onClick={() => setIsSortDownAlt(!isSortDownAlt)}
                  />
                </div>
                <div className="tw-mr-0 tw-leading-none tablet:tw-mb-0">
                  <button
                    type="button"
                    className="tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg before-font-material before:tw-content-['\e5d5'] before:tw-text-center before:tw-leading-10 before:tw-text-black"
                    aria-label="data-update-button"
                    onClick={handleGetData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content size-large">
        {
          confirmWords.length
            ? (
              <ul className="tw-flex tw-flex-wrap">
                { wordListMemo }
              </ul>
            ) : (
              <div className="tw-flex tw-justify-center tw-text-gray tw-py-8">目前沒有資料</div>
            )
        }
      </div>
      {
        scrollValue > 0 && (
          <button
            type="button"
            aria-label="scroll-to-top-button"
            className="tw-w-10 tw-h-10 tw-block tw-fixed tw-right-5 tw-bottom-12 tw-bg-green-dark/60 tw-rounded-full before-font-material before:tw-content-['\e5d8'] before:tw-leading-10 before:tw-text-yellow"
            onClick={handleScrollToTop}
          />
        )
      }
    </>
  );
};

export default Collection;
