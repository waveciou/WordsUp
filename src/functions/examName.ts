import { IExamId } from '@/Interfaces/exam';

const examName = (id: IExamId): string => {
  switch (id) {
    case 'writed-random':
      return '單字填空測驗';
    case 'writed-daily':
      return '今日單字填空測驗';
    case 'writed-group-1':
      return 'ABCDE 單字填空測驗';
    case 'writed-group-2':
      return 'FGHIJ 單字填空測驗';
    case 'writed-group-3':
      return 'KLMNO 單字填空測驗';
    case 'writed-group-4':
      return 'PQRST 單字填空測驗';
    case 'writed-group-5':
      return 'UVWXYZ 單字填空測驗';
    default:
      return '';
  }
};

export default examName;
