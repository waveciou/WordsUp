import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@/Components/alert';
import { InputText, PrimaryButton } from '@/Components/form';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IAnswerItem } from '@/Interfaces/exam';
import { IWordItem } from '@/Interfaces/word';
import { RootState } from '@/Store/index';

interface IWritedExamCardProps {
  currentIndex: number,
  wordData: IWordItem,
  setAnswer: (answerItem: IAnswerItem) => void,
}

const WritedExamCard: React.FC<IWritedExamCardProps> = ({
  currentIndex, wordData, setAnswer,
}) => {
  const router = useRouter();
  const handleSpeechSpeak = useSpeechSpeak();
  const { examGuardAlert } = useSelector((state: RootState) => state.exam);
  const [inputValue, setInputValue] = useState<string>('');
  const [isShowExamGuardAlert, setIsShowExamGuardAlert] = useState<boolean>(false);

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
  };

  useEffect(() => {
    setInputValue('');
  }, [wordData]);

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
            className="tw-flex tw-items-center tw-text-xs tw-text-green-dark hover:tw-text-green before-font-material before:tw-content-['\e15e'] before:tw-block before:tw-mr-1"
          >
            離開測驗
          </button>
        </div>

        <div className="tw-mb-4">
          <InputText
            defaultValue={inputValue}
            onChange={handleChange}
            placeholder="請輸入正確的英文單字"
          />
        </div>

        <div className="tw-pl-8 tw-relative tw-overflow-hidden tw-leading-7 tw-mb-4 tw-text-sm tw-text-black">
          <div className="tw-absolute tw-top-0 tw-left-0">
            <button
              type="button"
              aria-label="speech"
              className="tw-w-7 tw-h-7 tw-inline-block tw-align-top tw-leading-7 before-font-material before:tw-content-['\e050'] before:tw-block before:tw-leading-7"
              onClick={() => handleSpeechSpeak(en)}
            />
          </div>
          <div className="tw-leading-7 tw-text-xs tablet:tw-text-sm">
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
