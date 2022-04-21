/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WritedExam from '@/Components/writedExam';
import { IQuizTypes } from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { words } = useSelector((state: RootState) => state.collection);
  const { dailyWords } = useSelector((state: RootState) => state.daily);
  const { isExamAction } = useSelector((state: RootState) => state.exam);

  useEffect(() => () => {
    dispatch(setIsExamAction(false));
  }, []);

  useEffect(() => {
    if (isExamAction === false) {
      router.push('/quiz');
    }
  }, [isExamAction]);

  const FailedDataCaption: React.FC = () => <div className="tw-py-8 tw-my-4 tw-text-center tw-text-gray">DATA ERROR</div>;

  const examProvider = useMemo(() => {
    if (isExamAction && words.length) {
      switch (id as IQuizTypes) {
      case 'writed-exam':
        // 單字填空測驗
        if (words.length >= 10) {
          return <WritedExam quantity={10} />;
        }
        return <FailedDataCaption />;
      case 'daily-writed-exam':
        // 今日單字填空測驗
        if (dailyWords.length) {
          return <WritedExam quantity={dailyWords.length} type="daily-writed-exam" />;
        }
        return <FailedDataCaption />;
      default:
        return <FailedDataCaption />;
      }
    }
    return <FailedDataCaption />;
  }, [id, words, isExamAction, dailyWords]);

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
