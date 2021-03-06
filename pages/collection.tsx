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
        <ColumnItem id={wordItem.id} length={confirmWords.length} index={index}>
          <Card wordItem={wordItem} />
        </ColumnItem>
      )),
    [confirmWords]
  );

  // Words Total
  const wordsTotalMemo = useMemo(
    () => (
      <div className="tw-text-yellow tw-text-xs">
        ???<span className="tw-mx-1">{words.length}</span>
        ?????????
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
      <h1 className="title">????????????</h1>
      <div className="content size-large tw-p-0 tw-rounded-none tw-bg-transparent">
        <div className="tablet:tw-flex tablet:tw-items-center tablet:tw-justify-between">
          {screenWidth > 767 && wordsTotalMemo}
          <div className="tw-flex tw-items-center tw-flex-wrap tw-justify-end">
            <div className="tw-w-6/12 tw-pr-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pr-0">
              <Select
                options={filterAlphabetOption}
                onChange={(event) => setFilterAlphabet(event.target.value)}
              />
            </div>
            <div className="tw-w-6/12 tw-pl-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pl-0">
              <Select
                options={filterPartOption}
                onChange={(event) => setFilterPart(event.target.value)}
              />
            </div>
            <div className="tw-w-full tw-flex tw-items-center tw-justify-between tablet:tw-justify-start tablet:tw-w-auto">
              {screenWidth < 768 && wordsTotalMemo}
              <div className="tw-flex tw-items-center tablet:tw-justify-start">
                <div className="tw-mr-2.5 tw-leading-none tablet:tw-mb-0">
                  <button
                    type="button"
                    className={`tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg tw-flex tw-justify-center tw-items-center before:tw-w-5 before:tw-h-5 before:tw-block before:tw-bg-no-repeat before:tw-bg-center before:tw-bg-contain ${
                      isSortDownAlt
                        ? 'before:tw-bg-[url("../public/img/alphabet_z_to_a.svg")]'
                        : 'before:tw-bg-[url("../public/img/alphabet_a_to_z.svg")]'
                    }`}
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
        {confirmWords.length ? (
          <ul className="tw-flex tw-flex-wrap">{wordListMemo}</ul>
        ) : (
          <div className="tw-text-center tw-text-gray tw-py-8">
            ??????????????????
          </div>
        )}
      </div>
    </>
  );
};

export default Collection;
