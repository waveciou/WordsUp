/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import WritedExam from '@/Components/writedExam';
import { setIsExamTesting } from '@/Slice/examination';
import stylesButton from '@/Styles/button.module.scss';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const [currentExam, setCurrentExam] = useState<string>('');

  useEffect(() => () => {
    dispatch(setIsExamTesting(false));
  }, []);

  const examProvider = useCallback(() => {
    switch (currentExam) {
    case 'writedExam':
      return (
        <WritedExam
          quantity={10}
          onCancelExam={() => setCurrentExam('')}
        />
      );
    default:
      return (
        <div className="tw-py-5 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
          <div className="tw-text-wine/80 tw-my-5 tw-text-md tw-text-center">
            單字填空測驗 (10題)
          </div>
          <div className="tw-my-5 tw-flex tw-justify-center">
            <button
              type="button"
              className={stylesButton['basic-btn']}
              onClick={() => setCurrentExam('writedExam')}
            >
              開始測驗
            </button>
          </div>
        </div>
      );
    }
  }, [currentExam]);

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
