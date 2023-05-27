import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton } from '@/Components/utils/form';
import getExamName from '@/Functions/examName';
import {
  EnumSelectedExamID,
  EnumWritedExamID,
  IExamID,
} from '@/Interfaces/exam';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IQuizzesLinkProps {
  id: IExamID;
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
    <div className="h-full py-5 px-4 rounded-lg shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
      <h3 className="text-wine mb-5 text-md text-center leading-9">
        {getExamName(id)}
      </h3>
      <p className="text-center text-xs text-brown">{description}</p>
      <div className="mt-5 flex justify-center">
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
    id: IExamID;
    description: string;
    types: 'writed' | 'selected';
    isForFavorite: boolean;
  }

  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
  const [hasFavorites, setHasFavorites] = useState<boolean>(false);
  const [writedExamData] = useState<IQuizzesData[]>([
    {
      id: EnumWritedExamID.RANDOM,
      types: 'writed',
      isForFavorite: false,
      description: '從單字資料庫隨機取得 10 個單字進行填空測驗',
    },
    {
      id: EnumWritedExamID.DAILY,
      types: 'writed',
      isForFavorite: false,
      description: '使用「今日單字」進行填空測驗',
    },
    {
      id: EnumWritedExamID.FAVORITE,
      types: 'writed',
      isForFavorite: true,
      description: '使用「收藏單字」進行填空測驗',
    },
    {
      id: EnumSelectedExamID.RANDOM,
      types: 'selected',
      isForFavorite: false,
      description: '從單字資料庫隨機取得 10 個單字來進行選擇測驗',
    },
    {
      id: EnumSelectedExamID.DAILY,
      types: 'selected',
      isForFavorite: false,
      description: '使用「今日單字」進行選擇測驗',
    },
    {
      id: EnumSelectedExamID.FAVORITE,
      types: 'selected',
      isForFavorite: true,
      description: '使用「收藏單字」進行選擇測驗',
    },
  ]);

  useEffect(() => {
    setHasFavorites(() => !!FAVORITES_DATA.length);
  }, [FAVORITES_DATA]);

  const examLinkProvider = useCallback(
    (filterId: string) =>
      writedExamData
        .filter(({ types, isForFavorite }: IQuizzesData) => {
          if (!hasFavorites) {
            return types === filterId && isForFavorite === false;
          }
          return types === filterId;
        })
        .map(({ id, description }: IQuizzesData) => (
          <li className="w-full mb-4" key={id}>
            <QuizzesLink id={id} description={description} />
          </li>
        )),
    [writedExamData, hasFavorites]
  );

  return (
    <>
      <h1 className="title">單字測驗</h1>
      <div className="content">
        <h2 className="flex items-center mb-4 text-green-dark text-md desktop:text-lg leading-9 before-font-material before:content-['\e3c9'] before:mr-1">
          填空題型
        </h2>

        <ul className="flex flex-wrap">{examLinkProvider('writed')}</ul>

        <h2 className="flex items-center my-4 text-green-dark text-md desktop:text-lg leading-9 before-font-material before:content-['\e0ee'] before:mr-1">
          選擇題型
        </h2>

        <ul className="flex flex-wrap">{examLinkProvider('selected')}</ul>
      </div>
    </>
  );
};

export default Quiz;
