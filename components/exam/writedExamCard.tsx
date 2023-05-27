import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExamCardHeader from '@/Components/exam/examCardHeader';
import { InputText, PrimaryButton } from '@/Components/utils/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { EnumWritedExamID, IAnswerItem, IExamID } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { RootState } from '@/Store/index';

interface IWritedExamCardProps {
  examId: IExamID;
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
    setIsFavorite(dataIdSet.has(wordItem.id));
  }, [wordItem, FAVORITES_DATA]);

  useEffect(() => {
    setInputValue('');
  }, [wordItem]);

  return (
    <div>
      <ExamCardHeader currentIndex={currentIndex} />

      <div className="mb-2">
        <InputText
          defaultValue={inputValue}
          onChange={handleChange}
          placeholder="請輸入正確的英文單字"
        />
      </div>

      <div className="relative overflow-hidden leading-7 mb-4 text-sm text-black">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="speech"
            className="w-7 h-7 before-font-material before:content-['\e050'] before:block before:leading-7"
            onClick={() => handleSpeechSpeak(en)}
          />
          {examId !== EnumWritedExamID.FAVORITE && (
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
        <div className="pl-2 leading-7 text-xs tablet:text-sm">
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <PrimaryButton
          text="送出"
          isDisabled={!!(inputValue.trim() === '')}
          onClick={handleSubmit}
        />
        <PrimaryButton text="略過" onClick={handleNextQuestion} />
      </div>
    </div>
  );
};

export default WritedExamCard;
