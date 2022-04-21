import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/popup';
import ScoreTable from '@/Components/scoreTable';
import { IRecordItem } from '@/Interfaces/exam';

interface IRecordCardProps {
  recordData: IRecordItem
}

const RecordCard: React.FC<IRecordCardProps> = ({ recordData }) => {
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
      <div>123</div>
    </>
  );
};

export default RecordCard;
