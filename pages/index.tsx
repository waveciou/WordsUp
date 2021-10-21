import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Redux
import { RootState } from '../store';

// Interface
import { IWordCase } from '../src/interfaces/I_WordCase';

// Function
import handleGetRandomNumber from '../src/functions/handleGetRandomNumber';
import { getItemWithObject, setItemWithObject } from '../src/functions/handleLocalStorage';

interface ILocalWordCase {
  date: string;
  wordCase: IWordCase;
}

const handleGetRandomWordCase = (WORDS_DATA: IWordCase[], todayText: string) => {
  const randomIndex: number = handleGetRandomNumber(0, WORDS_DATA.length - 1);
  const todayWordCase: IWordCase = WORDS_DATA[randomIndex];
  const result: ILocalWordCase = {
    date: todayText,
    wordCase: todayWordCase,
  };
  return result;
};

const HomeComponent: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [todayText, setTodayText] = useState<string>('');

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();
    const result: string = `${year}-${month}-${date}`;
    setTodayText(result);
  }, [day]);

  useEffect(() => {
    if (!!todayText && WORDS_DATA.length) {
      let result: ILocalWordCase | {} = {};

      if (!!getItemWithObject('dailyWordCase') === true) {
        const localWordCase: ILocalWordCase = getItemWithObject('dailyWordCase') as ILocalWordCase;

        if (localWordCase.date !== todayText) {
          result = handleGetRandomWordCase(WORDS_DATA, todayText);
        } else {
          result = localWordCase;
        }
      } else {
        result = handleGetRandomWordCase(WORDS_DATA, todayText);
      }
      setItemWithObject('dailyWordCase', result);
    }
  }, [todayText, WORDS_DATA]);

  return (
    <div className="content">
      <div>{todayText}</div>
    </div>
  );
};

export default HomeComponent;
