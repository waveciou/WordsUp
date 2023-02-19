import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import WordsCaption from '@/Components/wordsCaption';
import { IAnswerItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface IScoreTableProps {
  scoreList: IAnswerItem[];
}

const classDefines: string =
  'py-2.5 px-4 leading-relaxed align-middle text-center border border-gray-light border-solid text-xs';

const ScoreTable: React.FC<IScoreTableProps> = ({ scoreList = [] }) => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  const scoreListMemo = useMemo(
    () =>
      scoreList.map(({ id, answer, solution, result }) => {
        const key: string = uuidv4();
        const word: IWordItem | undefined = WORDS_DATA.find(
          (item) => item.id === id
        );

        return (
          <>
            {word ? (
              <tr key={key} className="bg-white">
                <td className={classDefines}>
                  {result === true ? (
                    <div className="text-center before-font-material before:w-6 before:h-6 before:leading-6 before:block before:m-auto before:content-['\e86c'] before:text-green-light" />
                  ) : (
                    <div className="text-center before-font-material before:w-6 before:h-6 before:leading-6 before:block before:m-auto before:content-['\e5c9'] before:text-red" />
                  )}
                </td>
                <td className={classDefines}>
                  <div className="min-w-200 m-auto whitespace-normal tablet:min-w-0 tablet:max-w-xs">
                    <WordsCaption
                      id={id}
                      wordsList={word.zh}
                      partsList={word.parts}
                    />
                  </div>
                </td>
                <td className={classDefines}>
                  <span className={!result && answer ? 'text-red' : ''}>
                    {answer === '' ? '-' : answer}
                  </span>
                </td>
                <td className={classDefines}>
                  <span>{solution}</span>
                </td>
              </tr>
            ) : (
              <></>
            )}
          </>
        );
      }),
    [scoreList, WORDS_DATA]
  );

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden rounded-lg">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-green">
            <th className={`${classDefines} text-white`}>成績</th>
            <th className={`${classDefines} text-white`}>題目</th>
            <th className={`${classDefines} text-white`}>你的答案</th>
            <th className={`${classDefines} text-white`}>正確答案</th>
          </tr>
        </thead>
        <tbody>{scoreListMemo}</tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
