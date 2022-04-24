import React from 'react';
import { useSelector } from 'react-redux';

import DailyWords from '@/Components/dailyWords';
import { RootState } from '@/Store/index';

const Home: React.FC = () => {
  const { dateCaption, dailyWords } = useSelector((state: RootState) => state.daily);

  return (
    <div className="content size-small tw-py-5 tw-px-3 tablet:tw-px-4">
      <DailyWords
        dateCaption={dateCaption}
        wordsData={dailyWords}
      />
    </div>
  );
};

export default Home;
