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
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h1 className="flex items-center leading-8 text-sm mini:text-md text-yellow tablet:text-green-dark before-font-material before:content-['\e8ce'] before:w-8 before:h-8 before:leading-8 before:block before:text-center">
          今日單字
        </h1>
        <div className="flex items-center justify-start text-xs text-white tablet:text-black">
          {dateCaption}
        </div>
      </div>

      <div className="carousel relative overflow-hidden">
        <button
          type="button"
          aria-label="carousel-prev-button"
          className={`carousel-prev-button w-6 h-6 text-center block absolute left-1 top-2/4 -translate-y-2/4 z-50 before-font-material before:block before:m-auto ${
            swipeIndex === 0
              ? 'before:text-gray before:cursor-not-allowed'
              : 'before:text-black'
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
              <div className="w-full h-full tablet:p-1">
                <div className="w-full h-full py-16 px-6 flex justify-center items-center rounded-lg tablet:shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] bg-white">
                  <div className="w-full">
                    <div className="text-xl text-center leading-relaxed text-wine break-all mb-2.5">
                      {en}
                    </div>
                    <div className="leading-8 text-xs mini:text-sm">
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
                      className={`favorite-button before-icon-star w-8 h-8 absolute left-4 top-3 before:leading-8 ${
                        isFavorite ? 'text-yellow-dark' : 'text-gray/60'
                      }`}
                      title={isFavorite ? '移除收藏' : '加入收藏'}
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
          className={`carousel-next-button w-6 h-6 text-center block absolute right-1 top-2/4 -translate-y-2/4 z-50 before-font-material before:block before:m-auto ${
            swipeIndex === wordItemList.length - 1
              ? 'before:text-gray before:cursor-not-allowed'
              : 'before:text-black'
          }`}
          onClick={() => swipe?.slideNext()}
        />
        <div className="absolute right-4 top-3 z-50">
          <span className="text-brown/80 text-xs font-bold">
            {swipeIndex + 1}/{wordItemList.length}
          </span>
        </div>
      </div>

      {isShowGuideButton && (
        <div className="flex justify-center mt-3">
          <PrimaryButton
            text="測驗今日單字"
            colorStyle="green-dark"
            onClick={() => setIsShowGuideBtnPopup(true)}
          />
        </div>
      )}

      <Popup
        show={isShowGuideBtnPopup}
        onClose={() => setIsShowGuideBtnPopup(false)}
      >
        <div className="p-px">
          <div className="mb-3 text-wine">請選擇測驗題型：</div>
          <button
            type="button"
            className="flex justify-center items-center w-full p-4 desktop:p-5 mb-3 text-sm desktop:text-base text-green-dark bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] before-font-material before:content-['\e3c9'] before:mr-1 desktop:hover:text-white desktop:hover:bg-green-dark"
            onClick={async () => {
              await dispatch(setIsExamAction(true));
              await router.push('/quiz/writed-daily');
            }}
          >
            填空題
          </button>
          <button
            type="button"
            className="flex justify-center items-center w-full p-4 desktop:p-5 mb-3 text-sm desktop:text-base text-green-dark bg-white rounded-md shadow-[0_1px_3px_0_rgba(51,51,51,0.4)] before-font-material before:content-['\e0ee'] before:mr-1 desktop:hover:text-white desktop:hover:bg-green-dark"
            onClick={async () => {
              await dispatch(setIsExamAction(true));
              await router.push('/quiz/selected-daily');
            }}
          >
            選擇題
          </button>
        </div>
      </Popup>
    </>
  );
};

export default DailyWords;
