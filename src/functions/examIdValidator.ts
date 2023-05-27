import { IExamId } from '@/Interfaces/exam';

const examIdCollection: IExamId[] = [
  'writed-random',
  'writed-daily',
  'writed-favorite',
  'selected-random',
  'selected-daily',
  'selected-favorite',
];

const examIdValidator = (id: IExamId) => {
  const collectionSet: Set<IExamId> = new Set(examIdCollection);
  return collectionSet.has(id);
};

export default examIdValidator;
