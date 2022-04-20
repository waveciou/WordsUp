/* eslint-disable no-useless-escape */
import 'swiper/swiper-bundle.css';

// Swiper issues
// https://github.com/nolimits4web/swiper/issues/3855
//
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hook/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';

interface IWordItemDailyProps {
  dateCaption: string,
  wordsData: IWordItem[]
}

const WordItemDaily: React.FC<IWordItemDailyProps> = ({
  dateCaption = '',
  wordsData = [],
}) => {
  const handleSpeechSpeak = useSpeechSpeak();
  const [swipe, setSwipe] = useState<any>(null);
  const [swipeIndex, setSwipeIndex] = useState<number>(0);

  return (
    <>
      <div className="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-mb-4">
        <h1 className="tw-flex tw-items-center tw-leading-8 tw-text-sm mini:tw-text-md tw-text-green-dark before-font-material before:tw-content-['\e8ce'] before:tw-w-8 before:tw-h-8 before:tw-leading-8 before:tw-block before:tw-text-center">
          今日單字
        </h1>
        <div className="tw-flex tw-items-center tw-justify-start">
          <div className="tw-text-xs">{ dateCaption }</div>
        </div>
      </div>

      <div className="carousel tw-relative tw-overflow-hidden">
        <button
          type="button"
          aria-label="carousel-prev-button"
          className={`carousel-prev-button tw-w-7 tw-h-7 tw-text-center tw-block tw-absolute tw-left-0 tw-top-2/4 tw--translate-y-2/4 tw-z-50 before-font-material before:tw-block before:tw-m-auto ${swipeIndex === 0 ? 'before:tw-text-gray before:tw-cursor-not-allowed' : 'before:tw-text-black'}`}
          onClick={() => swipe?.slidePrev()}
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={({ realIndex }) => setSwipeIndex(realIndex)}
          onBeforeInit={(swipper) => setSwipe(swipper)}
        >
          {
            wordsData?.map(({
              id, en, zh, parts,
            }: IWordItem) => (
              <SwiperSlide key={uuidv4()}>
                <div className="tw-w-full tw-h-full tw-p-1">
                  <div className="tw-w-full tw-h-full tw-py-16 tw-px-6 tw-flex tw-justify-center tw-items-center tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]">
                    <div className="tw-w-full">
                      <div className="tw-text-xl tw-text-center tw-leading-relaxed tw-text-wine tw-break-all tw-mb-2.5">{ en }</div>
                      <div className="tw-leading-8 tw-text-xs mini:tw-text-sm">
                        <WordsCaption
                          id={id}
                          wordsList={zh}
                          partsList={parts}
                          hasBrackets
                          hasTextCenter
                          hasSpeechButton
                          onSpeech={() => handleSpeechSpeak(en)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <button
          type="button"
          aria-label="carousel-next-button"
          className={`carousel-next-button tw-w-7 tw-h-7 tw-text-center tw-block tw-absolute tw-right-0 tw-top-2/4 tw--translate-y-2/4 tw-z-50 before-font-material before:tw-block before:tw-m-auto ${swipeIndex === wordsData.length - 1 ? 'before:tw-text-gray before:tw-cursor-not-allowed' : 'before:tw-text-black'}`}
          onClick={() => swipe?.slideNext()}
        />
      </div>
    </>
  );
};

export default WordItemDaily;
