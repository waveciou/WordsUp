import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Alert from '@/Components/utils/alert';
import { PrimaryButton } from '@/Components/utils/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IAnswerItem, IExamId, ISelectedWordItem } from '@/Interfaces/exam';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface ISelectedExamCardProps {
  examId: IExamId;
  currentIndex: number,
  wordItem: ISelectedWordItem,
  setAnswer: (answerItem: IAnswerItem) => void,
}

const SelectedExamCard: React.FC<ISelectedExamCardProps> = ({
  examId, currentIndex, wordItem, setAnswer,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const { examGuardAlert } = useSelector((state: RootState) => state.exam);

  const [selectValue, setSelectValue] = useState<string>('');
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const {
    en, zh, parts, id, options,
  } = wordItem;

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

  const handleSetFavorite = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
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
    <>
      <div>
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div className="tw-text-md tw-text-wine tw-leading-7">
            第
            {' '}
            {currentIndex + 1}
            {' '}
            題
          </div>
          <button
            type="button"
            onClick={() => setIsShowExamGuardAlert(true)}
            className="tw-flex tw-items-center tw-text-xs tw-text-green-dark desktop:hover:tw-text-green before-font-material before:tw-content-['\e15e'] before:tw-block before:tw-mr-1"
          >
            離開測驗
          </button>
        </div>

        <div className="tw-py-3 tw-px-2 tw-mb-4 first-letter:tw-relative tw-overflow-hidden tw-leading-7 tw-text-sm tw-text-black tw-bg-gray-light tw-rounded-lg">
          <div className="tw-flex tw-items-center">
            <button
              type="button"
              aria-label="speech"
              className="tw-w-7 tw-h-7 before-font-material before:tw-content-['\e050'] before:tw-block before:tw-leading-7"
              onClick={() => handleSpeechSpeak(en)}
            />
            {
              examId !== 'selected-favorite' && (
                <button
                  type="button"
                  aria-label="favorite-button"
                  className={`favorite-button before-icon-star tw-w-7 tw-h-7 before:tw-leading-7 ${isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'}`}
                  title={isFavorite ? '移除收藏' : '加入收藏'}
                  onClick={handleSetFavorite}
                />
              )
            }
          </div>
          <div className="tw-pl-2 tw-leading-7 tw-text-xs tablet:tw-text-sm">
            <WordsCaption id={id} wordsList={zh} partsList={parts} />
          </div>
        </div>

        {
          options.map((optionItem: string) => {
            const uuid: string = uuidv4();
            const isChecked: boolean = !!(selectValue === optionItem);
            return (
              <div className="tw-relative tw-overflow-hidden">
                <input
                  key={optionItem}
                  id={uuid}
                  type="radio"
                  value={optionItem}
                  onChange={() => setSelectValue(optionItem)}
                  checked={isChecked}
                  className="tw-absolute tw-invisible tw-opacity-0 tw-select-none"
                />
                <label htmlFor={uuid} className="tw-block tw-mb-2">
                  {
                    isChecked ? (
                      <div className="tw-flex tw-items-center tw-text-sm tw-cursor-pointer before-font-material before:tw-content-['\e837'] before:tw-block before:tw-mr-1 before:tw-text-base">
                        { optionItem }
                      </div>
                    ) : (
                      <div className="tw-flex tw-items-center tw-text-sm tw-cursor-pointer before-font-material before:tw-content-['\e836'] before:tw-block before:tw-mr-1 before:tw-text-base">
                        { optionItem }
                      </div>
                    )
                  }
                </label>
              </div>
            );
          })
        }

        <div className="tw-flex tw-justify-center tw-mt-6">
          <PrimaryButton
            text="送出"
            isDisabled={!!(selectValue === '')}
            onClick={handleSubmit}
          />
        </div>
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

export default SelectedExamCard;
