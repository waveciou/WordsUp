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
import stylesButton from '@/Styles/button.module.scss';

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
  const { scrollValue } = useSelector((state: RootState) => state.common);
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

  // Class Name
  const ClassHandleSortDownBtn = () => `
    ${stylesButton['fab-btn']}
    ${stylesButton['fab__sort-down-btn']} 
    ${isSortDownAlt ? stylesButton['is-down-alt'] : ''}
  `;

  // Process Words Data
  const processWordsCallback = useCallback(() => {
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
      processWordsCallback();
    }
  }, [isMounted, processWordsCallback, WORDS_DATA, filterPart, filterAlphabet, isSortDownAlt]);

  useEffect(() => {
    const browserHeight: number = window.innerHeight;

    if (scrollValue + browserHeight >= document.body.clientHeight - (browserHeight / 2)) {
      const index: number = loadIndex + 1;
      if (index <= loadTotal) {
        setLoadIndex(index);
      }
    }
  }, [scrollValue]);

  useEffect(() => {
    if (loadIndex > 0) {
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

  return (
    <>
      <h1 className="title">單字列表</h1>
      <div className="content size-large tw-p-0 tw-rounded-none tw-bg-transparent">
        <div className="tw-flex tw-items-center tw-flex-wrap tw-justify-end">
          <div className="tw-w-full tw-mr-0 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0">
            <Select
              options={filterAlphabetOption}
              onChange={(event) => { setFilterAlphabet(event.target.value); }}
            />
          </div>
          <div className="tw-w-full tw-mr-0 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0">
            <Select
              options={filterPartOption}
              onChange={(event) => { setFilterPart(event.target.value); }}
            />
          </div>
          <div className="tw-mr-2.5 tw-mb-2.5 tw-leading-none tablet:tw-mb-0">
            <button
              type="button"
              className={ClassHandleSortDownBtn()}
              aria-label="sort-alpha-button"
              onClick={() => setIsSortDownAlt(!isSortDownAlt)}
            />
          </div>
          <div className="tw-mr-0 tw-mb-2.5 tw-leading-none tablet:tw-mb-0">
            <button
              type="button"
              className={`
                ${stylesButton['fab-btn']}
                ${stylesButton['fab__update-btn']}
              `}
              aria-label="data-update-button"
              onClick={handleGetData}
            />
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
    </>
  );
};

export default Collection;
