import { IWordCase } from '@/Interfaces/I_WordCase';

const handleMergeDuplicateSheetData = (sheetData: IWordCase[]) => {
  const result = sheetData.reduce((prevList: IWordCase[], currentItem: IWordCase) => {
    if (prevList.length > 0) {
      const prevItem = prevList[prevList.length - 1];

      if (prevItem.english === currentItem.english) {
        prevItem.parts.push(currentItem.parts[0]);
        prevItem.status.push(currentItem.status[0]);
        prevItem.englishExample.push(currentItem.englishExample[0]);
        prevItem.chineseExample.push(currentItem.chineseExample[0]);
        return [...prevList];
      }
    }

    return [...prevList, ...[currentItem]];
  }, []);

  return result;
};

export default handleMergeDuplicateSheetData;
