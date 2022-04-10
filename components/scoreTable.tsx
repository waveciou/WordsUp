import React from 'react';

import { IAnswerItem } from '@/Interfaces/examination';

interface IScoreTableProps {
  scoreList: IAnswerItem[]
}

const classDefines: string = 'tw-py-2.5 tw-px-4 tw-leading-relaxed tw-align-middle tw-text-center tw-border tw-border-white tw-border-solid tw-text-xs';

const scoreTable: React.FC<IScoreTableProps> = ({ scoreList }) => (
  <div className="tw-w-full tw-overflow-x-auto tw-overflow-y-hidden">
    <table className="tw-w-full tw-whitespace-nowrap">
      <thead>
        <tr className="tw-bg-gray-light">
          <th className={classDefines}>成績</th>
          <th className={classDefines}>題目</th>
          <th className={classDefines}>你的答案</th>
          <th className={classDefines}>正確答案</th>
        </tr>
      </thead>
      <tbody>
        {
          scoreList.map(({
            id, anwser, solution, result,
          }) => (
            <tr className="tw-bg-gray-light">
              <td className={classDefines}>{ `${result}` }</td>
              <td className={classDefines}>{ id }</td>
              <td className={classDefines}>{ anwser }</td>
              <td className={classDefines}>{ solution }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default scoreTable;
