import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import WordItemDaily from '@/Components/wordItemDaily';
import formatNumber from '@/Functions/formatNumber';
import randomNumber from '@/Functions/randomNumber';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface ICasesWord {
  id: string,
  date: string,
  word: IWordItem
}

const wordTemplate: IWordItem = {
  id: '',
  en: '',
  zh: [],
  parts: [],
  alphabet: '',
};

const getRandomWord = (wordsData: IWordItem[], date: string): ICasesWord => {
  const randomIndex: number = randomNumber(0, wordsData.length - 1);
  const getterItem: IWordItem = wordsData[randomIndex];
  return {
    id: getterItem.id,
    date,
    word: getterItem,
  };
};

const Home: React.FC = () => {
  dayjs.extend(utc);
  const day = dayjs();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  const [dateId, setDateId] = useState<string>('');
  const [dateCaption, setDateCaption] = useState<string>('');
  const [dailyWord, setDailyWord] = useState<IWordItem>(JSON.parse(JSON.stringify(wordTemplate)));

  useEffect(() => {
    const year: number = day.utcOffset(8).year();
    const month: number = day.utcOffset(8).month() + 1;
    const date: number = day.utcOffset(8).date();

    setDateId(`${year}-${month}-${date}`);
    setDateCaption(`${year}年${formatNumber(month)}月${formatNumber(date)}日`);
  }, [day]);

  useEffect(() => {
    if (!!dateId && WORDS_DATA.length > 0) {
      const localData: string = localStorage.getItem('dailyWord') || '';

      let result: ICasesWord = {
        id: '',
        date: '',
        word: JSON.parse(JSON.stringify(wordTemplate)),
      };

      if (!!localStorage.getItem('dailyWord') === true) {
        const { id, date } : {
          id: string,
          date: string
        } = JSON.parse(localData);

        if (date === dateId) {
          result = { id, date, word: WORDS_DATA.filter((item) => item.id === id)[0] };
        } else {
          result = getRandomWord(WORDS_DATA, dateId);
        }
      } else {
        result = getRandomWord(WORDS_DATA, dateId);
      }

      const { id, date, word } = result;

      setDailyWord(word);
      localStorage.setItem('dailyWord', JSON.stringify({ id, date }));
    }
  }, [dateId, WORDS_DATA]);

  return (
    <div className="content size-small theme-f-home">
      <WordItemDaily dateCaption={dateCaption} wordData={dailyWord} />
    </div>
  );
};

export default Home;
