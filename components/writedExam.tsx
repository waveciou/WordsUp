/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import ScoreTable from '@/Components/scoreTable';
import WritedExamCard from '@/Components/writedExamCard';
import getExamName from '@/Functions/examName';
import getExamScore from '@/Functions/examScore';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem, IRecordItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { setIsExamTesting, setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IWritedExamProps {
  id: 'writed-exam' | 'daily-writed-exam';
  quantity: number;
}

const WritedExam: React.FC<IWritedExamProps> = ({ id = 'writed-exam', quantity = 10 }) => {
  const day = dayjs();
  const router = useRouter();
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILY_WORDS = useSelector((state: RootState) => state.daily.dailyWords);
  const { isExamTesting, recordCollection } = useSelector((state: RootState) => state.exam);

  const [questions, setQuestions] = useState<IWordItem[]>([]);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const handleExamStart = useCallback(() => {
    dispatch(setIsExamTesting(false));

    setIsLoading(true);
    setIsFinish(false);
    setCurrentIndex(0);
    setAnswerState([]);

    switch (id) {
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

    setStartTime(day.valueOf());
    setIsLoading(false);
    dispatch(setIsExamTesting(true));
  }, [quantity, WORDS_DATA, DAILY_WORDS]);

  const handleExamFinish = () => {
    setCurrentIndex(0);
    setQuestions([]);
    setIsFinish(true);

    dispatch(setIsExamTesting(false));
  };

  const handleToNextQuestion = () => {
    const nextNumber: number = currentIndex + 1;
    if (nextNumber > (quantity - 1)) {
      handleExamFinish();
    } else {
      setCurrentIndex(nextNumber);
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
    if (isFinish && answerState.length === quantity) {
      const result: IRecordItem[] = [{
        id,
        startTime,
        finishTime: day.valueOf(),
        answerState: [...answerState],
      }, ...recordCollection];

      dispatch(setRecordCollection(result));
    }
  }, [answerState, isFinish]);

  return (
    <div>
      {
        isLoading && <div className="tw-text-center tw-text-green tw-py-8">資料載入中...</div>
      }
      {
        !isLoading && isExamTesting && (
          <WritedExamCard
            currentIndex={currentIndex}
            wordData={questions[currentIndex]}
            setAnswer={handleSetAnswer}
          />
        )
      }
      {
        !isLoading && !isExamTesting && isFinish
        && (
          <>
            <div className="tw-text-wine/80 tw-my-6 tw-text-md tw-text-center">
              {getExamName(id)}
            </div>
            <div className="tw-w-full tw-mb-8 tw-text-base tw-text-green-dark tw-text-center tw-flex tw-items-center tw-justify-center before-font-material before:tw-content-['\e8e8'] before:tw-block before:tw-mr-2">
              我的分數：
              { getExamScore(answerState) }
              分
            </div>
            <ScoreTable scoreList={answerState} />
            <div className="tw-my-5 tw-flex tw-justify-center">
              <PrimaryButton text="再次測驗" onClick={handleExamStart} />
              <PrimaryButton text="離開測驗" onClick={() => router.back()} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default WritedExam;
