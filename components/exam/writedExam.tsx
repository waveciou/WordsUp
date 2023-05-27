import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WritedExamCard from '@/Components/exam/writedExamCard';
import ScoreTable from '@/Components/scoreTable';
import { PrimaryButton } from '@/Components/utils/form';
import getExamName from '@/Functions/examName';
import getExamScore from '@/Functions/examScore';
import useQuestions from '@/Hooks/useQuestions';
import { EnumWritedExamID, IAnswerItem, IRecordItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { setIsExamTesting, setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IWritedExamProps {
  id: EnumWritedExamID;
  quantity: number;
}

const WritedExam: React.FC<IWritedExamProps> = ({
  id = EnumWritedExamID.RANDOM,
  quantity = 10,
}) => {
  dayjs.extend(duration);

  const day = dayjs();
  const router = useRouter();
  const dispatch = useDispatch();
  const getQuestions = useQuestions();
  const { isExamTesting, recordCollection } = useSelector(
    (state: RootState) => state.exam
  );

  const [questions, setQuestions] = useState<IWordItem[]>([]);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [durationTime, setDurationTime] = useState<string>('');
  const initTimeoutRef = useRef<number>(0);

  const handleExamStart = () => {
    dispatch(setIsExamTesting(false));

    // Reset Setting
    setIsLoading(true);
    setIsFinish(false);
    setCurrentIndex(0);
    setAnswerState([]);
    setDurationTime('');

    // Get Questions
    setQuestions(getQuestions(id, quantity));

    // Complete
    setStartTime(day.valueOf());

    initTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      dispatch(setIsExamTesting(true));
    }, 600) as unknown as number;
  };

  const handleExamFinish = () => {
    setCurrentIndex(0);
    setQuestions([]);
    setIsFinish(true);

    dispatch(setIsExamTesting(false));
  };

  const handleToNextQuestion = () => {
    const nextNumber: number = currentIndex + 1;
    if (nextNumber > quantity - 1) {
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
      clearTimeout(initTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFinish && answerState.length === quantity) {
      const finishTime: number = day.valueOf();

      const result: IRecordItem[] = [
        {
          id,
          startTime,
          finishTime,
          answerState: [...answerState],
        },
        ...recordCollection,
      ];

      setDurationTime(
        dayjs.duration(finishTime - startTime).format('HH:mm:ss')
      );
      dispatch(setRecordCollection(result));
    }
  }, [answerState, isFinish]);

  return (
    <div>
      {isLoading && (
        <div className="text-center text-green-dark py-10">資料載入中...</div>
      )}
      {!isLoading && isExamTesting && (
        <WritedExamCard
          examId={id}
          currentIndex={currentIndex}
          wordItem={questions[currentIndex]}
          setAnswer={handleSetAnswer}
        />
      )}
      {!isLoading && !isExamTesting && isFinish && (
        <>
          <div className="text-wine my-6 text-md text-center">
            {getExamName(id)}
          </div>
          <div className="w-full mb-2 text-base text-green-dark text-center flex items-center justify-center before-font-material before:content-['\e8e8'] before:block before:mr-2">
            我的分數：
            {getExamScore(answerState)}分
          </div>
          <div className="mb-8 text-center text-xs text-gray-dark">
            作答時間：
            {durationTime}
          </div>
          <ScoreTable scoreList={answerState} />
          <div className="my-5 flex justify-center">
            <PrimaryButton text="再次測驗" onClick={handleExamStart} />
            <PrimaryButton text="離開測驗" onClick={() => router.back()} />
          </div>
        </>
      )}
    </div>
  );
};

export default WritedExam;
