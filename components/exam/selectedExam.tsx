import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectedExamCard from '@/Components/exam/selectedExamCard';
import ScoreTable from '@/Components/scoreTable';
import { PrimaryButton } from '@/Components/utils/form';
import getExamName from '@/Functions/examName';
import getExamScore from '@/Functions/examScore';
import randomNumber from '@/Functions/randomNumber';
import useQuestions from '@/Hooks/useQuestions';
import { IAnswerItem, IRecordItem, ISelectedExamId, ISelectedWordItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { setIsExamTesting, setRecordCollection } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface ISelectedExamProps {
  id: ISelectedExamId;
  quantity: number;
}

const SelectedExam: React.FC<ISelectedExamProps> = ({
  id = 'selected-random',
  quantity = 10,
}) => {
  dayjs.extend(duration);

  const day = dayjs();
  const router = useRouter();
  const dispatch = useDispatch();
  const getQuestions = useQuestions();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { isExamTesting, recordCollection } = useSelector(
    (state: RootState) => state.exam
  );

  const [questions, setQuestions] = useState<ISelectedWordItem[]>([]);
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
    const questionGetter: IWordItem[] = getQuestions(id, quantity);
    const questionReselt: ISelectedWordItem[] = questionGetter.map(
      (wordItem) => {
        const options: string[] = [wordItem.en];

        while (options.length < 4) {
          const { en } = WORDS_DATA[randomNumber(0, WORDS_DATA.length - 1)];
          const optionsSet: Set<string> = new Set(...options);

          if (!optionsSet.has(en)) {
            options.push(en);
          }
        }

        return {
          ...wordItem,
          options: options.sort(() => (Math.random() > 0.5 ? -1 : 1)),
        };
      }
    );

    setQuestions(questionReselt);

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
        <div className="tw-text-center tw-text-green-dark tw-py-10">
          ???????????????...
        </div>
      )}
      {!isLoading && isExamTesting && (
        <SelectedExamCard
          examId={id}
          currentIndex={currentIndex}
          wordItem={questions[currentIndex]}
          setAnswer={handleSetAnswer}
        />
      )}
      {!isLoading && !isExamTesting && isFinish && (
        <>
          <div className="tw-text-wine tw-my-6 tw-text-md tw-text-center">
            {getExamName(id)}
          </div>
          <div className="tw-w-full tw-mb-2 tw-text-base tw-text-green-dark tw-text-center tw-flex tw-items-center tw-justify-center before-font-material before:tw-content-['\e8e8'] before:tw-block before:tw-mr-2">
            ???????????????
            {getExamScore(answerState)}???
          </div>
          <div className="tw-mb-8 tw-text-center tw-text-xs tw-text-gray-dark">
            ???????????????
            {durationTime}
          </div>
          <ScoreTable scoreList={answerState} />
          <div className="tw-my-5 tw-flex tw-justify-center">
            <PrimaryButton text="????????????" onClick={handleExamStart} />
            <PrimaryButton text="????????????" onClick={() => router.back()} />
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedExam;
