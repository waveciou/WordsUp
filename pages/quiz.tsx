/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/form';
import getExamName from '@/Functions/examName';
import { IExamId } from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IQuizzesLinkProps {
  id: IExamId;
  description: string;
  isPushRoute?: boolean;
  onClick?: () => void;
}

const QuizzesLink: React.FC<IQuizzesLinkProps> = ({
  id = '',
  description = '',
  isPushRoute = true,
  onClick = () => {},
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="tw-py-5 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
      <h3 className="tw-text-wine tw-mb-5 tw-text-md tw-text-center tw-leading-9">
        { getExamName(id) }
      </h3>
      <p className="tw-text-center tw-text-xs tw-text-brown">{ description }</p>
      <div className="tw-mt-5 tw-flex tw-justify-center">
        <PrimaryButton
          text="開始測驗"
          onClick={async () => {
            if (isPushRoute) {
              await dispatch(setIsExamAction(true));
              await router.push(`/quiz/${id}`);
            } else {
              onClick();
            }
          }}
        />
      </div>
    </div>
  );
};

const Quiz: React.FC = () => {
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const [hasFavorites, setHasFavorites] = useState<boolean>(false);

  useEffect(() => {
    setHasFavorites(() => (!!FAVORITES_DATA.length));
  }, [FAVORITES_DATA]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        <h2 className="tw-flex tw-items-center tw-mb-4 tw-text-green-dark tw-text-md desktop:tw-text-lg tw-leading-9 before-font-material before:tw-content-['\e3c9'] before:tw-mr-1">填空測驗</h2>
        <ul>
          <li className="tw-mb-4">
            <QuizzesLink
              id="writed-random"
              description="從單字資料庫隨機取得 10 個單字來進行填空測驗"
            />
          </li>
          <li className="tw-mb-4">
            <QuizzesLink
              id="writed-daily"
              description="使用「今日單字」進行填空測驗"
            />
          </li>
          {
            hasFavorites && (
              <li className="tw-mb-4">
                <QuizzesLink
                  id="writed-favorite"
                  description="使用「收藏單字」進行填空測驗"
                />
              </li>
            )
          }
        </ul>
      </div>
    </>
  );
};

export default Quiz;
