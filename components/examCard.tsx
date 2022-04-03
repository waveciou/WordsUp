/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';

import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IAnswerItem } from '@/Interfaces/examination';
import { IWordItem } from '@/Interfaces/word';

interface IExamCardProps {
  wordData: IWordItem,
  onNext: () => void,
  setAnswer: (anwserItem: IAnswerItem) => void
}

const ExamCard: React.FC<IExamCardProps> = ({ wordData, onNext, setAnswer }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result: string = e.target.value.trim();
    setInputValue(result);
  };

  const handleSubmit = () => {
    const result: boolean = !!(inputValue === wordData.en);
    setAnswer({
      id: wordData.id,
      anwser: inputValue,
      solution: wordData.en,
      result,
    });
  };

  const handleNextQuestion = () => {
    setAnswer({
      id: wordData.id,
      anwser: '',
      solution: wordData.en,
      result: false,
    });
    onNext();
  };

  useEffect(() => {
    setInputValue('');
  }, [wordData]);

  return (
    <>
      <div>
        <input type="text" value={inputValue} onChange={handleChange} />
        <div>{ wordData.zh[0] }</div>
        <button type="button" onClick={handleSubmit}>確定</button>
        <button type="button" onClick={handleNextQuestion}>下一題</button>
      </div>
    </>
  );
};

export default ExamCard;
