import { IExamId } from '@/Interfaces/exam';

const examIdCollection: IExamId[] = ['writed-random', 'writed-daily'];

const examIdValidator = (id: IExamId) => {
  const collectionSet: Set<IExamId> = new Set(examIdCollection);
  return collectionSet.has(id);
};

export default examIdValidator;
