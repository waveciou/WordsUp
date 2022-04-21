/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import { IQuizTypes } from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';

const Quiz: React.FC = () => {
  interface IQuizCollection {
    title: string;
    description: string;
    path: IQuizTypes;
  }

  const router = useRouter();
  const dispatch = useDispatch();
  const [quizCollection, setQuizCollection] = useState<IQuizCollection[]>([]);

  useEffect(() => {
    setQuizCollection([
      {
        title: '單字填空測驗',
        description: '從單字資料庫隨機取得10個單字來進行填空測驗',
        path: 'writed-exam',
      },
      {
        title: '今日單字填空測驗',
        description: '使用「今日單字」進行填空測驗',
        path: 'daily-writed-exam',
      },
    ]);
  }, []);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        {
          quizCollection.map(({ title, description, path }: IQuizCollection, index: number) => (
            <div
              key={path}
              className={`tw-py-5 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] ${index + 1 === quizCollection.length ? '' : 'tw-mb-4'}`}
            >
              <div className="tw-text-wine/80 tw-my-5 tw-text-md tw-text-center tw-leading-9 before-font-material">
                { title }
              </div>
              <p className="tw-text-center tw-text-xs tw-text-brown">{ description }</p>
              <div className="tw-my-5 tw-flex tw-justify-center">
                <PrimaryButton
                  text="開始測驗"
                  onClick={async () => {
                    await dispatch(setIsExamAction(true));
                    await router.push(`/quiz/${path}`);
                  }}
                />
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Quiz;
