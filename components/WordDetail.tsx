/* eslint-disable react/no-danger */
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

// Style
import styles from '../styles/components/WordDetail.module.scss';

// Interface
import { IWordItem, IWordCase, IExampleListItem } from '../src/interfaces/I_WordCase';

// Function
import handleGetExampleNode from '../src/functions/getExampleNode';
import handleSetWordStatusList from '../src/functions/setWordStatusList';
import handleGetHashId from '../src/functions/getHashId';
import handleObjectDeepClone from '../src/functions/objectDeepClone';

const WordDetail: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const {
    english, chinese, parts, status, englishExample, chineseExample,
  }: IWordCase = word;

  const [exampleList, setExampleList] = useState<IExampleListItem[]>([]);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [partsText, setPartsText] = useState('');
  const { speak, speaking } = useSpeechSynthesis();

  // Example List

  useEffect(() => {
    if (englishExample.length === chineseExample.length) {
      const result: IExampleListItem[] = englishExample.map((example, index) => ({
        englishItem: handleObjectDeepClone(example),
        chineseItem: handleObjectDeepClone(chineseExample[index]),
      }));
      setExampleList(result);
    }
  }, [englishExample, chineseExample]);

  // Speech Synthesis

  const handleSpeechSpeak = useCallback((_text: string) => {
    if (speaking === false) {
      speak({ text: _text });
    }
  }, [speak, speaking]);

  // Status List

  useEffect(() => {
    const result: string[] = handleSetWordStatusList(status);
    setStatusList(result);
  }, [status]);

  // Parts Text

  useEffect(() => {
    const result: string = parts.reduce((prevText, currentText, index) => {
      if (index === 0) {
        return `${currentText}`;
      }
      return `${prevText}、${currentText}`;
    }, '');
    setPartsText(result);
  }, [parts]);

  return (
    <div className={styles.wordDetail}>
      <div className={styles.wordDetail__title}>{ english }</div>
      <div className={styles.wordDetail__subtitle}>
        <button
          type="button"
          aria-label="speech"
          className={styles['speech-btn']}
          onClick={() => handleSpeechSpeak(english)}
        />
        <span className={styles.wordDetail__part}>{ partsText }</span>
        <span>{ chinese }</span>
      </div>

      {
        exampleList.map((example, index) => {
          const { englishItem, chineseItem } = example;
          return (
            <div
              className={styles.wordDetail__example}
              key={handleGetHashId(index, 'example')}
            >
              <div
                className={styles['wordDetail__example-en']}
                dangerouslySetInnerHTML={{
                  __html: handleGetExampleNode(englishItem),
                }}
              />
              <div
                className={styles['wordDetail__example-ch']}
                dangerouslySetInnerHTML={{
                  __html: handleGetExampleNode(chineseItem),
                }}
              />
            </div>
          );
        })
      }

      <ul className={styles.wordDetail__status}>
        {
          statusList.map((statusText, index) => (
            <li key={handleGetHashId(index, 'status')}>{ statusText }</li>
          ))
        }
      </ul>
    </div>
  );
};

export default WordDetail;
