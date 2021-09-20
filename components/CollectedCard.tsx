/* eslint-disable react/no-danger */
import * as React from 'react';
import { useState, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

// Style
import styles from '../styles/components/Collection.module.scss';

// Component
import Popup from './common/Popup';

// Function
import handleGetExampleNode from '../src/functions/handleGetExampleNode';
import handleSetWordStatusNode from '../src/functions/handleSetWordStatusNode';

// Interface
import { IWordItem } from '../src/interfaces/I_WordCase';

const card: string = 'collectedCard';
const popup: string = 'collectedPopup';

const CollectedCard: React.FC<IWordItem> = ({ word }: IWordItem) => {
  const [isShow, setIsShow] = useState(false);
  const {
    english, chinese, part, status, englishExample, chineseExample,
  } = word;

  const exampleSentenceEN: string = handleGetExampleNode(englishExample);
  const exampleSentenceCH: string = handleGetExampleNode(chineseExample);

  // Speech Synthesis
  const { speak, speaking } = useSpeechSynthesis();

  const handleSpeechSpeak = useCallback((_text: string) => {
    if (speaking === false) {
      speak({ text: _text });
    }
  }, [speak, speaking]);

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
          <div
            className={styles[`${popup}__example-en`]}
            dangerouslySetInnerHTML={{ __html: exampleSentenceEN }}
          />
          <div
            className={styles[`${popup}__example-ch`]}
            dangerouslySetInnerHTML={{ __html: exampleSentenceCH }}
          />
          {
            status !== ''
              ? (
                <div
                  className={styles[`${popup}__status`]}
                  dangerouslySetInnerHTML={{ __html: handleSetWordStatusNode(status) }}
                />
              ) : null
          }
        </div>
      </Popup>
    </>
  );
};

export default CollectedCard;
