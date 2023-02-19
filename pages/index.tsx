import React from 'react';
import { useSelector } from 'react-redux';

import DailyWords from '@/Components/dailyWords';
import { RootState } from '@/Store/index';

const Home: React.FC = () => {
  const { dateCaption, dailyWords } = useSelector(
    (state: RootState) => state.daily
  );

  return (
    <div className="content size-small py-0 tablet:py-5 px-0 tablet:px-4 bg-transparent tablet:bg-white">
      <DailyWords dateCaption={dateCaption} wordItemList={dailyWords} />
    </div>
  );
};

export default Home;
