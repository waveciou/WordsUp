import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import getExamName from '@/Functions/examName';
import { IExamId } from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';

interface IQuizzesLinkProps {
  title: IExamId;
  description: string;
  onClick: () => void;
}

const QuizzesLink: React.FC<IQuizzesLinkProps> = ({
  title = '',
  description = '',
  onClick = () => {},
}) => (
  <div className="tw-py-5 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
    <div className="tw-text-wine tw-mb-5 tw-text-md tw-text-center tw-leading-9 before-font-material">
      { getExamName(title) }
    </div>
    <p className="tw-text-center tw-text-xs tw-text-brown">{ description }</p>
    <div className="tw-mt-5 tw-flex tw-justify-center">
      <PrimaryButton
        text="開始測驗"
        onClick={onClick}
      />
    </div>
  </div>
);

const Quiz: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        <ul>
          <li className="tw-mb-4">
            <QuizzesLink
              title="writed-random"
              description="從單字資料庫隨機取得10個單字來進行填空測驗"
              onClick={async () => {
                await dispatch(setIsExamAction(true));
                await router.push('/quiz/writed-random');
              }}
            />
          </li>
          <li>
            <QuizzesLink
              title="writed-daily"
              description="使用「今日單字」進行填空測驗"
              onClick={async () => {
                await dispatch(setIsExamAction(true));
                await router.push('/quiz/writed-daily');
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Quiz;
