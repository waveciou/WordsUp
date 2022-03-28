/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import initGapiClient from '@/Functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '@/Functions/googleSheetAPI/makeAPICallback';
import { IGapiResponse } from '@/Interfaces/sheetData';
import { setPartItems, setWordItems } from '@/Slice/collection';
import { setIsLoading } from '@/Slice/common';

const useGetSheetData = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setIsLoading(true));

    initGapiClient((SHEET_ID) => {
      makeGapiCallback(SHEET_ID).then(async (response) => {
        const { words, parts } = response as IGapiResponse;

        const partsResult: string[] = parts.sort((a, b) => {
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        });

        await dispatch(setWordItems(words));
        await dispatch(setPartItems(partsResult));
        await dispatch(setIsLoading(false));
      }).catch((error) => {
        console.log(error);
      });
    });
  }, [dispatch]);
};

export default useGetSheetData;
