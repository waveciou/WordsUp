import 'swiper/swiper-bundle.css';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import { PrimaryButton } from '@/Components/utils/form';
import Popup from '@/Components/utils/popup';
import WordsCaption from '@/Components/wordsCaption';
import useSpeechSpeak from '@/Hooks/useSpeechSpeak';
import { IWordItem } from '@/Interfaces/word';
import { addFavoriteItem, deleteFavoriteItem } from '@/Slice/collection';
import { setIsShowGuideButton } from '@/Slice/daily';
import { setIsExamAction } from '@/Slice/exam';
import { RootState } from '@/Store/index';

interface IDailyWordsProps {
  dateCaption: string;
  wordItemList: IWordItem[];
}

const DailyWords: React.FC<IDailyWordsProps> = ({
  dateCaption = '',
  wordItemList = [],
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSpeechSpeak = useSpeechSpeak();
  const { isShowGuideButton } = useSelector((state: RootState) => state.daily);
  const FAVORITES_DATA = useSelector(
    (state: RootState) => state.collection.favorites
  );
  const [swipe, setSwipe] = useState<any>(null);
  const [swipeIndex, setSwipeIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isShowGuideBtnPopup, setIsShowGuideBtnPopup] =
    useState<boolean>(false);

  useEffect(() => {
    if (swipeIndex === wordItemList.length - 1) {
      dispatch(setIsShowGuideButton(true));
    }
  }, [swipeIndex]);

  useEffect(() => {
    const word: IWordItem = wordItemList[swipeIndex];
    const dataSet: Set<IWordItem> = new Set(FAVORITES_DATA);
    setIsFavorite(dataSet.has(word));
  }, [swipeIndex, FAVORITES_DATA]);

  useEffect(() => {
    if (isShowGuideButton === false) {
      setIsShowGuideBtnPopup(false);
    }
  }, [isShowGuideButton]);

  // The solution for install swiper issues.
  // https://github.com/nolimits4web/swiper/issues/3855

  return (
    <>
      <div className="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-mb-4">
        <h1 className="tw-flex tw-items-center tw-leading-8 tw-text-sm mini:tw-text-md tw-text-yellow tablet:tw-text-green-dark before-font-material before:tw-content-['\e8ce'] before:tw-w-8 before:tw-h-8 before:tw-leading-8 before:tw-block before:tw-text-center">
          ????????????
        </h1>
        <div className="tw-flex tw-items-center tw-justify-start tw-text-xs tw-text-white tablet:tw-text-black">
          {dateCaption}
        </div>
      </div>

      <div className="carousel tw-relative tw-overflow-hidden">
        <button
          type="button"
          aria-label="carousel-prev-button"
          className={`carousel-prev-button tw-w-6 tw-h-6 tw-text-center tw-block tw-absolute tw-left-1 tw-top-2/4 tw--translate-y-2/4 tw-z-50 before-font-material before:tw-block before:tw-m-auto ${
            swipeIndex === 0
              ? 'before:tw-text-gray before:tw-cursor-not-allowed'
              : 'before:tw-text-black'
          }`}
          onClick={() => swipe?.slidePrev()}
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={({ realIndex }) => setSwipeIndex(realIndex)}
          onBeforeInit={(swipper) => setSwipe(swipper)}
        >
          {wordItemList?.map(({ id, en, zh, parts }: IWordItem) => (
            <SwiperSlide key={uuidv4()}>
              <div className="tw-w-full tw-h-full tablet:tw-p-1">
                <div className="tw-w-full tw-h-full tw-py-16 tw-px-6 tw-flex tw-justify-center tw-items-center tw-rounded-lg tablet:tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] tw-bg-white">
                  <div className="tw-w-full">
                    <div className="tw-text-xl tw-text-center tw-leading-relaxed tw-text-wine tw-break-all tw-mb-2.5">
                      {en}
                    </div>
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
                    <button
                      type="button"
                      aria-label="favorite-button"
                      className={`favorite-button before-icon-star tw-w-8 tw-h-8 tw-absolute tw-left-4 tw-top-3 before:tw-leading-8 ${
                        isFavorite ? 'tw-text-yellow-dark' : 'tw-text-gray/60'
                      }`}
                      title={isFavorite ? '????????????' : '????????????'}
                      onClick={(
                        e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
                      ) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isFavorite) {
                          dispatch(deleteFavoriteItem(id));
                        } else {
                          dispatch(addFavoriteItem(id));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          aria-label="carousel-next-button"
          className={`carousel-next-button tw-w-6 tw-h-6 tw-text-center tw-block tw-absolute tw-right-1 tw-top-2/4 tw--translate-y-2/4 tw-z-50 before-font-material before:tw-block before:tw-m-auto ${
            swipeIndex === wordItemList.length - 1
              ? 'before:tw-text-gray before:tw-cursor-not-allowed'
              : 'before:tw-text-black'
          }`}
          onClick={() => swipe?.slideNext()}
        />
        <div className="tw-absolute tw-right-4 tw-top-3 tw-z-50">
          <span className="tw-text-brown/80 tw-text-xs tw-font-bold">
            {swipeIndex + 1}/{wordItemList.length}
          </span>
        </div>
      </div>

      {isShowGuideButton && (
        <div className="tw-flex tw-justify-center tw-mt-3">
          <PrimaryButton
            text="??????????????????"
            colorStyle="green-dark"
            onClick={() => setIsShowGuideBtnPopup(true)}
          />
        </div>
      )}

      <Popup
        show={isShowGuideBtnPopup}
        onClose={() => setIsShowGuideBtnPopup(false)}
      >
        <div className="tw-p-px">
          <div className="tw-mb-3 tw-text-wine">????????????????????????</div>
          <button
            type="button"
            className="tw-flex tw-justify-center tw-items-center tw-w-full tw-p-4 desktop:tw-p-5 tw-mb-3 tw-text-sm desktop:tw-text-base tw-text-green-dark tw-bg-white tw-rounded-md tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] before-font-material before:tw-content-['\e3c9'] before:tw-mr-1 desktop:hover:tw-text-white desktop:hover:tw-bg-green-dark"
            onClick={async () => {
              await dispatch(setIsExamAction(true));
              await router.push('/quiz/writed-daily');
            }}
          >
            ?????????
          </button>
          <button
            type="button"
            className="tw-flex tw-justify-center tw-items-center tw-w-full tw-p-4 desktop:tw-p-5 tw-mb-3 tw-text-sm desktop:tw-text-base tw-text-green-dark tw-bg-white tw-rounded-md tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] before-font-material before:tw-content-['\e0ee'] before:tw-mr-1 desktop:hover:tw-text-white desktop:hover:tw-bg-green-dark"
            onClick={async () => {
              await dispatch(setIsExamAction(true));
              await router.push('/quiz/selected-daily');
            }}
          >
            ?????????
          </button>
        </div>
      </Popup>
    </>
  );
};

export default DailyWords;
