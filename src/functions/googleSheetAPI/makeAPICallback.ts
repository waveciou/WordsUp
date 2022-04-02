import { IGapiResponse, ISheetData } from '@/Interfaces/sheetData';
import { IWordItem } from '@/Interfaces/word';

const makeApiCall = (sheetId: string) => {
  const request = window.gapi.client.sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    ranges: 'Sheet1!2:1249',
    includeGridData: true,
  });

  return new Promise((resolve, reject) => {
    request.then((response: any) => {
      const sheetRowData: ISheetData[] = response.result.sheets[0].data[0].rowData;

      const result: IGapiResponse = { parts: [], words: [] };

      const wordsData: IWordItem[] = sheetRowData.map((sheetData: ISheetData, index: number) => {
        const enItemData: string = sheetData.values[0].formattedValue;
        const zhItemData: string = sheetData.values[1].formattedValue;
        const alphabet: string = enItemData.slice(0, 1).toLowerCase();

        const parts: string[] = zhItemData.match(/(?<=【)([a-z]{1,})/gi) ?? [];
        const partsToSet = new Set([...result.parts, ...parts]);

        result.parts = [...partsToSet];

        return {
          id: `${index}`,
          alphabet,
          parts,
          en: enItemData,
          zh: zhItemData.split('%').map((itemText) => {
            const name: string[] = itemText.split('$');
            return `${name[0]}`;
          }),
        };
      });

      result.words = wordsData;

      resolve(result);
    }, (response: any) => reject(response));
  });
};

export default makeApiCall;
