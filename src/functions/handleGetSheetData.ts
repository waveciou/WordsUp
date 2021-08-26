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

const handleGetSheetData = (sheetData: ISheetDataValue[]) => {
  const datas: ISheetDataValue[] = [...sheetData];

  const getFormatValue = (values: ISheetDataItem[], index: number) => values[index]?.formattedValue || '';

  const resultData: IWordCase[] = datas.map((data: ISheetDataValue) => {
    const { values } = data;

    const result: IWordCase = {
      english: getFormatValue(values, 0),
      chinese: getFormatValue(values, 1),
      part: getFormatValue(values, 2),
      englishExample: {
        sentence: getFormatValue(values, 3),
        key: getFormatValue(values, 4),
      },
      chineseExample: {
        sentence: getFormatValue(values, 5),
        key: getFormatValue(values, 6),
      },
      status: getFormatValue(values, 7),
    };

    return result;
  });

  resultData.shift();
  return resultData;
};

export default handleGetSheetData;
