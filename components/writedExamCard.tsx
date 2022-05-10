import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@/Components/alert';
import { InputText, PrimaryButton } from '@/Components/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IAnswerItem, IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IWritedExamCardProps {
  examId: IExamId;
  currentIndex: number,
  wordItem: IWordItem,
  setAnswer: (answerItem: IAnswerItem) => void,
}

const WritedExamCard: React.FC<IWritedExamCardProps> = ({
  examId, currentIndex, wordItem, setAnswer,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const FAVORITES_DATA = useSelector((state: RootState) => state.collection.favorites);
  const { examGuardAlert } = useSelector((state: RootState) => state.exam);
  const [inputValue, setInputValue] = useState<string>('');
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const {
    en, zh, parts, id,
  } = wordItem;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result: string = e.target.value;
    setInputValue(result.toLowerCase());
  };

  const handleSubmit = () => {
    const answer: string = inputValue.trim();
    if (answer !== '') {
      const result: boolean = !!(answer === en);
      setAnswer({
        id,
        answer,
        solution: en,
        result,
      });
    }
  };

  const handleNextQuestion = () => {
    setAnswer({
      id,
      answer: '',
      solution: en,
      result: false,
    });
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
    const dataSet: Set<IWordItem> = new Set(FAVORITES_DATA);
    setIsFavorite(dataSet.has(wordItem));
  }, [FAVORITES_DATA]);

  useEffect(() => {
    setInputValue('');
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

        <div className="tw-mb-2">
          <InputText
            defaultValue={inputValue}
            onChange={handleChange}
            placeholder="請輸入正確的英文單字"
          />
        </div>

        <div className="tw-relative tw-overflow-hidden tw-leading-7 tw-mb-4 tw-text-sm tw-text-black">
          <div className="tw-flex tw-items-center">
            <button
              type="button"
              aria-label="speech"
              className="tw-w-7 tw-h-7 before-font-material before:tw-content-['\e050'] before:tw-block before:tw-leading-7"
              onClick={() => handleSpeechSpeak(en)}
            />
            {
              examId !== 'writed-favorite' && (
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

        <div className="tw-flex tw-justify-center tw-mt-6">
          <PrimaryButton
            text="送出"
            isDisabled={!!(inputValue.trim() === '')}
            onClick={handleSubmit}
          />
          <PrimaryButton
            text="略過"
            onClick={handleNextQuestion}
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

export default WritedExamCard;
