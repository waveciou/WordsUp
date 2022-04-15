/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScoreTable from '@/Components/scoreTable';
import WritedExamCard from '@/Components/writedExamCard';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem } from '@/Interfaces/examination';
import { setIsExamTesting } from '@/Slice/examination';
import { IWordItem } from '@/Src/interfaces/word';
import { RootState } from '@/Store/index';
import stylesButton from '@/Styles/button.module.scss';

interface IWritedExamProps {
  quantity: number;
  onCancelExam: () => void;
}

const writedExam: React.FC<IWritedExamProps> = ({
  quantity = 10,
  onCancelExam = () => {},
}) => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { isExamTesting } = useSelector((state: RootState) => state.examination);
  const [isExamFinish, setIsExamFinish] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IWordItem[]>([]);
  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleExamStart = () => {
    const randomNumbers: number[] = randomCollection(quantity, WORDS_DATA.length);
    setIsExamFinish(false);
    setCurrentTopic(0);
    setAnswerState([]);
    setQuestions(randomNumbers.map((num: number) => WORDS_DATA[num]));
    dispatch(setIsExamTesting(true));
  };

  const handleExamFinish = () => {
    setIsExamFinish(true);
    setCurrentTopic(0);
    setQuestions([]);
    dispatch(setIsExamTesting(false));
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
            onNext={handleToNextQuestion}
            setAnswer={handleSetAnswer}
          />
        )
      }
      {
        !isExamTesting && isExamFinish
        && (
          <>
            <div className="tw-text-wine/80 tw-my-8 tw-text-md tw-text-center">
              我的分數：
              {score}
              分
            </div>
            <ScoreTable scoreList={answerState} />
            <div className="tw-my-5 tw-flex tw-justify-center">
              <button
                type="button"
                className={stylesButton['basic-btn']}
                onClick={handleExamStart}
              >
                再次測驗
              </button>
              <button
                type="button"
                className={stylesButton['basic-btn']}
                onClick={onCancelExam}
              >
                返回主頁
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default writedExam;
