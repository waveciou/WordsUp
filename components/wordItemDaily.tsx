import React from 'react';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';

interface IWordItemDailyProps {
  dateCaption: string,
  wordData: IWordItem,
  onFresh: () => void
}

const WordItemDaily: React.FC<IWordItemDailyProps> = ({
  dateCaption,
  wordData,
  onFresh = () => {},
}) => {
  const handleSpeechSpeak = useSpeechSpeak();

  const {
    id, en, zh, parts,
  } = wordData;

  return (
    <>
      <div className="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-mb-4">
        <h1 className="tw-flex tw-items-center tw-leading-8 tw-text-md tw-text-green-dark before-font-material before:tw-content-['\e8ce'] before:tw-w-8 before:tw-h-8 before:tw-leading-8 before:tw-block before:tw-text-center before:tw-mr-1.5">
          今日單字
        </h1>
        <button type="button" aria-label="refresh-button" className="tw-w-8 tw-h-8 tw-block tw-leading-8 before-font-material before:tw-content-['\e5d5'] before:tw-leading-8 before:tw-text-center" onClick={onFresh} />
      </div>
      <div className="tw-py-14 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
        <div className="tw-text-xl tw-text-center tw-leading-10 tw-text-wine tw-break-all tw-mb-2.5">{ en }</div>
        <WordsCaption
          id={id}
          wordsList={zh}
          partsList={parts}
          hasBrackets
          hasTextCenter
          hasSpeechButton
          onSpeech={() => { handleSpeechSpeak(en); }}
        />
      </div>
      <div className="tw-text-xs tw-text-center tw-pt-4">{ dateCaption }</div>
    </>
  );
};

export default WordItemDaily;
