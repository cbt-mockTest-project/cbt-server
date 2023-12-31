import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';

export const sortQuestions = (
  questions: MockExamQuestion[],
  orders: string[],
): MockExamQuestion[] => {
  const questionsMap = new Map<string, MockExamQuestion>();
  questions.forEach((question) => {
    questionsMap.set(question.orderId, question);
  });
  const sortedQuestions = orders
    .map((id) => questionsMap.get(id))
    .filter((card) => card !== undefined) as MockExamQuestion[];
  return sortedQuestions;
};
