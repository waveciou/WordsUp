/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import WordsCaption from '@/Components/wordsCaption';
import { IAnswerItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface IScoreTableProps {
  scoreList: IAnswerItem[]
}

const classDefines: string = 'tw-py-2.5 tw-px-4 tw-leading-relaxed tw-align-middle tw-text-center tw-border tw-border-gray-light tw-border-solid tw-text-xs';

const ScoreTable: React.FC<IScoreTableProps> = ({ scoreList = [] }) => {
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);

  const scoreListMemo = useMemo(() => scoreList.map(({
    id, answer, solution, result,
  }) => {
    const key: string = uuidv4();
    const word: IWordItem = WORDS_DATA.filter((item) => item.id === id)[0];
    return (
      <tr key={key} className="tw-bg-white">
        <td className={classDefines}>
          {
            result ? (
              <div className="tw-text-center before-font-material before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-content-['\e86c'] before:tw-text-mark-green" />
            ) : (
              <div className="tw-text-center before-font-material before:tw-w-6 before:tw-h-6 before:tw-leading-6 before:tw-block before:tw-m-auto before:tw-content-['\e5c9'] before:tw-text-mark-red" />
            )
          }
        </td>
        <td className={classDefines}>
          <div className="tw-min-w-200 tw-m-auto tw-whitespace-normal tablet:tw-min-w-0 tablet:tw-max-w-xs">
            <WordsCaption id={word.id} wordsList={word.zh} partsList={word.parts} />
          </div>
        </td>
        <td className={classDefines}>{ answer === '' ? '-' : answer }</td>
        <td className={classDefines}>{ solution }</td>
      </tr>
    );
  }), [scoreList, WORDS_DATA]);

  return (
    <div className="tw-w-full tw-overflow-x-auto tw-overflow-y-hidden tw-rounded-lg">
      <table className="tw-w-full tw-whitespace-nowrap">
        <thead>
          <tr className="tw-bg-green">
            <th className={`${classDefines} tw-text-white`}>成績</th>
            <th className={`${classDefines} tw-text-white`}>題目</th>
            <th className={`${classDefines} tw-text-white`}>你的答案</th>
            <th className={`${classDefines} tw-text-white`}>正確答案</th>
          </tr>
        </thead>
        <tbody>
          { scoreListMemo }
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
