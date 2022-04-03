/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Card from '@/Components/card';
import { Select } from '@/Components/form';
import useGetSheetData from '@/Hook/useGetSheetData';
import { ISelectOption } from '@/Interfaces/form';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';
import stylesButton from '@/Styles/button.module.scss';
import stylesCollection from '@/Styles/collection.module.scss';
import stylesFeature from '@/Styles/feature.module.scss';

interface IOptionsData {
  id: string,
  name: string
}

const PARTS = require('../src/data/parts.json');
const ALPHABET = require('../src/data/alphabet.json');

const Collection: React.FC = () => {
  const { partsOptionsData } = PARTS;
  const { alphabetOptionsData } = ALPHABET;
  const handleGetData = useGetSheetData();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const PARTS_DATA = useSelector((state: RootState) => state.collection.parts);
  const [words, setWords] = useState<IWordItem[]>([]);
  const [isMounted, setIsMounted] = useState<Boolean>(false);

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

    setWords(sortListResult);
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

  return (
    <>
      <h1 className="title">Collection</h1>
      <div className="content size-large theme-transparent">
        <div className={`${stylesFeature.feature} ${stylesFeature['is-flex-end']}`}>
          <div className={`${stylesFeature.fieldset} ${stylesFeature['is-mobile-full']}`}>
            <Select
              options={filterAlphabetOption}
              onChange={(event) => { setFilterAlphabet(event.target.value); }}
            />
          </div>
          <div className={`${stylesFeature.fieldset} ${stylesFeature['is-mobile-full']}`}>
            <Select
              options={filterPartOption}
              onChange={(event) => { setFilterPart(event.target.value); }}
            />
          </div>
          <div className={stylesFeature.fieldset}>
            <button
              type="button"
              className={ClassHandleSortDownBtn()}
              aria-label="sort-alpha-button"
              onClick={() => setIsSortDownAlt(!isSortDownAlt)}
            />
          </div>
          <div className={stylesFeature.fieldset}>
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
        <ul className={stylesCollection.list}>
          { words.map((wordData) => {
            const key: string = uuidv4();
            return <li key={key}><Card id={key} wordData={wordData} /></li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Collection;
