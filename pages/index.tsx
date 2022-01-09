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

// Style
import styles from '../styles/components/DailyWord.module.scss';

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

const handleGetRandomWordCase = (WORDS_DATA: IWordCase[], todayId: string) => {
  const randomIndex: number = handleGetRandomNumber(0, WORDS_DATA.length - 1);
  const todayWordCase: IWordCase = WORDS_DATA[randomIndex];
  const result: ILocalCase = {
    date: todayId,
    case: todayWordCase,
  };
  return result;
};

const HomeComponent: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [todayId, setTodayId] = useState<string>('');
  const [todayDate, setTodayDate] = useState<string>('');
  const [todayCase, setTodayCase] = useState<IWordCase>(JSON.parse(JSON.stringify(caseTemplate)));

  const formatNumber = (amount: number) => {
    if (amount < 10) {
      return `0${amount}`;
    }
    return `${amount}`;
  };

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();
    const id: string = `${year}-${month}-${date}`;
    const dateText: string = `${year}年${formatNumber(month)}月${formatNumber(date)}日`;

    setTodayId(id);
    setTodayDate(dateText);
  }, [day]);

  useEffect(() => {
    if (!!todayId && WORDS_DATA.length) {
      let result: ILocalCase = {
        date: '',
        case: JSON.parse(JSON.stringify(caseTemplate)),
      };

      if (!!getItemWithObject('dailyWordCase') === true) {
        const localWordCase: ILocalCase = getItemWithObject('dailyWordCase') as ILocalCase;

        if (localWordCase.date !== todayId) {
          result = handleGetRandomWordCase(WORDS_DATA, todayId);
        } else {
          result = localWordCase;
        }
      } else {
        result = handleGetRandomWordCase(WORDS_DATA, todayId);
      }

      setItemWithObject('dailyWordCase', result);
      setTodayCase(result.case);
    }
  }, [todayId, WORDS_DATA]);

  return (
    <div className="content">
      <div className={styles.dailyWord__header}>
        <div className={styles.dailyWord__title}>
          今日單字
        </div>
        <div className={styles.dailyWord__date}>{ todayDate }</div>
      </div>
      <div className={styles.dailyWord__wrap}>
        <WordDetail word={todayCase} />
      </div>
    </div>
  );
};

export default HomeComponent;
