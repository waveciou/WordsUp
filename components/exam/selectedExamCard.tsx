import React, { useEffect, useState } from 'react';

import { IAnswerItem, IExamId, ISelectedWordItem } from '@/Interfaces/exam';

interface ISelectedExamCardProps {
  examId: IExamId;
  currentIndex: number,
  wordItem: ISelectedWordItem,
  setAnswer: (answerItem: IAnswerItem) => void,
}

const SelectedExamCard: React.FC<ISelectedExamCardProps> = ({
  examId, currentIndex, wordItem, setAnswer,
}) => {
  const a = 0;
  return <></>;
};

export default SelectedExamCard;
