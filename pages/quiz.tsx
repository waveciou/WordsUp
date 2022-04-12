/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExamCard from '@/Components/examCard';
import ScoreTable from '@/Components/scoreTable';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem } from '@/Interfaces/examination';
import { setIsExamTesting, setQuestions } from '@/Slice/examination';
import { RootState } from '@/Store/index';
import styles from '@/Styles/examination.module.scss';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { isExamTesting, questions } = useSelector((state: RootState) => state.examination);
  const [isExamFinish, setIsExamFinish] = useState<boolean>(false);
  const [quantity] = useState<number>(10);
  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleExamStart = () => {
    const randomNumbers: number[] = randomCollection(quantity, WORDS_DATA.length);
    setIsExamFinish(false);
    setCurrentTopic(0);
    setAnswerState([]);
    dispatch(setQuestions(randomNumbers.map((num: number) => WORDS_DATA[num])));
    dispatch(setIsExamTesting(true));
  };

  const handleExamFinish = () => {
    setIsExamFinish(true);
    setCurrentTopic(0);
    dispatch(setQuestions([]));
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

  const handleSetAnswer = (anwserItem: IAnswerItem) => {
    setAnswerState([...answerState, anwserItem]);
    handleToNextQuestion();
  };

  useEffect(() => () => {
    dispatch(setIsExamTesting(false));
  }, []);

  useEffect(() => {
    const correctItems: IAnswerItem[] = answerState.filter(({ result }) => result === true);
    const correctNumber: number = correctItems.length / answerState.length;
    const amount: number = Number.isNaN(correctNumber) ? 0 : correctNumber;
    const result: number = Math.floor(amount * 100);
    setScore(result);
  }, [answerState]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        {
          isExamTesting
            ? (
              <ExamCard
                currentTopic={currentTopic}
                wordData={questions[currentTopic]}
                onNext={handleToNextQuestion}
                setAnswer={handleSetAnswer}
              />
            )
            : (
              <div>
                {
                  isExamFinish ? (
                    <>
                      <div className="tw-text-wine/80 tw-my-8 tw-text-md tw-text-center">
                        我的成績：
                        {score}
                        分
                      </div>
                      <ScoreTable scoreList={answerState} />
                    </>
                  ) : (
                    <div className="tw-text-wine/80 tw-my-8 tw-text-md tw-text-center">
                      填空測驗（
                      {quantity}
                      題）
                    </div>
                  )
                }
                <div className="tw-my-5 tw-flex tw-justify-center">
                  <button
                    type="button"
                    className={styles.button}
                    onClick={handleExamStart}
                  >
                    {isExamFinish ? '再次測驗' : '開始測驗'}
                  </button>
                </div>
              </div>
            )
        }
      </div>
    </>
  );
};

export default Quiz;
