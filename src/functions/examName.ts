import {
  EnumSelectedExamID,
  EnumWritedExamID,
  IExamID,
} from '@/Interfaces/exam';

const examName = (id: IExamID): string => {
  switch (id) {
    // * 隨機單字填空測驗
    case EnumWritedExamID.RANDOM:
      return '單字填空測驗';
    // * 今日單字填空測驗
    case EnumWritedExamID.DAILY:
      return '今日單字填空測驗';
    // * 收藏單字填空測驗
    case EnumWritedExamID.FAVORITE:
      return '收藏單字填空測驗';
    // * 隨機單字選擇測驗
    case EnumSelectedExamID.RANDOM:
      return '單字選擇測驗';
    // * 今日單字選擇測驗
    case EnumSelectedExamID.DAILY:
      return '今日單字選擇測驗';
    // * 收藏單字選擇測驗
    case EnumSelectedExamID.FAVORITE:
      return '收藏單字選擇測驗';
    default:
      return '';
  }
};

export default examName;
