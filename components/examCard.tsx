/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';

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
    setInputValue(result);
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
        <div className={styles.title}>
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

          { zh.map((textItem, index) => {
            const key: string = `${id}_zh-${index}`;
            return (
              <div key={key}>
                <span className={styles.part}>{ parts[index] }</span>
                <span>{ textItem }</span>
              </div>
            );
          })}
        </div>

        <div className={`${styles.footer}`}>
          <button type="button" className={`${styles.button}`} onClick={handleSubmit}>確定</button>
          <button type="button" className={`${styles.button}`} onClick={handleNextQuestion}>下一題</button>
        </div>
      </div>
    </>
  );
};

export default ExamCard;
