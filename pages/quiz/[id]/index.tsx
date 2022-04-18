/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WritedExam from '@/Components/writedExam';
import { setIsExamTesting } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { words } = useSelector((state: RootState) => state.collection);
  const { isExamTesting } = useSelector((state: RootState) => state.exam);

  useEffect(() => () => {
    dispatch(setIsExamTesting(false));
  }, []);

  useEffect(() => {
    if (isExamTesting === false) {
      router.push('/quiz');
    }
  }, [isExamTesting]);

  const examProvider = useCallback(() => {
    if (isExamTesting && words.length) {
      switch (id) {
      case 'writedExam':
        return <WritedExam quantity={10} />;
      default:
        return <></>;
      }
    }
    return <></>;
  }, [id, words, isExamTesting]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        { examProvider() }
      </div>
    </>
  );
};

export default Quiz;
