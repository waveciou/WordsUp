import React from 'react';
import { useSelector } from 'react-redux';

import WordItemDaily from '@/Components/wordItemDaily';
import randomNumber from '@/Functions/randomNumber';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

// const getRandomWord = (wordsData: IWordItem[], date: string): ICasesWord => {
//   const randomIndex: number = randomNumber(0, wordsData.length - 1);
//   const getterItem: IWordItem = wordsData[randomIndex];
//   return {
//     id: getterItem.id,
//     date,
//     word: getterItem,
//   };
// };

const Home: React.FC = () => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { dateId, dateCaption, dailyWords } = useSelector((state: RootState) => state.daily);

  // const handleRefresh = useCallback(() => {
  //   let result: ICasesWord = {
  //     id: dailyWord.id,
  //     date: dateId,
  //     word: deepCloneObj(dailyWord),
  //   };

  //   while (result.id === dailyWord.id) {
  //     result = getRandomWord(WORDS_DATA, dateId);
  //   }

  //   handleSetDailyWord(result);
  // }, [dailyWord, dateId, WORDS_DATA]);

  return (
    <div className="content size-small tw-py-5">
      {/* <WordItemDaily
        dateCaption={dateCaption}
        wordData={dailyWord}
        onFresh={handleRefresh}
      /> */}
    </div>
  );
};

export default Home;
