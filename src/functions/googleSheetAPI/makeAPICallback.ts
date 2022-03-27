import { ISheetData } from '@/Interfaces/sheetData';
import { IWordItem } from '@/Interfaces/word';

const makeApiCall = (sheetId: string) => {
  const request = window.gapi.client.sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    ranges: 'Sheet1!2:1036',
    includeGridData: true,
  });

  return new Promise((resolve, reject) => {
    request.then((response: any) => {
      const sheetRowData: ISheetData[] = response.result.sheets[0].data[0].rowData;
      const result: IWordItem[] = sheetRowData.map((sheetData: ISheetData) => {
        const enItemData: string = sheetData.values[0].formattedValue;
        const zhItemData: string = sheetData.values[1].formattedValue;
        const alphabet: string = enItemData.slice(0, 1).toLowerCase();
        return {
          alphabet,
          en: enItemData,
          zh: zhItemData.split('%').map((itemText) => {
            const name: string[] = itemText.split('$');
            return `${name[0]}`;
          }),
          parts: zhItemData.match(/(?<=【)([a-z]{1,})/gi) ?? [],
        };
      });
      resolve(result);
    }, (response: any) => reject(response));
  });
};

export default makeApiCall;
