import { IExamId } from '@/Interfaces/exam';

const examName = (id: IExamId): string => {
  switch (id) {
  case 'writed-exam':
    return '單字填空測驗';
  case 'daily-writed-exam':
    return '今日單字填空測驗';
  default:
    return '';
  }
};

export default examName;
