/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExamCard from '@/Components/examCard';
import randomCollection from '@/Functions/randomCollection';
import { IAnswerItem } from '@/Interfaces/examination';
import { setIsExamTesting, setQuestions } from '@/Slice/examination';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const { isExamTesting, questions } = useSelector((state: RootState) => state.examination);

  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [answerState, setAnswerState] = useState<IAnswerItem[]>([]);

  const handleExamStart = () => {
    const randomNumbers: number[] = randomCollection(10, WORDS_DATA.length);
    setCurrentTopic(0);
    setAnswerState([]);
    dispatch(setQuestions(randomNumbers.map((num: number) => WORDS_DATA[num])));
    dispatch(setIsExamTesting(true));
  };

  const handleExamFinish = () => {
    setCurrentTopic(0);
    dispatch(setQuestions([]));
    dispatch(setIsExamTesting(false));
  };

  const handleToNextQuestion = () => {
    const nextNumber: number = currentTopic + 1;
    if (nextNumber > (10 - 1)) {
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
    console.log(answerState);
  }, [answerState]);

  return (
    <>
      <h1 className="title">Examination</h1>
      <div className="content">
        {
          isExamTesting
            ? (
              <ExamCard
                wordData={questions[currentTopic]}
                onNext={handleToNextQuestion}
                setAnswer={handleSetAnswer}
              />
            )
            : (<button type="button" onClick={handleExamStart}>開始測驗</button>)
        }
      </div>
    </>
  );
};

export default Quiz;
