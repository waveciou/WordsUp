/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WritedExam from '@/Components/writedExam';
import { IQuizTypes } from '@/Interfaces/exam';
import { setIsExamTesting } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { words } = useSelector((state: RootState) => state.collection);
  const { dailyWords } = useSelector((state: RootState) => state.daily);
  const { isExamTesting } = useSelector((state: RootState) => state.exam);

  useEffect(() => () => {
    dispatch(setIsExamTesting(false));
  }, []);

  useEffect(() => {
    if (isExamTesting === false) {
      router.push('/quiz');
    }
  }, [isExamTesting]);

  const FailedDataCaption: React.FC = () => <div className="tw-py-8 tw-my-4 tw-text-center tw-text-gray">DATA ERROR</div>;

  const examProvider = useMemo(() => {
    if (isExamTesting && words.length) {
      switch (id as IQuizTypes) {
      case 'writed-exam':
        if (words.length >= 10) {
          return <WritedExam quantity={10} />;
        }
        return <FailedDataCaption />;
      case 'daily-writed-exam':
        if (dailyWords.length) {
          return <WritedExam quantity={dailyWords.length} type="daily-writed-exam" />;
        }
        return <FailedDataCaption />;
      default:
        return <FailedDataCaption />;
      }
    }
    return <FailedDataCaption />;
  }, [id, words, isExamTesting, dailyWords]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        { examProvider }
      </div>
    </>
  );
};

export default Quiz;
