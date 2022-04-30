/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import initGapiClient from '@/Functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '@/Functions/googleSheetAPI/makeAPICallback';
import { IGapiResponse } from '@/Interfaces/sheetData';
import { setPartItems, setWordItems } from '@/Slice/collection';
import { setIsLoading } from '@/Slice/common';

const useGetSheetData = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setIsLoading(true));

    initGapiClient({
      handleCallback: (SHEET_ID) => {
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
          console.error(error);
        });
      },
      handleError: () => {
        router.push('/error');
      },
    });
  }, [dispatch]);
};

export default useGetSheetData;
