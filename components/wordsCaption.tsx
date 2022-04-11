import React from 'react';

import stylesButton from '@/Styles/button.module.scss';

interface IWordsCaptionProps {
  id: string,
  wordsList: string[],
  partsList: string[],
  hasBrackets?: boolean,
  hasTextCenter?: boolean,
  hasSpeechButton?: boolean,
  handleSpeech?: () => void
}

const wordsCaption: React.FC<IWordsCaptionProps> = ({
  id,
  wordsList,
  partsList,
  hasBrackets = false,
  hasTextCenter = false,
  hasSpeechButton = false,
  handleSpeech = () => {},
}) => (
  <>
    {wordsList.map((textItem: string, index: number) => {
      const key: string = `${id}_zh-${index}`;
      return (
        <div
          key={key}
          className={`${hasTextCenter && 'tw-flex tw-items-center tw-justify-center'}`}
        >
          {
            hasSpeechButton && index === 0 && (
              <div className="tw-inline-block">
                <button
                  type="button"
                  aria-label="speech"
                  className={stylesButton['speech-btn']}
                  onClick={handleSpeech}
                />
              </div>
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
    })}
  </>
);

export default wordsCaption;
