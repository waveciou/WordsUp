/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IAnswerItem } from '@/Interfaces/examination';
import { IWordItem } from '@/Interfaces/word';
import stylesButton from '@/Styles/button.module.scss';
import styles from '@/Styles/examination.module.scss';

interface IExamCardProps {
  currentTopic: number,
  wordData: IWordItem,
  onNext: () => void,
  setAnswer: (anwserItem: IAnswerItem) => void
}

const ExamCard: React.FC<IExamCardProps> = ({
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
    const result: boolean = !!(inputValue === en);
    setAnswer({
      id,
      anwser: inputValue.trim(),
      solution: en,
      result,
    });
  };

  const handleNextQuestion = () => {
    setAnswer({
      id,
      anwser: '',
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
        <div className="tw-text-md tw-text-wine tw-leading-7 tw-mb-2.5">
          第
          {' '}
          {currentTopic + 1}
          {' '}
          題
        </div>

        <div className={styles.textInput}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="請輸入正確的英文單字"
          />
        </div>

        <div className={styles.descriptionArea}>
          <div className={styles.speechBtn}>
            <button
              type="button"
              aria-label="speech"
              className={stylesButton['speech-btn']}
              onClick={() => handleSpeechSpeak(en)}
            />
          </div>

          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>

        <div className="tw-flex tw-justify-center">
          <button type="button" className={`${styles.button}`} onClick={handleSubmit}>送出</button>
          <button type="button" className={`${styles.button}`} onClick={handleNextQuestion}>略過</button>
        </div>
      </div>
    </>
  );
};

export default ExamCard;
