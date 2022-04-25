import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setDateCaption, setDateId } from '@/Slice/daily';

const useSetDate = () => {
  dayjs.extend(utc);
  const dispatch = useDispatch();

  return useCallback(() => {
    const now: number = dayjs().valueOf();
    const id: string = dayjs(now).utcOffset(8).format('YYYY-MM-DD');

    dispatch(setDateId(id));
    dispatch(setDateCaption(dayjs(now).utcOffset(8).format('YYYY年MM月DD日')));
    return id;
  }, [dispatch]);
};

export default useSetDate;
