import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ExamCardHeader from '@/Components/exam/examCardHeader';
import { PrimaryButton } from '@/Components/utils/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IAnswerItem, IExamId, ISelectedWordItem } from '@/Interfaces/exam';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface ISelectedExamCardProps {
  examId: IExamId;
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
    setIsFavorite(dataIdSet.has(id));
  }, [FAVORITES_DATA]);

  useEffect(() => {
    setSelectValue('');
  }, [wordItem]);

  return (
    <div>
      <ExamCardHeader currentIndex={currentIndex} />

      <div className="tw-py-3 tw-px-4 tw-mb-4 first-letter:tw-relative tw-overflow-hidden tw-leading-7 tw-text-sm tw-text-black tw-bg-gray-light tw-rounded-lg">
        <div className="tw-flex tw-items-center">
          <button
            type="button"
            aria-label="speech"
            className="tw-w-7 tw-h-7 before-font-material before:tw-content-['\e050'] before:tw-block before:tw-leading-7"
            onClick={() => handleSpeechSpeak(en)}
          />
          {examId !== 'selected-favorite' && (
            <button
              type="button"
              aria-label="favorite-button"
              className={`favorite-button before-icon-star tw-w-7 tw-h-7 before:tw-leading-7 ${
                isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'
              }`}
              title={isFavorite ? '移除收藏' : '加入收藏'}
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <div className="tw-leading-7 tw-text-xs tablet:tw-text-sm">
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>

      {options.map((optionItem: string) => {
        const uuid: string = uuidv4();
        const isChecked: boolean = !!(selectValue === optionItem);
        return (
          <div className="tw-relative tw-overflow-hidden tw-mb-2 tw-px-4">
            <input
              key={optionItem}
              id={uuid}
              type="radio"
              value={optionItem}
              onChange={() => setSelectValue(optionItem)}
              checked={isChecked}
              className="tw-absolute tw-invisible tw-opacity-0 tw-select-none"
            />
            <label htmlFor={uuid} className="tw-block">
              {isChecked ? (
                <div className="tw-flex tw-items-center tw-text-sm tw-cursor-pointer before-font-material before:tw-content-['\e837'] before:tw-block before:tw-mr-1 before:tw-text-base">
                  {optionItem}
                </div>
              ) : (
                <div className="tw-flex tw-items-center tw-text-sm tw-cursor-pointer before-font-material before:tw-content-['\e836'] before:tw-block before:tw-mr-1 before:tw-text-base">
                  {optionItem}
                </div>
              )}
            </label>
          </div>
        );
      })}

      <div className="tw-flex tw-justify-center tw-mt-6">
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
