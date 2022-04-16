import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Popup from '@/Components/popup';
import WordItemDetail from '@/Components/wordItemDetail';
import WordsCaption from '@/Components/wordsCaption';
import { IWordItem } from '@/Interfaces/word';

interface ICardProps {
  wordData: IWordItem
}

const Card: React.FC<ICardProps> = ({ wordData }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const {
    id, en, zh, parts,
  } = wordData;

  return (
    <>
      <div
        className="tw-h-full tw-p-3 tw-block tw-rounded-lg tw-cursor-pointer tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]"
        aria-hidden="true"
        onClick={() => setIsShow(true)}
      >
        <div className="tw-text-base tw-text-wine tw-leading-7 tw-break-all">{ en }</div>
        <div className="tw-text-xs tw-text-black tw-leading-6">
          <WordsCaption id={id} wordsList={zh} partsList={parts} />
        </div>
      </div>
      <Popup show={isShow} onClose={() => setIsShow(false)}>
        <WordItemDetail id={uuidv4()} wordData={wordData} />
      </Popup>
    </>
  );
};

export default Card;
