import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectedExam from '@/Components/exam/selectedExam';
import WritedExam from '@/Components/exam/writedExam';
import {
  EnumSelectedExamID,
  EnumWritedExamID,
  IExamID,
} from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

const Quiz: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const WORDS_DATA = useSelector((state: RootState) => state.collection.words);
  const DAILYS_DATA = useSelector((state: RootState) => state.daily.dailyWords);
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
  const { isExamAction } = useSelector((state: RootState) => state.exam);

  useEffect(
    () => () => {
      dispatch(setIsExamAction(false));
    },
    []
  );

  useEffect(() => {
    if (isExamAction === false) {
      router.push('/quiz');
    }
  }, [isExamAction]);

  const FailedDataCaption: React.FC = () => (
    <div className="py-8 my-4 text-center text-gray">DATA ERROR</div>
  );

  const examProviderMemo = useMemo(() => {
    if (isExamAction && WORDS_DATA.length) {
      switch (id as IExamID) {
        // * 隨機單字填空測驗
        case EnumWritedExamID.RANDOM:
          if (WORDS_DATA.length >= 10) {
            return (
              <WritedExam id={id as EnumWritedExamID.RANDOM} quantity={10} />
            );
          }
          return <FailedDataCaption />;
        // * 今日單字填空測驗
        case EnumWritedExamID.DAILY:
          if (DAILYS_DATA.length) {
            return (
              <WritedExam
                id={id as EnumWritedExamID.DAILY}
                quantity={DAILYS_DATA.length}
              />
            );
          }
          return <FailedDataCaption />;
        // * 收藏單字填空測驗
        case EnumWritedExamID.FAVORITE:
          if (FAVORITES_DATA.length) {
            return (
              <WritedExam
                id={id as EnumWritedExamID.FAVORITE}
                quantity={FAVORITES_DATA.length}
              />
            );
          }
          return <FailedDataCaption />;
        // * 隨機單字選擇測驗
        case EnumSelectedExamID.RANDOM:
          if (WORDS_DATA.length >= 10) {
            return (
              <SelectedExam
                id={id as EnumSelectedExamID.RANDOM}
                quantity={10}
              />
            );
          }
          return <FailedDataCaption />;
        // * 今日單字選擇測驗
        case EnumSelectedExamID.DAILY:
          if (DAILYS_DATA.length) {
            return (
              <SelectedExam
                id={id as EnumSelectedExamID.DAILY}
                quantity={DAILYS_DATA.length}
              />
            );
          }
          return <FailedDataCaption />;
        // * 收藏單字選擇測驗
        case EnumSelectedExamID.FAVORITE:
          if (FAVORITES_DATA.length) {
            return (
              <SelectedExam
                id={id as EnumSelectedExamID.FAVORITE}
                quantity={FAVORITES_DATA.length}
              />
            );
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
      <div className="content">{examProviderMemo}</div>
    </>
  );
};

export default Quiz;
