import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@/Components/utils/alert';
import { RootState } from '@/Store/index';

interface IExamCardHeaderProps {
  currentIndex: number;
}

const ExamCardHeader: React.FC<IExamCardHeaderProps> = ({ currentIndex }) => {
  const router = useRouter();
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] =
    useState<boolean>(false);
  const { examGuardAlert } = useSelector((state: RootState) => state.exam);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="text-md text-wine leading-7">
          第 {currentIndex + 1} 題
        </div>
        <button
          type="button"
          onClick={() => setIsShowExamGuardAlert(true)}
          className="flex items-center text-xs text-green-dark desktop:hover:text-green before-font-material before:content-['\e15e'] before:block before:mr-1"
        >
          離開測驗
        </button>
      </div>
      <Alert
        show={isShowExamGuardAlert}
        title={examGuardAlert.title}
        content={examGuardAlert.content}
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => router.back()}
        onCancel={() => setIsShowExamGuardAlert(false)}
        theme="warn"
      />
    </>
  );
};

export default ExamCardHeader;
