import { IExamId } from '@/Interfaces/exam';

const examName = (id: IExamId): string => {
  switch (id) {
    case 'writed-random':
      return '隨機單字測驗';
    case 'writed-daily':
      return '今日單字測驗';
    case 'writed-favorite':
      return '收藏單字測驗';
    default:
      return '';
  }
};

export default examName;
