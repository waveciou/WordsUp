declare global {
  interface ISheetDataItem {
    effectiveFormat: {};
    effectiveValue?: {};
    formattedValue?: string | undefined;
    userEnteredValue?: {};
  }

  interface ISheetDataValue {
    values: ISheetDataItem[]
  }

  interface IWordCase {
    english: string,
    chinese: string,
    part: string,
    englishExample: {
      sentence: string,
      key: string,
    },
    chineseExample: {
      sentence: string,
      key: string,
    },
    status: string
  }
}

const getSheetData = (sheetData: ISheetDataValue[]) => {
  const datas: ISheetDataValue[] = [...sheetData];

  const resultData: IWordCase[] = datas.map((data: ISheetDataValue) => {
    const { values } = data;

    const result: IWordCase = {
      english: values[0]?.formattedValue || '',
      chinese: values[1]?.formattedValue || '',
      part: values[2]?.formattedValue || '',
      englishExample: {
        sentence: values[3]?.formattedValue || '',
        key: values[4]?.formattedValue || '',
      },
      chineseExample: {
        sentence: values[5]?.formattedValue || '',
        key: values[6]?.formattedValue || '',
      },
      status: values[7]?.formattedValue || '',
    };

    return result;
  });

  resultData.shift();
  return resultData;
};

export default getSheetData;
