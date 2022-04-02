/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Card from '@/Components/card';
import { Select } from '@/Components/form';
import { ISelectOption } from '@/Interfaces/form';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';
import styles from '@/Styles/collection.module.scss';
import stylesFeature from '@/Styles/feature.module.scss';

// import HandleGetGoogleSheetData from '@/Functions/getGoogleSheetData';
// import handleGetHashId from '@/Functions/getHashId';
// import { ISelectOption } from '@/Interfaces/I_Form';
// import { IWordCase, IWordParts } from '@/Interfaces/I_WordCase';
// import stylesButton from '@/Styles/button.module.scss';

// import stylesFeature from '@/Styles/components/Feature.module.scss';

// const WORDPARTS = require('../src/data/wordParts.json');

interface IOptionsData {
  id: string,
  name: string
}

const PARTS = require('../src/data/parts.json');
const ALPHABET = require('../src/data/alphabet.json');

const Collection: React.FC = () => {
  const { partsOptionsData } = PARTS;
  const { alphabetOptionsData } = ALPHABET;
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const PARTS_DATA = useSelector((state: RootState) => state.collection.parts);
  const [words, setWords] = useState<IWordItem[]>([]);
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  // Filter
  const [filterAlphabet, setFilterAlphabet] = useState<string>('');
  const [filterAlphabetOption, setFilterAlphabetOption] = useState<ISelectOption[]>([]);

  const [filterPart, setFilterPart] = useState<string>('');
  const [filterPartOption, setFilterPartOption] = useState<ISelectOption[]>([]);

  // Sort
  // const [isSortDownAlt, setIsSortDownAlt] = useState<boolean>(false);

  const processDataCallback = useCallback(() => {
    const wordsData: IWordItem[] = [...WORDS_DATA];

    const partsData: ISelectOption[] = ['all', ...PARTS_DATA].map((part) => {
      const { name }: ISelectOption = partsOptionsData.filter(({ id }: IOptionsData) => id === part)[0];
      return { name: name || part, value: part };
    });

    const alphabetData: ISelectOption[] = alphabetOptionsData.map(({ id, name }: IOptionsData) => ({ name, value: id }));

    setWords(wordsData);
    setFilterPartOption(partsData);
    setFilterAlphabetOption(alphabetData);
  }, [WORDS_DATA, PARTS_DATA]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      processDataCallback();
    }
  }, [isMounted, processDataCallback, WORDS_DATA, PARTS_DATA]);

  // const handleGetData = HandleGetGoogleSheetData();
  // const { wordParts } = WORDPARTS;

  // const handleGetPartList = (dataList: IWordCase[]) => {
  //   const allCaseName: IWordParts = wordParts.filter((part: IWordParts) => part.id === 'all')[0] || { id: 'all', name: '全部' };

  //   const result = dataList.reduce<ISelectOption[]>((reduceList, word) => {
  //     const { parts } = word;
  //     const reduceFlatList: string[] = reduceList.map((item) => item.value);

  //     const subtractionList : string[] = parts.filter((partItem: string) => {
  //       const _result: boolean = partItem === '' ? true : reduceFlatList.includes(partItem);
  //       return _result === false;
  //     });

  //     const partItemList: ISelectOption[] = subtractionList.map((partItem: string) => {
  //       const partNameFilter: IWordParts = wordParts.filter((part: IWordParts) => part.id === partItem)[0] || {
  //         id: partItem,
  //         name: partItem.toLocaleUpperCase(),
  //       };

  //       return {
  //         value: partItem,
  //         name: partNameFilter.name,
  //       };
  //     });

  //     return [...reduceList, ...partItemList];
  //   }, [{ value: 'all', name: allCaseName.name }]);

  //   return result;
  // };

  // // Class Name
  // const ClassHandleSortDownBtn = () => `
  //   ${stylesButton['fab-btn']}
  //   ${stylesButton['fab__sort-down-btn']}
  //   ${isSortDownAlt === true ? stylesButton['is-down-alt'] : ''}
  // `;

  // // Words list setting process
  // const callbackProcessWords = useCallback(() => {
  //   const wordsData: IWordCase[] = [...WORDS_DATA];
  //   // eslint-disable-next-line max-len
  //   const filterListResult: IWordCase[] = filterBase === 'all' ? wordsData : wordsData.filter((word) => word.parts.includes(filterBase));

  //   const sortListResult: IWordCase[] = filterListResult.sort((a, b) => {
  //     const aText: string = a.english.toLocaleLowerCase();
  //     const bText: string = b.english.toLocaleLowerCase();

  //     if (aText > bText) {
  //       return isSortDownAlt === false ? 1 : -1;
  //     }

  //     if (aText < bText) {
  //       return isSortDownAlt === false ? -1 : 1;
  //     }
  //     return 0;
  //   });

  //   setWords(sortListResult);
  // }, [WORDS_DATA, filterBase, isSortDownAlt]);

  // useEffect(() => {
  //   const wordsData: IWordCase[] = [...WORDS_DATA];
  //   const partList: ISelectOption[] = handleGetPartList(wordsData);

  //   setFilterList(partList);
  //   setFilterBase('all');
  // }, [WORDS_DATA]);

  return (
    <>
      <h1 className="title">ALL OF THE WORDS</h1>
      <div className="content size-large theme-transparent">
        <div className={`${stylesFeature.feature} ${stylesFeature['is-flex-end']}`}>
          <div className={stylesFeature.fieldset}>
            <Select
              options={filterAlphabetOption}
              onChange={(event) => { setFilterAlphabet(event.target.value); }}
            />
          </div>
          <div className={stylesFeature.fieldset}>
            <Select
              options={filterPartOption}
              onChange={(event) => { setFilterPart(event.target.value); }}
            />
          </div>
        </div>
      </div>
      <div className="content size-large">
        <ul className={styles.list}>
          { words.map((wordData) => {
            const key: string = uuidv4();
            return <li key={key}><Card id={key} wordData={wordData} /></li>;
          })}
        </ul>
      </div>

      {/* <h1 className="title">ALL OF THE WORDS</h1>
      <div className="content size-large theme-transparent">
        <div className={`${stylesFeature.feature} ${stylesFeature['is-flex-end']}`}>
          <div className={stylesFeature.fieldset}>
            <Select
              options={filterList}
              onChange={(event) => { setFilterBase(event.target.value); }}
            />
          </div>
          <div className={stylesFeature.fieldset}>
            <button
              type="button"
              className={ClassHandleSortDownBtn()}
              aria-label="sort-alpha-button"
              onClick={() => {
                const result: boolean = !isSortDownAlt;
                setIsSortDownAlt(result);
              }}
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
        <ul className={stylesCollection.collectedList}>
          {
            words.map((word: IWordCase, index: number) => {
              const id: string = handleGetHashId(index, word.english);
              return (
                <li key={id}>
                  <CollectedCard word={word} />
                </li>
              );
            })
          }
        </ul>
      </div> */}
    </>
  );
};

export default Collection;
