import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Functions
import initGapiClient from './googleSheetAPI/initAPIClient';
import makeGapiCallback from './googleSheetAPI/makeAPICallback';
import handleProcessSheetData from './handleProcessSheetData';

// Redux
import { setLoaderControl } from '../../store/slice/loaderControlSlice';
import { setWordsCollection } from '../../store/slice/wordsCollectionSlice';

const HandleGetGoogleSheetData = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setLoaderControl(true));

    initGapiClient((SHEET_ID) => {
      makeGapiCallback(SHEET_ID).then(async (response: any) => {
        const sheetData = handleProcessSheetData(response);
        await dispatch(setWordsCollection(sheetData));
        await dispatch(setLoaderControl(false));
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    });
  }, [dispatch]);
};

export default HandleGetGoogleSheetData;
