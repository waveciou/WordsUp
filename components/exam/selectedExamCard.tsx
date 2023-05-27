import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ExamCardHeader from '@/Components/exam/examCardHeader';
import { PrimaryButton } from '@/Components/utils/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import {
  EnumSelectedExamID,
  IAnswerItem,
  IExamID,
  ISelectedWordItem,
} from '@/Interfaces/exam';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface ISelectedExamCardProps {
  examId: IExamID;
  currentIndex: number;
  wordItem: ISelectedWordItem;
  setAnswer: (answerItem: IAnswerItem) => void;
}

const SelectedExamCard: React.FC<ISelectedExamCardProps> = ({
  examId,
  currentIndex,
  wordItem,
  setAnswer,
}) => {
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );

  const [selectValue, setSelectValue] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { en, zh, parts, id, options } = wordItem;

  const handleSubmit = () => {
    if (selectValue !== '') {
      setAnswer({
        id,
        answer: selectValue,
        solution: en,
        result: !!(selectValue === en),
      });
    }
  };

  const handleSetFavorite = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(deleteFavoriteItem(id));
    } else {
      dispatch(addFavoriteItem(id));
    }
  };

  useEffect(() => {
    const dataIdList: string[] = FAVORITES_DATA.map((item) => item.id);
    const dataIdSet: Set<string> = new Set(dataIdList);
    setIsFavorite(dataIdSet.has(wordItem.id));
  }, [wordItem, FAVORITES_DATA]);

  useEffect(() => {
    setSelectValue('');
  }, [wordItem]);

  return (
    <div>
      <ExamCardHeader currentIndex={currentIndex} />

      <div className="py-3 px-4 mb-4 first-letter:relative overflow-hidden leading-7 text-sm text-black bg-gray-light rounded-lg">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="speech"
            className="w-7 h-7 before-font-material before:content-['\e050'] before:block before:leading-7"
            onClick={() => handleSpeechSpeak(en)}
          />
          {examId !== EnumSelectedExamID.FAVORITE && (
            <button
              type="button"
              aria-label="favorite-button"
              className={`favorite-button before-icon-star w-7 h-7 before:leading-7 ${
                isFavorite ? 'text-yellow-dark' : 'text-gray/60'
              }`}
              title={isFavorite ? '移除收藏' : '加入收藏'}
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <div className="leading-7 text-xs tablet:text-sm">
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>

      {options.map((optionItem: string) => {
        const uuid: string = uuidv4();
        const isChecked: boolean = !!(selectValue === optionItem);
        return (
          <div className="relative overflow-hidden mb-2 px-4" key={optionItem}>
            <input
              id={uuid}
              type="radio"
              value={optionItem}
              onChange={() => setSelectValue(optionItem)}
              checked={isChecked}
              className="absolute invisible opacity-0 select-none"
            />
            <label htmlFor={uuid} className="block">
              {isChecked ? (
                <div className="flex items-center text-sm cursor-pointer before-font-material before:content-['\e837'] before:block before:mr-1 before:text-base">
                  {optionItem}
                </div>
              ) : (
                <div className="flex items-center text-sm cursor-pointer before-font-material before:content-['\e836'] before:block before:mr-1 before:text-base">
                  {optionItem}
                </div>
              )}
            </label>
          </div>
        );
      })}

      <div className="flex justify-center mt-6">
        <PrimaryButton
          text="送出"
          isDisabled={!!(selectValue === '')}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SelectedExamCard;
