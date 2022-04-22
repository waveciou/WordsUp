import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';

import Popup from '@/Components/popup';
import ScoreTable from '@/Components/scoreTable';
import getExamName from '@/Functions/examName';
import getExamScore from '@/Functions/examScore';
import { IRecordItem } from '@/Interfaces/exam';

interface IRecordCardProps {
  recordData: IRecordItem
}

const RecordCard: React.FC<IRecordCardProps> = ({ recordData }) => {
  dayjs.extend(utc);
  dayjs.extend(duration);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<string>('');
  const [durationTime, setDurationTime] = useState<string>('');

  const {
    id,
    startTime,
    finishTime,
    answerState,
  } = recordData;

  useEffect(() => {
    const time: string = dayjs(startTime).utcOffset(8).format('YYYY年MM月DD日 HH:mm');
    setTestTime(time);
  }, [startTime]);

  useEffect(() => {
    const time: string = dayjs.duration(finishTime - startTime).format('HH:mm:ss');
    setDurationTime(time);
  }, [startTime, finishTime]);

  return (
    <>
      <div
        className="tw-w-full tw-flex tw-items-center tw-p-3 tw-rounded-lg tw-cursor-pointer tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]"
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className="tw-w-16 tablet:tw-w-24 tw-text-green-dark">
          <span className="tw-leading-relaxed tw-text-lg tablet:tw-text-xl">{ getExamScore(answerState) }</span>
          <span className="tw-text-xs">分</span>
        </div>
        <div className="tw-w-[calc(100%-4rem)] tablet:tw-w-[calc(100%-6rem)] tw-overflow-hidden tw-pl-1">
          <div className="tw-truncate tw-leading-relaxed tw-text-sm tablet:tw-text-base tw-text-wine">{ getExamName(id) }</div>
          <div className="tw-truncate tw-leading-relaxed tw-text-xxs tablet:tw-text-xs tw-text-black">{ testTime }</div>
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <div>
          <div className="tw-w-full tw-text-center tw-text-wine tw-text-base tablet:tw-text-lg tw-leading-relaxed tw-pb-4">{ getExamName(id) }</div>
          <div className="tw-text-xs tablet:tw-text-sm tw-pb-4">
            <dl className="tw-flex tw-items-center tw-flex-wrap tw-mb-2">
              <dt>分數：</dt>
              <dd>
                { getExamScore(answerState) }
                分
              </dd>
            </dl>
            <dl className="tw-flex tw-items-center tw-flex-wrap tw-mb-2">
              <dt>題數：</dt>
              <dd>
                { answerState.length }
                題
              </dd>
            </dl>
            <dl className="tw-flex tw-items-center tw-flex-wrap tw-mb-2">
              <dt>測驗時間：</dt>
              <dd>{ testTime }</dd>
            </dl>
            <dl className="tw-flex tw-items-center tw-flex-wrap tw-mb-2">
              <dt>作答時間：</dt>
              <dd>{ durationTime }</dd>
            </dl>
          </div>
          <ScoreTable scoreList={answerState} />
        </div>
      </Popup>
    </>
  );
};

export default RecordCard;
