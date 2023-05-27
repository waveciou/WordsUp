import {
  EnumSelectedExamID,
  EnumWritedExamID,
  IExamID,
} from '@/Interfaces/exam';

const examIdCollection: IExamID[] = [
  EnumWritedExamID.RANDOM,
  EnumWritedExamID.DAILY,
  EnumWritedExamID.FAVORITE,
  EnumSelectedExamID.RANDOM,
  EnumSelectedExamID.DAILY,
  EnumSelectedExamID.FAVORITE,
];

const examIdValidator = (id: IExamID) => {
  const collectionSet: Set<IExamID> = new Set(examIdCollection);
  return collectionSet.has(id);
};

export default examIdValidator;
