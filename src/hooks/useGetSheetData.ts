/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import initGapiClient from '@/Functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '@/Functions/googleSheetAPI/makeAPICallback';
// import handleMergeDuplicateSheetData from '@/Functions/mergeDuplicateSheetData';
// import handleProcessSheetData from '@/Functions/processSheetData';
import { setIsLoading } from '@/Slice/common';

// import { setWordsCollection } from '@/Slice/wordsCollectionSlice';

const useGetSheetData = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setIsLoading(true));

    initGapiClient((SHEET_ID) => {
      makeGapiCallback(SHEET_ID).then(async (response: any) => {
        console.log(response);
        await dispatch(setIsLoading(false));
      }).catch((error) => {
        console.log(error);
      });
    });
  }, [dispatch]);
};

export default useGetSheetData;
