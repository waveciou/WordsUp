/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import initGapiClient from '@/Functions/googleSheetAPI/initAPIClient';
import makeGapiCallback from '@/Functions/googleSheetAPI/makeAPICallback';
import handleMergeDuplicateSheetData from '@/Functions/mergeDuplicateSheetData';
import handleProcessSheetData from '@/Functions/processSheetData';
import { setLoaderControl } from '@/Slice/loaderControlSlice';
import { setWordsCollection } from '@/Slice/wordsCollectionSlice';

const HandleGetGoogleSheetData = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setLoaderControl(true));

    initGapiClient((SHEET_ID) => {
      makeGapiCallback(SHEET_ID).then(async (response: any) => {
        const _sheetData = handleProcessSheetData(response);
        const sheetData = handleMergeDuplicateSheetData(_sheetData);
        await dispatch(setWordsCollection(sheetData));
        await dispatch(setLoaderControl(false));
      }).catch((error) => {
        console.log(error);
      });
    });
  }, [dispatch]);
};

export default HandleGetGoogleSheetData;
