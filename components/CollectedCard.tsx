/* eslint-disable react/no-danger */
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

// Style
import styles from '../styles/components/Collection.module.scss';

// Component
import Popup from './common/Popup';

// Function
import handleGetExampleNode from '../src/functions/handleGetExampleNode';
import handleSetWordStatusList from '../src/functions/handleSetWordStatusList';
import handleGetHashId from '../src/functions/handleGetHashId';
import handleObjectDeepClone from '../src/functions/handleObjectDeepClone';

// Interface
import { IWordItem, IExampleListItem } from '../src/interfaces/I_WordCase';

const card: string = 'collectedCard';
const popup: string = 'collectedPopup';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const [isShow, setIsShow] = useState(false);
  const {
    english, chinese, parts, status, englishExample, chineseExample,
  } = word;
  const [partsText, setPartsText] = useState('');

  // Speech Synthesis
  const { speak, speaking } = useSpeechSynthesis();

  const handleSpeechSpeak = useCallback((_text: string) => {
    if (speaking === false) {
      speak({ text: _text });
    }
  }, [speak, speaking]);

  // Example List
  const [exampleList, setExampleList] = useState<IExampleListItem[]>([]);

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
  const [statusList, setStatusList] = useState<string[]>([]);

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
    <>
      <div
        className={styles[card]}
        aria-hidden="true"
        onClick={() => { setIsShow(true); }}
      >
        <div className={styles[`${[card]}__title`]}>{ english }</div>
        <div className={styles[`${[card]}__subtitle`]}>
          <span className={styles[`${[card]}__part`]}>{ partsText }</span>
          <span>{ chinese }</span>
        </div>
      </div>
      <Popup show={isShow} onClose={() => { setIsShow(false); }}>
        <div className={styles[popup]}>
          <div className={styles[`${popup}__title`]}>{ english }</div>
          <div className={styles[`${popup}__subtitle`]}>
            <button
              type="button"
              aria-label="speech"
              className={styles['speech-btn']}
              onClick={() => {
                handleSpeechSpeak(english);
              }}
            />
            <span className={styles[`${popup}__part`]}>{ partsText }</span>
            <span>{ chinese }</span>
          </div>

          {
            exampleList.map((example, index) => {
              const { englishItem, chineseItem } = example;
              return (
                <div
                  className={styles[`${popup}__example`]}
                  key={handleGetHashId(index, 'example')}
                >
                  <div
                    className={styles[`${popup}__example-en`]}
                    dangerouslySetInnerHTML={{
                      __html: handleGetExampleNode(englishItem),
                    }}
                  />
                  <div
                    className={styles[`${popup}__example-ch`]}
                    dangerouslySetInnerHTML={{
                      __html: handleGetExampleNode(chineseItem),
                    }}
                  />
                </div>
              );
            })
          }

          <ul className={styles[`${popup}__status`]}>
            {
              statusList.map((statusText, index) => (
                <li key={handleGetHashId(index, 'status')}>{ statusText }</li>
              ))
            }
          </ul>
        </div>
      </Popup>
    </>
  );
};

export default CollectedCard;
