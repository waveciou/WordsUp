import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Redux
import { RootState } from '../store';

// Function
import handleGetRandomNumber from '../src/functions/handleGetRandomNumber';

const HomeComponent: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [todate, setTodate] = useState<string>('');

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();
    const result: string = `${year}-${month}-${date}`;
    setTodate(result);
  }, [day]);

  useEffect(() => {
    if (!!todate && WORDS_DATA.length) {
      const randomIndex: number = handleGetRandomNumber(0, WORDS_DATA.length - 1);
      const today = WORDS_DATA[randomIndex];
    }
  }, [todate, WORDS_DATA]);

  return (
    <div className="content">
      <div>{todate}</div>
    </div>
  );
};

export default HomeComponent;
