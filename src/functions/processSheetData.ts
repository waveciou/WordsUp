import { ISheetDataItem, ISheetDataValue } from '@/Interfaces/I_SheetData';
import { IWordCase } from '@/Interfaces/I_WordCase';

const handleProcessSheetData = (sheetData: ISheetDataValue[]) => {
  const datas: ISheetDataValue[] = [...sheetData];

  const getFormatValue = (values: ISheetDataItem[], index: number) => values[index]?.formattedValue || '';

  const resultData: IWordCase[] = datas.map((data: ISheetDataValue) => {
    const { values } = data;

    const result: IWordCase = {
      english: getFormatValue(values, 0),
      chinese: getFormatValue(values, 1),
      parts: [getFormatValue(values, 2)],
      englishExample: [
        {
          sentence: getFormatValue(values, 3),
          key: getFormatValue(values, 4),
        },
      ],
      chineseExample: [
        {
          sentence: getFormatValue(values, 5),
          key: getFormatValue(values, 6),
        },
      ],
      status: [
        getFormatValue(values, 7),
      ],
    };

    return result;
  });

  resultData.shift();
  return resultData;
};

export default handleProcessSheetData;
