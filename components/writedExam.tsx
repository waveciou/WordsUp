/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import ScoreTable from '@/Components/scoreTable';
import WritedExamCard from '@/Components/writedExamCard';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem, IRecordItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { setIsExamTesting, setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IWritedExamProps {
  type?: 'writed-exam' | 'daily-writed-exam';
  quantity: number;
}

const writedExam: React.FC<IWritedExamProps> = ({ type = 'writed-exam', quantity = 10 }) => {
  dayjs.extend(utc);

  const day = dayjs();
  const router = useRouter();
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILY_WORDS = useSelector((state: RootState) => state.daily.dailyWords);
  const { isExamTesting, recordCollection } = useSelector((state: RootState) => state.exam);

  const [questions, setQuestions] = useState<IWordItem[]>([]);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const handleExamStart = useCallback(() => {
    dispatch(setIsExamTesting(false));

    setIsFinish(false);
    setCurrentTopic(0);
    setAnswerState([]);

    switch (type) {
    case 'daily-writed-exam': {
      // 今日單字填空測驗
      const randomSortData: IWordItem[] = [...DAILY_WORDS].sort(() => (Math.random() > 0.5 ? -1 : 1));
      setQuestions(randomSortData);
      break;
    }
    default: {
      // 單字填空測驗
      const randomNumbers: number[] = randomCollection(quantity, WORDS_DATA.length);
      setQuestions(randomNumbers.map((num: number) => WORDS_DATA[num]));
      break;
    }
    }

    setStartTime(day.utcOffset(8).unix());
    dispatch(setIsExamTesting(true));
  }, [quantity, WORDS_DATA, DAILY_WORDS]);

  const handleExamFinish = useCallback(() => {
    const recordData: IRecordItem[] = [...recordCollection, {
      type,
      startTime,
      finishTime: day.utcOffset(8).unix(),
      score,
      answerState: [...answerState],
    }];

    setCurrentTopic(0);
    setQuestions([]);
    setIsFinish(true);

    dispatch(setRecordCollection(recordData));
    dispatch(setIsExamTesting(false));
  }, [type, startTime, score, answerState, recordCollection]);

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
    return () => {
      dispatch(setIsExamTesting(false));
    };
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
        isExamTesting && (
          <WritedExamCard
            currentTopic={currentTopic}
            wordData={questions[currentTopic]}
            setAnswer={handleSetAnswer}
          />
        )
      }
      {
        !isExamTesting && isFinish
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
