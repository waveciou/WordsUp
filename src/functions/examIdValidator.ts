import { IExamId } from '@/Interfaces/exam';

const examIdCollection: IExamId[] = ['writed-random', 'writed-daily'];

const examIdValidator = (id: IExamId) => examIdCollection.includes(id);

export default examIdValidator;
