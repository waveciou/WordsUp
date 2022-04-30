/* eslint-disable react/require-default-props */
import React from 'react';

interface IWordsCaptionProps {
  id: string,
  wordsList: string[],
  partsList: string[],
  hasBrackets?: boolean,
  hasTextCenter?: boolean,
  hasSpeechButton?: boolean,
  onSpeech?: () => void
}

const WordsCaption: React.FC<IWordsCaptionProps> = ({
  id,
  wordsList,
  partsList,
  hasBrackets = false,
  hasTextCenter = false,
  hasSpeechButton = false,
  onSpeech = () => {},
}) => (
  <>
    {
      wordsList.map((textItem: string, index: number) => {
        const key: string = `${id}_zh-${index}`;
        return (
          <div
            key={key}
            className={hasTextCenter ? 'tw-flex tw-justify-center tw-items-start' : ''}
          >
            {
              hasSpeechButton && index === 0 && (
                <button
                  type="button"
                  aria-label="speech"
                  className="tw-inline-block tw-align-top tw-mr-1 tw-leading-8 before-font-material before:tw-content-['\e050'] before:tw-w-8 before:tw-h-8 before:tw-block before:tw-leading-8 before:tw-text-center"
                  onClick={(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSpeech();
                  }}
                />
              )
            }
            <span className="tw-mr-2.5 tw-font-bold">
              { hasBrackets && '(' }
              { partsList[index] }
              .
              { hasBrackets && ')' }
            </span>
            <span>{ textItem }</span>
          </div>
        );
      })
    }
  </>
);

export default WordsCaption;
