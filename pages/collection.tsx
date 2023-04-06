import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '@/Components/card';
import ColumnItem from '@/Components/columnItem';
import { Select } from '@/Components/utils/form';
import useGetSheetData from '@/Hooks/useGetSheetData';
import useScrollToTop from '@/Hooks/useScrollToTop';
import { ISelectOption } from '@/Interfaces/form';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface IOptionsData {
  id: string;
  name: string;
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
  const { scrollValue, screenWidth } = useSelector(
    (state: RootState) => state.common
  );
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
  const [filterAlphabetOption, setFilterAlphabetOption] = useState<
    ISelectOption[]
  >([]);

  // Sort
  const [isSortDownAlt, setIsSortDownAlt] = useState<boolean>(false);

  // Process Words Data
  const processWordsList = useCallback(() => {
    handleScrollToTop();

    const wordItemList: IWordItem[] = [...WORDS_DATA];

    const filterListResult: IWordItem[] = wordItemList.filter(
      ({ alphabet, parts }) => {
        const partsSet: Set<string> = new Set(parts);

        if (filterAlphabet === 'all' && filterPart === 'all') {
          return true;
        }
        if (filterAlphabet === 'all') {
          return partsSet.has(filterPart);
        }
        if (filterPart === 'all') {
          return alphabet === filterAlphabet;
        }
        return alphabet === filterAlphabet && partsSet.has(filterPart);
      }
    );

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
    setLoadTotal(
      Math.floor(total / LOAD_AMOUNT) + (total % LOAD_AMOUNT > 0 ? 1 : 0)
    );
  }, [WORDS_DATA, filterPart, filterAlphabet, isSortDownAlt]);

  // List Memo
  const wordListMemo = useMemo(
    () =>
      confirmWords.map((wordItem: IWordItem, index: number) => (
        <ColumnItem
          id={wordItem.id}
          length={confirmWords.length}
          index={index}
          key={wordItem.id}
        >
          <Card wordItem={wordItem} />
        </ColumnItem>
      )),
    [confirmWords]
  );

  // Words Total
  const wordsTotalMemo = useMemo(
    () => (
      <div className="text-yellow text-xs">
        共<span className="mx-1">{words.length}</span>
        筆資料
      </div>
    ),
    [words]
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const partsData: ISelectOption[] = ['all', ...PARTS_DATA].map((part) => {
        const { name }: ISelectOption = partsOptionsData.filter(
          ({ id }: IOptionsData) => id === part
        )[0];
        return { name: name || part, value: part };
      });

      const alphabetData: ISelectOption[] = alphabetOptionsData.map(
        ({ id, name }: IOptionsData) => ({ name, value: id })
      );

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
  }, [
    isMounted,
    processWordsList,
    WORDS_DATA,
    filterPart,
    filterAlphabet,
    isSortDownAlt,
  ]);

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

    if (scrollValue + browserHeight >= contentHeight - browserHeight / 2) {
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
    } else {
      setConfirmWords([]);
    }
  }, [loadIndex, words]);

  return (
    <>
      <h1 className="title">單字列表</h1>
      <div className="content size-large p-0 rounded-none bg-transparent">
        <div className="tablet:flex tablet:items-center tablet:justify-between">
          {screenWidth > 767 && wordsTotalMemo}
          <div className="flex items-center flex-wrap justify-end">
            <div className="w-6/12 pr-1 mb-2.5 leading-none tablet:w-auto tablet:mr-2.5 tablet:mb-0 tablet:pr-0">
              <Select
                options={filterAlphabetOption}
                onChange={(event) => setFilterAlphabet(event.target.value)}
              />
            </div>
            <div className="w-6/12 pl-1 mb-2.5 leading-none tablet:w-auto tablet:mr-2.5 tablet:mb-0 tablet:pl-0">
              <Select
                options={filterPartOption}
                onChange={(event) => setFilterPart(event.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-between tablet:justify-start tablet:w-auto">
              {screenWidth < 768 && wordsTotalMemo}
              <div className="flex items-center tablet:justify-start">
                <div className="mr-2.5 leading-none tablet:mb-0">
                  <button
                    type="button"
                    className={`w-10 h-10 bg-white rounded-lg flex justify-center items-center before:w-5 before:h-5 before:block before:bg-no-repeat before:bg-center before:bg-contain ${
                      isSortDownAlt
                        ? 'before:bg-[url("../public/img/alphabet_z_to_a.svg")]'
                        : 'before:bg-[url("../public/img/alphabet_a_to_z.svg")]'
                    }`}
                    aria-label="sort-alpha-button"
                    onClick={() => setIsSortDownAlt(!isSortDownAlt)}
                  />
                </div>
                <div className="mr-0 leading-none tablet:mb-0">
                  <button
                    type="button"
                    className="w-10 h-10 bg-white rounded-lg before-font-material before:content-['\e5d5'] before:text-center before:leading-10 before:text-black"
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
        {confirmWords.length ? (
          <ul className="flex flex-wrap">{wordListMemo}</ul>
        ) : (
          <div className="text-center text-gray py-8">目前沒有資料</div>
        )}
      </div>
    </>
  );
};

export default Collection;
