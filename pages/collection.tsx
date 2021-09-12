import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '../store';

// Component
import CollectedCard from '../components/CollectedCard';
import { Select } from '../components/common/Form';

// Functions
import handleGetHashId from '../src/functions/handleGetHashId';
import HandleGetGoogleSheetData from '../src/functions/handleGetGoogleSheetData';

// Style
import stylesCollection from '../styles/components/Collection.module.scss';
import stylesFeature from '../styles/components/Feature.module.scss';
import stylesButton from '../styles/common/Button.module.scss';

// Interface
import { IWordCase } from '../src/interfaces/I_WordCase';
import { ISelectOption } from '../src/interfaces/I_Form';

const CollectionComponent: React.FC = () => {
  const wordsData = useSelector((state: RootState) => state.wordsCollection.value);
  const [words, setWords] = useState<IWordCase[]>([]);
  const handleGetData = HandleGetGoogleSheetData();

  // Filter
  const [filterBase, setFilterBase] = useState('');
  const [filterList, setFilterList] = useState<ISelectOption[]>([]);

  // Sort
  const [isSortDownAlt, setIsSortDownAlt] = useState(false);

  const handleGetPartList = (dataList: IWordCase[]) => {
    const result = dataList.reduce<ISelectOption[]>((reduceList, word) => {
      const { part } = word;
      const hasInclude: boolean = reduceList.some((item) => item.value === part);

      if (hasInclude === false && part !== '') {
        const partItem: ISelectOption[] = [
          {
            value: part,
            name: part.toLocaleUpperCase(),
          },
        ];
        return [...reduceList, ...partItem];
      }
      return [...reduceList];
    }, [{ value: 'all', name: 'ALL' }]);

    return result;
  };

  const ClassHandleSortDownBtn = () => `
  ${stylesButton['fab-btn']}
  ${stylesButton['fab__sort-down-btn']} 
  ${isSortDownAlt === true ? stylesButton['is-down-alt'] : ''}
  `;

  const callbackProcessWords = useCallback(() => {
    const _wordsData: IWordCase[] = [...wordsData];
    const filterListResult: IWordCase[] = filterBase === 'all' ? _wordsData : _wordsData.filter((word) => word.part === filterBase);

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
  }, [wordsData, filterBase, isSortDownAlt]);

  useEffect(() => {
    const _wordsData: IWordCase[] = [...wordsData];
    const partList: ISelectOption[] = handleGetPartList(_wordsData);

    setFilterList(partList);
    setFilterBase('all');
  }, [wordsData]);

  useEffect(() => {
    callbackProcessWords();
  }, [wordsData, filterBase, isSortDownAlt, callbackProcessWords]);

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
              const id: string = handleGetHashId(index);
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
