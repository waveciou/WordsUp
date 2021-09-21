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
import handleSetWordStatusNode from '../src/functions/handleSetWordStatusNode';
import handleGetHashId from '../src/functions/handleGetHashId';
import handleObjectDeepClone from '../src/functions/handleObjectDeepClone';

// Interface
import { IWordItem, IExampleListItem } from '../src/interfaces/I_WordCase';

const card: string = 'collectedCard';
const popup: string = 'collectedPopup';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const [isShow, setIsShow] = useState(false);
  const {
    english, chinese, part, status, englishExample, chineseExample,
  } = word;

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

  return (
    <>
      <div
        className={styles[card]}
        aria-hidden="true"
        onClick={() => { setIsShow(true); }}
      >
        <div className={styles[`${[card]}__title`]}>{ english }</div>
        <div className={styles[`${[card]}__subtitle`]}>
          <span className={styles[`${[card]}__part`]}>{ part }</span>
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
            <span className={styles[`${popup}__part`]}>{ part }</span>
            <span>{ chinese }</span>
          </div>

          {
            exampleList.map((example, index) => {
              const { englishItem, chineseItem } = example;

              return (
                <div key={handleGetHashId(index, 'exampleList')}>
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

          {
            status.map((statusText, index) => (
              <div
                key={handleGetHashId(index, 'status')}
                className={styles[`${popup}__status`]}
                dangerouslySetInnerHTML={{
                  __html: handleSetWordStatusNode(statusText),
                }}
              />
            ))
          }
        </div>
      </Popup>
    </>
  );
};

export default CollectedCard;
