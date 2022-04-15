/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IAnswerItem } from '@/Interfaces/examination';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';

interface IExamCardProps {
  currentTopic: number,
  wordData: IWordItem,
  onNext: () => void,
  setAnswer: (answerItem: IAnswerItem) => void
}

const writedExamCard: React.FC<IExamCardProps> = ({
  currentTopic, wordData, onNext, setAnswer,
}) => {
  const handleSpeechSpeak = useSpeechSpeak();
  const [inputValue, setInputValue] = useState<string>('');

  const {
    en, zh, parts, id,
  } = wordData;

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
    onNext();
  };

  useEffect(() => {
    setInputValue('');
  }, [wordData]);

  return (
    <>
      <div>
        <div className="tw-text-md tw-text-wine tw-leading-7 tw-mb-4">
          第
          {' '}
          {currentTopic + 1}
          {' '}
          題
        </div>

        <div className="tw-mb-4">
          <input
            type="text"
            className="tw-w-full tw-h-10 tw-block tw-py-3 tw-px-4 tw-leading-4 tw-rounded-md tw-text-xs tw-bg-gray-light"
            value={inputValue}
            onChange={handleChange}
            placeholder="請輸入正確的英文單字"
          />
        </div>

        <div className="tw-pl-8 tw-relative tw-overflow-hidden tw-leading-7 tw-mb-4 tw-text-sm tw-text-black">
          <div className="tw-absolute tw-top-0 tw-left-0">
            <button
              type="button"
              aria-label="speech"
              className="tw-inline-block tw-align-top tw-leading-7 before-font-material before:tw-content-['\e050'] before:tw-w-7 before:tw-h-7 before:tw-block before:tw-leading-7 before:tw-text-center"
              onClick={() => handleSpeechSpeak(en)}
            />
          </div>
          <div className="tw-leading-7">
            <WordsCaption id={id} wordsList={zh} partsList={parts} />
          </div>
        </div>

        <div className="tw-flex tw-justify-center">
          <button
            type="button"
            className={`
              ${stylesButton['basic-btn']}
              ${inputValue.trim() === '' ? stylesButton['is-disabled'] : ''}
            `}
            onClick={handleSubmit}
          >
            送出
          </button>
          <button
            type="button"
            className={stylesButton['basic-btn']}
            onClick={handleNextQuestion}
          >
            略過
          </button>
        </div>
      </div>
    </>
  );
};

export default writedExamCard;
