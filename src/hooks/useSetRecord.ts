/**
 * Verify data from IndexedDB and set correct record collection.
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import examIdValidator from '@/Functions/examIdValidator';
import { IAnswerItem, IRecordItem, IRecordLocalItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const useSetRecord = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  const checkTypes = (payload: any, base: 'string' | 'number'): boolean => {
    switch (base) {
      case 'string':
        return typeof payload === 'string';
      case 'number':
        return typeof payload === 'number';
      default:
        return false;
    }
  };

  return useCallback(
    (localData: IRecordItem[]) => {
      if (localData) {
        if (Array.isArray(localData)) {
          const result: IRecordItem[] = [...localData].reduce(
            (prev: IRecordItem[], current: IRecordLocalItem) => {
              const {
                id = '',
                startTime = 0,
                finishTime = 0,
                answerState = [],
              } = current;

              const isConfirm: boolean = (() => {
                const isId: boolean = examIdValidator(id);
                const isStartTime: boolean =
                  checkTypes(startTime, 'number') && startTime !== 0;
                const isFinishTime: boolean =
                  checkTypes(startTime, 'number') && finishTime !== 0;
                const isAnswerState: boolean =
                  Array.isArray(answerState) && answerState.length > 0;
                return isId && isStartTime && isFinishTime && isAnswerState;
              })();

              if (isConfirm) {
                const answerStateData: IAnswerItem[] = answerState.reduce(
                  (
                    prevAns: IAnswerItem[],
                    currentAns: { id: string; answer: string }
                  ) => {
                    if (
                      checkTypes(currentAns.id, 'string') &&
                      checkTypes(currentAns.answer, 'string')
                    ) {
                      const word: IWordItem | undefined = WORDS_DATA.find(
                        (item) => item.id === currentAns.id
                      );

                      if (word) {
                        return [
                          ...prevAns,
                          {
                            id: currentAns.id,
                            answer: currentAns.answer,
                            solution: word.en,
                            result: currentAns.answer === word.en,
                          },
                        ];
                      }
                    }

                    return [...prevAns];
                  },
                  []
                );

                return [
                  ...prev,
                  {
                    id,
                    startTime,
                    finishTime,
                    answerState: answerStateData,
                  },
                ];
              }
              return [...prev];
            },
            []
          );

          dispatch(setRecordCollection(result));
        }
      }
    },
    [WORDS_DATA]
  );
};

export default useSetRecord;
