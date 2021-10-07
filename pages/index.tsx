import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Redux
import { RootState } from '../store';

const HomeComponent: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.wordsCollection.value);
  const [today, setToday] = useState<string>('');

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();
    const result: string = `${year}-${month}-${date}`;
    setToday(result);
  }, [day]);

  return (
    <div className="content">
      <div>{today}</div>
    </div>
  );
};

export default HomeComponent;
