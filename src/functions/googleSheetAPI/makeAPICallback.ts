const makeApiCall = (sheetId: string) => {
  const params = {
    spreadsheetId: sheetId,
    ranges: [],
    includeGridData: true,
  };

  const request = window.gapi.client.sheets.spreadsheets.get(params);

  return new Promise((resolve, reject) => {
    request.then((response: any) => {
      const result: ISheetDataValue[] = response.result.sheets[0].data[0].rowData;
      resolve(result);
    }, (response: any) => {
      reject(response);
    });
  });
};

export default makeApiCall;
