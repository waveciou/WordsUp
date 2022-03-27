/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import initGapiClient from '@/Functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '@/Functions/googleSheetAPI/makeAPICallback';
import { IWordItem } from '@/Interfaces/word';
import { setWordItems } from '@/Slice/collection';
import { setIsLoading } from '@/Slice/common';

const useGetSheetData = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setIsLoading(true));

    initGapiClient((SHEET_ID) => {
      makeGapiCallback(SHEET_ID).then(async (response) => {
        await dispatch(setWordItems(response as IWordItem[]));
        await dispatch(setIsLoading(false));
      }).catch((error) => {
        console.log(error);
      });
    });
  }, [dispatch]);
};

export default useGetSheetData;
