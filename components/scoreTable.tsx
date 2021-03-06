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
  'tw-py-2.5 tw-px-4 tw-leading-relaxed tw-align-middle tw-text-center tw-border tw-border-gray-light tw-border-solid tw-text-xs';

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
              <tr key={key} className="tw-bg-white">
                <td className={classDefines}>
                  {result === true ? (
                    <div className="tw-text-center before-font-material before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-content-['\e86c'] before:tw-text-green-light" />
                  ) : (
                    <div className="tw-text-center before-font-material before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-content-['\e5c9'] before:tw-text-red" />
                  )}
                </td>
                <td className={classDefines}>
                  <div className="tw-min-w-200 tw-m-auto tw-whitespace-normal tablet:tw-min-w-0 tablet:tw-max-w-xs">
                    <WordsCaption
                      id={id}
                      wordsList={word.zh}
                      partsList={word.parts}
                    />
                  </div>
                </td>
                <td className={classDefines}>
                  <span className={!result && answer ? 'tw-text-red' : ''}>
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
    <div className="tw-w-full tw-overflow-x-auto tw-overflow-y-hidden tw-rounded-lg">
      <table className="tw-w-full tw-whitespace-nowrap">
        <thead>
          <tr className="tw-bg-green">
            <th className={`${classDefines} tw-text-white`}>??????</th>
            <th className={`${classDefines} tw-text-white`}>??????</th>
            <th className={`${classDefines} tw-text-white`}>????????????</th>
            <th className={`${classDefines} tw-text-white`}>????????????</th>
          </tr>
        </thead>
        <tbody>{scoreListMemo}</tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
