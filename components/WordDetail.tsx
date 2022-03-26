/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';

import handleGetExampleNode from '@/Functions/getExampleNode';
import handleGetHashId from '@/Functions/getHashId';
import handleGetPartsText from '@/Functions/getPartsText';
import handleObjectDeepClone from '@/Functions/objectDeepClone';
import handleSetWordStatusList from '@/Functions/setWordStatusList';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IExampleListItem, IWordCase, IWordItem } from '@/Interfaces/I_WordCase';
import styles from '@/Styles/components/WordDetail.module.scss';

const WordDetail: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const {
    english, chinese, parts, status, englishExample, chineseExample,
  }: IWordCase = word;

  const [exampleList, setExampleList] = useState<IExampleListItem[]>([]);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [partsText, setPartsText] = useState<string>('');

  // Speech Synthesis

  const handleSpeechSpeak = useSpeechSpeak();

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

  // Status List

  useEffect(() => {
    const result: string[] = handleSetWordStatusList(status);
    setStatusList(result);
  }, [status]);

  // Parts Text

  useEffect(() => {
    const result: string = handleGetPartsText(parts);
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
