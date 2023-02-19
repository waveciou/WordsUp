import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ScoreTable from '@/Components/scoreTable';
import Alert from '@/Components/utils/alert';
import { PrimaryButton } from '@/Components/utils/form';
import Popup from '@/Components/utils/popup';
import getExamName from '@/Functions/examName';
import getExamScore from '@/Functions/examScore';
import { IRecordItem } from '@/Interfaces/exam';
import { deleteRecordItem, setIsExamAction } from '@/Slice/exam';

interface IRecordCardProps {
  recordData: IRecordItem;
}

const RecordCard: React.FC<IRecordCardProps> = ({ recordData }) => {
  dayjs.extend(utc);
  dayjs.extend(duration);

  const router = useRouter();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<string>('');
  const [durationTime, setDurationTime] = useState<string>('');

  const { id, startTime, finishTime, answerState } = recordData;

  useEffect(() => {
    const time: string = dayjs(startTime)
      .utcOffset(8)
      .format('YYYY年MM月DD日 HH:mm');
    setTestTime(time);
  }, [startTime]);

  useEffect(() => {
    const time: string = dayjs
      .duration(finishTime - startTime)
      .format('HH:mm:ss');
    setDurationTime(time);
  }, [startTime, finishTime]);

  return (
    <>
      <div
        className="w-full flex items-center py-3 px-4 rounded-lg cursor-pointer shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]"
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className="w-16 tablet:w-24 text-green-dark">
          <span className="leading-relaxed text-lg tablet:text-xl">
            {getExamScore(answerState)}
          </span>
          <span className="text-xs">分</span>
        </div>
        <div className="w-[calc(100%-4rem)] tablet:w-[calc(100%-6rem)] overflow-hidden pl-1">
          <div className="truncate leading-relaxed text-sm tablet:text-base text-wine">
            {getExamName(id)}
          </div>
          <div className="truncate leading-relaxed text-xxs tablet:text-xs text-black">
            {testTime}
          </div>
        </div>
      </div>

      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <div>
          <div className="w-full text-center text-wine text-base tablet:text-lg leading-relaxed mb-4">
            {getExamName(id)}
          </div>

          <div className="text-xs tablet:text-xs p-2 tablet:p-4 mb-4 border border-gray-light border-solid rounded-lg">
            <dl className="flex items-center flex-wrap mb-2">
              <dt className="flex items-center before-font-material before:content-['\e8e8'] before:block before:mr-2">
                分數：
              </dt>
              <dd>{getExamScore(answerState)} 分</dd>
            </dl>
            <dl className="flex items-center flex-wrap mb-2">
              <dt className="flex items-center before-font-material before:content-['\f045'] before:block before:mr-2">
                題數：
              </dt>
              <dd>{answerState.length} 題</dd>
            </dl>
            <dl className="flex items-center flex-wrap mb-2">
              <dt className="flex items-center before-font-material before:content-['\e924'] before:block before:mr-2">
                測驗時間：
              </dt>
              <dd>{testTime}</dd>
            </dl>
            <dl className="flex items-center flex-wrap">
              <dt className="flex items-center before-font-material before:content-['\e425'] before:block before:mr-2">
                作答時間：
              </dt>
              <dd>{durationTime}</dd>
            </dl>
          </div>

          <ScoreTable scoreList={answerState} />

          <div className="mt-5 flex justify-center">
            <PrimaryButton
              text="重新挑戰"
              onClick={async () => {
                await dispatch(setIsExamAction(true));
                await router.push(`/quiz/${id}`);
              }}
            />
            <PrimaryButton
              text="刪除紀錄"
              colorStyle="red"
              onClick={() => setIsShowDeleteAlert(true)}
            />
          </div>
        </div>
      </Popup>

      <Alert
        show={isShowDeleteAlert}
        title="確定要刪除這筆紀錄？"
        content="此動作將無法復原"
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => {
          setIsShow(false);
          dispatch(deleteRecordItem(startTime));
        }}
        onCancel={() => setIsShowDeleteAlert(false)}
      />
    </>
  );
};

export default RecordCard;
