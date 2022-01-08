/* eslint-disable no-console */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Functions
import initGapiClient from './googleSheetAPI/initAPIClient';
import makeGapiCallback from './googleSheetAPI/makeAPICallback';
import handleProcessSheetData from './processSheetData';
import handleMergeDuplicateSheetData from './mergeDuplicateSheetData';

// Redux
import { setLoaderControl } from '../../store/slice/loaderControlSlice';
import { setWordsCollection } from '../../store/slice/wordsCollectionSlice';

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
