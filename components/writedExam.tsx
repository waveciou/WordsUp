/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import ScoreTable from '@/Components/scoreTable';
import WritedExamCard from '@/Components/writedExamCard';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Src/interfaces/word';
import { RootState } from '@/Store/index';

interface IWritedExamProps {
  type?: 'writed-exam' | 'daily-writed-exam';
  quantity: number;
}

const writedExam: React.FC<IWritedExamProps> = ({ type = 'writed-exam', quantity = 10 }) => {
  const router = useRouter();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { dailyWords } = useSelector((state: RootState) => state.daily);
  const [isTexting, setIsTexting] = useState<boolean>(false);
  const [isExamFinish, setIsExamFinish] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IWordItem[]>([]);
  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleExamStart = useCallback(() => {
    setIsExamFinish(false);
    setCurrentTopic(0);
    setAnswerState([]);

    if (type === 'daily-writed-exam') {
      const randomSortData: IWordItem[] = [...dailyWords].sort(() => (Math.random() > 0.5 ? -1 : 1));
      setQuestions(randomSortData);
    } else {
      const randomNumbers: number[] = randomCollection(quantity, WORDS_DATA.length);
      setQuestions(randomNumbers.map((num: number) => WORDS_DATA[num]));
    }

    setIsTexting(true);
  }, [quantity, WORDS_DATA, dailyWords]);

  const handleExamFinish = () => {
    setIsExamFinish(true);
    setCurrentTopic(0);
    setQuestions([]);
    setIsTexting(false);
  };

  const handleToNextQuestion = () => {
    const nextNumber: number = currentTopic + 1;
    if (nextNumber > (quantity - 1)) {
      handleExamFinish();
    } else {
      setCurrentTopic(nextNumber);
    }
  };

  const handleSetAnswer = (answerItem: IAnswerItem) => {
    setAnswerState([...answerState, answerItem]);
    handleToNextQuestion();
  };

  useEffect(() => {
    handleExamStart();
  }, []);

  useEffect(() => {
    const correctItems: IAnswerItem[] = answerState.filter(({ result }) => result === true);
    const correctNumber: number = correctItems.length / answerState.length;
    const amount: number = Number.isNaN(correctNumber) ? 0 : correctNumber;
    const result: number = Math.floor(amount * 100);
    setScore(result);
  }, [answerState]);

  return (
    <div>
      {
        isTexting && (
          <WritedExamCard
            currentTopic={currentTopic}
            wordData={questions[currentTopic]}
            onNext={handleToNextQuestion}
            setAnswer={handleSetAnswer}
          />
        )
      }
      {
        !isTexting && isExamFinish
        && (
          <>
            <div className="tw-text-wine/80 tw-my-8 tw-text-md tw-text-center">
              我的分數：
              {score}
              分
            </div>
            <ScoreTable scoreList={answerState} />
            <div className="tw-my-5 tw-flex tw-justify-center">
              <PrimaryButton text="再次測驗" onClick={handleExamStart} />
              <PrimaryButton text="返回主頁" onClick={() => router.push('/quiz')} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default writedExam;
