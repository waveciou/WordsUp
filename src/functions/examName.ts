import { IExamId } from '@/Interfaces/exam';

const examName = (id: IExamId): string => {
  switch (id) {
    // * 隨機單字填空測驗
    case 'writed-random':
      return '隨機單字測驗';
    // * 今日單字填空測驗
    case 'writed-daily':
      return '今日單字測驗';
    // * 收藏單字填空測驗
    case 'writed-favorite':
      return '收藏單字測驗';
    default:
      return '';
  }
};

export default examName;
