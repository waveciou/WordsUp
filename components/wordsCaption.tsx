import React from 'react';

interface IWordsCaptionProps {
  id: string;
  wordsList: string[];
  partsList: string[];
  hasBrackets?: boolean;
  hasTextCenter?: boolean;
  hasSpeechButton?: boolean;
  onSpeech?: () => void;
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
    {wordsList.map((textItem: string, index: number) => {
      const key: string = `${id}_zh-${index}`;
      return (
        <div
          key={key}
          className={hasTextCenter ? 'flex justify-center items-start' : ''}
        >
          {hasSpeechButton && index === 0 && (
            <button
              type="button"
              aria-label="speech"
              className="w-8 h-8 inline-block align-top mr-1 leading-8 before-font-material before:content-['\e050'] before:block before:leading-8"
              onClick={(
                e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
              ) => {
                e.preventDefault();
                e.stopPropagation();
                onSpeech();
              }}
            />
          )}
          <span className="mr-2.5 font-bold">
            {hasBrackets && '('}
            {partsList[index]}.{hasBrackets && ')'}
          </span>
          <span>{textItem}</span>
        </div>
      );
    })}
  </>
);

export default WordsCaption;
