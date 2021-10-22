/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '../store';

// Component
import CollectedCard from '../components/CollectedCard';
import { Select } from '../components/common/Form';

// Functions
import handleGetHashId from '../src/functions/getHashId';
import HandleGetGoogleSheetData from '../src/functions/getGoogleSheetData';

// Style
import stylesCollection from '../styles/components/Collection.module.scss';
import stylesFeature from '../styles/components/Feature.module.scss';
import stylesButton from '../styles/common/Button.module.scss';

// Interface
import { IWordCase, IWordParts } from '../src/interfaces/I_WordCase';
import { ISelectOption } from '../src/interfaces/I_Form';

const WORDPARTS = require('../src/data/wordParts.json');

const CollectionComponent: React.FC = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const [words, setWords] = useState<IWordCase[]>([]);
  const handleGetData = HandleGetGoogleSheetData();
  const { wordParts } = WORDPARTS;

  // Filter
  const [filterBase, setFilterBase] = useState('');
  const [filterList, setFilterList] = useState<ISelectOption[]>([]);

  // Sort
  const [isSortDownAlt, setIsSortDownAlt] = useState(false);

  const handleGetPartList = (dataList: IWordCase[]) => {
    const allCaseName: IWordParts = wordParts.filter((part: IWordParts) => part.id === 'all')[0] || { id: 'all', name: '全部' };

    const result = dataList.reduce<ISelectOption[]>((reduceList, word) => {
      const { parts } = word;
      const reduceFlatList: string[] = reduceList.map((item) => item.value);

      const subtractionList : string[] = parts.filter((partItem: string) => {
        const _result: boolean = partItem === '' ? true : reduceFlatList.includes(partItem);
        return _result === false;
      });

      const partItemList: ISelectOption[] = subtractionList.map((partItem: string) => {
        const partNameFilter: IWordParts = wordParts.filter((part: IWordParts) => part.id === partItem)[0] || {
          id: partItem,
          name: partItem.toLocaleUpperCase(),
        };

        return {
          value: partItem,
          name: partNameFilter.name,
        };
      });

      return [...reduceList, ...partItemList];
    }, [{ value: 'all', name: allCaseName.name }]);

    return result;
  };

  // Class Name
  const ClassHandleSortDownBtn = () => `
    ${stylesButton['fab-btn']}
    ${stylesButton['fab__sort-down-btn']} 
    ${isSortDownAlt === true ? stylesButton['is-down-alt'] : ''}
  `;

  // Words list setting process
  const callbackProcessWords = useCallback(() => {
    const wordsData: IWordCase[] = [...WORDS_DATA];
    // eslint-disable-next-line max-len
    const filterListResult: IWordCase[] = filterBase === 'all' ? wordsData : wordsData.filter((word) => word.parts.includes(filterBase));

    const sortListResult: IWordCase[] = filterListResult.sort((a, b) => {
      const aText: string = a.english.toLocaleLowerCase();
      const bText: string = b.english.toLocaleLowerCase();

      if (aText > bText) {
        return isSortDownAlt === false ? 1 : -1;
      }

      if (aText < bText) {
        return isSortDownAlt === false ? -1 : 1;
      }
      return 0;
    });

    setWords(sortListResult);
  }, [WORDS_DATA, filterBase, isSortDownAlt]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const wordsData: IWordCase[] = [...WORDS_DATA];
    const partList: ISelectOption[] = handleGetPartList(wordsData);

    setFilterList(partList);
    setFilterBase('all');
  }, [WORDS_DATA]);

  useEffect(() => {
    if (isMounted === true) {
      callbackProcessWords();
    }
  }, [WORDS_DATA, filterBase, isSortDownAlt, callbackProcessWords]);

  return (
    <>
      <h1 className="title">ALL OF THE WORDS</h1>
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
      </div>
    </>
  );
};

export default CollectionComponent;
