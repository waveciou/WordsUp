import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/utils/form';
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
    <div className="tw-h-full tw-py-5 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
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
  interface IQuizzesData {
    id: IExamId;
    description: string;
    types: 'writed' | 'selected';
    isForFavorite: boolean;
  }

  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const [hasFavorites, setHasFavorites] = useState<boolean>(false);
  const [writedExamData] = useState<IQuizzesData[]>([
    {
      id: 'writed-random',
      types: 'writed',
      isForFavorite: false,
      description: '從單字資料庫隨機取得 10 個單字來進行填空測驗',
    },
    {
      id: 'writed-daily',
      types: 'writed',
      isForFavorite: false,
      description: '使用「今日單字」進行填空測驗',
    },
    {
      id: 'writed-favorite',
      types: 'writed',
      isForFavorite: true,
      description: '使用「收藏單字」進行填空測驗',
    },
    {
      id: 'selected-random',
      types: 'selected',
      isForFavorite: false,
      description: '從單字資料庫隨機取得 10 個單字來進行選擇測驗',
    },
    {
      id: 'selected-daily',
      types: 'selected',
      isForFavorite: false,
      description: '使用「今日單字」進行選擇測驗',
    },
    {
      id: 'selected-favorite',
      types: 'selected',
      isForFavorite: true,
      description: '使用「收藏單字」進行選擇測驗',
    },
  ]);

  useEffect(() => {
    setHasFavorites(() => (!!FAVORITES_DATA.length));
  }, [FAVORITES_DATA]);

  const examLinkProvider = useCallback((filterId: string) => writedExamData.filter(({
    types,
    isForFavorite,
  }: IQuizzesData) => {
    if (!hasFavorites) {
      return types === filterId && isForFavorite === false;
    }
    return types === filterId;
  }).map(({ id, description }: IQuizzesData) => (
    <li className="tw-w-full tw-mb-4">
      <QuizzesLink
        id={id}
        description={description}
      />
    </li>
  )), [writedExamData, hasFavorites]);

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        <h2 className="tw-flex tw-items-center tw-mb-4 tw-text-green-dark tw-text-md desktop:tw-text-lg tw-leading-9 before-font-material before:tw-content-['\e3c9'] before:tw-mr-1">填空題型</h2>

        <ul className="tw-flex tw-flex-wrap">
          { examLinkProvider('writed') }
        </ul>

        <h2 className="tw-flex tw-items-center tw-my-4 tw-text-green-dark tw-text-md desktop:tw-text-lg tw-leading-9 before-font-material before:tw-content-['\e0ee'] before:tw-mr-1">選擇題型</h2>

        <ul className="tw-flex tw-flex-wrap">
          { examLinkProvider('selected') }
        </ul>
      </div>
    </>
  );
};

export default Quiz;
