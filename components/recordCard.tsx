import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/popup';
import ScoreTable from '@/Components/scoreTable';
import { IRecordItem } from '@/Interfaces/exam';

interface IRecordCardProps {
  recordData: IRecordItem
}

const RecordCard: React.FC<IRecordCardProps> = ({ recordData }) => {
  dayjs.extend(utc);
  dayjs.extend(duration);

  const [isShow, setIsShow] = useState<boolean>(false);

  const {
    type,
    startTime,
    finishTime,
    score,
    answerState,
  } = recordData;

  return (
    <>
      <div>{ dayjs(startTime).utcOffset(8).format('YYYY年MM月DD日 HH:mm') }</div>
      <div>{ dayjs(finishTime).utcOffset(8).format('YYYY年MM月DD日 HH:mm') }</div>
      <div>{ dayjs.duration(finishTime - startTime).format('HH:mm:ss') }</div>
    </>
  );
};

export default RecordCard;
