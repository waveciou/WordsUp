import { IExamId } from '@/Interfaces/exam';

const examName = (id: IExamId): string => {
  switch (id) {
    // * 隨機單字填空測驗
    case 'writed-random':
      return '單字填空測驗';
    // * 今日單字填空測驗
    case 'writed-daily':
      return '今日單字填空測驗';
    // * 收藏單字填空測驗
    case 'writed-favorite':
      return '收藏單字填空測驗';
    // * 隨機單字選擇測驗
    case 'selected-random':
      return '單字選擇測驗';
    // * 今日單字選擇測驗
    case 'selected-daily':
      return '今日單字選擇測驗';
    // * 收藏單字選擇測驗
    case 'selected-favorite':
      return '收藏單字選擇測驗';
    default:
      return '';
  }
};

export default examName;
