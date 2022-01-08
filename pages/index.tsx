import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Redux
import { RootState } from '../store';

// Interface
import { IWordCase } from '../src/interfaces/I_WordCase';

// Component
import WordDetail from '../components/WordDetail';

// Function
import handleGetRandomNumber from '../src/functions/getRandomNumber';
import { getItemWithObject, setItemWithObject } from '../src/functions/localStorage';

interface ILocalCase {
  date: string;
  case: IWordCase;
}

const caseTemplate: IWordCase = {
  chinese: '',
  chineseExample: [],
  english: '',
  englishExample: [],
  parts: [],
  status: [],
};

const handleGetRandomWordCase = (WORDS_DATA: IWordCase[], todayDate: string) => {
  const randomIndex: number = handleGetRandomNumber(0, WORDS_DATA.length - 1);
  const todayWordCase: IWordCase = WORDS_DATA[randomIndex];
  const result: ILocalCase = {
    date: todayDate,
    case: todayWordCase,
  };
  return result;
};

const HomeComponent: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [todayDate, setTodayDate] = useState<string>('');
  const [todayCase, setTodayCase] = useState<IWordCase>(JSON.parse(JSON.stringify(caseTemplate)));

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();
    const result: string = `${year}-${month}-${date}`;
    setTodayDate(result);
  }, [day]);

  useEffect(() => {
    if (!!todayDate && WORDS_DATA.length) {
      let result: ILocalCase = {
        date: '',
        case: JSON.parse(JSON.stringify(caseTemplate)),
      };

      if (!!getItemWithObject('dailyWordCase') === true) {
        const localWordCase: ILocalCase = getItemWithObject('dailyWordCase') as ILocalCase;

        if (localWordCase.date !== todayDate) {
          result = handleGetRandomWordCase(WORDS_DATA, todayDate);
        } else {
          result = localWordCase;
        }
      } else {
        result = handleGetRandomWordCase(WORDS_DATA, todayDate);
      }

      setItemWithObject('dailyWordCase', result);
      setTodayCase(result.case);
    }
  }, [todayDate, WORDS_DATA]);

  return (
    <div className="content">
      <div>{ todayDate }</div>
      <WordDetail word={todayCase} />
    </div>
  );
};

export default HomeComponent;
