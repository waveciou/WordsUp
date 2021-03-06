import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExamCardHeader from '@/Components/exam/examCardHeader';
import { InputText, PrimaryButton } from '@/Components/utils/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IAnswerItem, IExamId } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IWritedExamCardProps {
  examId: IExamId;
  currentIndex: number;
  wordItem: IWordItem;
  setAnswer: (answerItem: IAnswerItem) => void;
}

const WritedExamCard: React.FC<IWritedExamCardProps> = ({
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
  const [inputValue, setInputValue] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { en, zh, parts, id } = wordItem;

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
    setInputValue('');
  }, [wordItem]);

  return (
    <div>
      <ExamCardHeader currentIndex={currentIndex} />

      <div className="tw-mb-2">
        <InputText
          defaultValue={inputValue}
          onChange={handleChange}
          placeholder="??????????????????????????????"
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
          {examId !== 'writed-favorite' && (
            <button
              type="button"
              aria-label="favorite-button"
              className={`favorite-button before-icon-star tw-w-7 tw-h-7 before:tw-leading-7 ${
                isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'
              }`}
              title={isFavorite ? '????????????' : '????????????'}
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <div className="tw-pl-2 tw-leading-7 tw-text-xs tablet:tw-text-sm">
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>

      <div className="tw-flex tw-justify-center tw-mt-6">
        <PrimaryButton
          text="??????"
          isDisabled={!!(inputValue.trim() === '')}
          onClick={handleSubmit}
        />
        <PrimaryButton text="??????" onClick={handleNextQuestion} />
      </div>
    </div>
  );
};

export default WritedExamCard;
