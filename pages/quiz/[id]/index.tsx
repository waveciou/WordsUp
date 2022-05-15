import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectedExam from '@/Components/exam/selectedExam';
import WritedExam from '@/Components/exam/writedExam';
import { IExamId, ISelectedExamId, IWritedExamId } from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
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

  const examProviderMemo = useMemo(() => {
    if (isExamAction && WORDS_DATA.length) {
      switch (id as IExamId) {
        // * 隨機單字填空測驗
        case 'writed-random':
          if (WORDS_DATA.length >= 10) {
            return <WritedExam id={id as IWritedExamId} quantity={10} />;
          }
          return <FailedDataCaption />;
        // * 今日單字填空測驗
        case 'writed-daily':
          if (DAILYS_DATA.length) {
            return <WritedExam id={id as IWritedExamId} quantity={DAILYS_DATA.length} />;
          }
          return <FailedDataCaption />;
        // * 收藏單字填空測驗
        case 'writed-favorite':
          if (FAVORITES_DATA.length) {
            return <WritedExam id={id as IWritedExamId} quantity={FAVORITES_DATA.length} />;
          }
          return <FailedDataCaption />;
        // * 隨機單字選擇測驗
        case 'selected-random':
          if (WORDS_DATA.length >= 10) {
            return <SelectedExam id={id as ISelectedExamId} quantity={10} />;
          }
          return <FailedDataCaption />;
        // * 今日單字選擇測驗
        case 'selected-daily':
          if (DAILYS_DATA.length) {
            return <SelectedExam id={id as ISelectedExamId} quantity={DAILYS_DATA.length} />;
          }
          return <FailedDataCaption />;
        // * 收藏單字選擇測驗
        case 'selected-favorite':
          if (FAVORITES_DATA.length) {
            return <SelectedExam id={id as ISelectedExamId} quantity={FAVORITES_DATA.length} />;
          }
          return <FailedDataCaption />;
        default:
          return <FailedDataCaption />;
      }
    }
    return <FailedDataCaption />;
  }, [id, isExamAction, WORDS_DATA, DAILYS_DATA]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        { examProviderMemo }
      </div>
    </>
  );
};

export default Quiz;
