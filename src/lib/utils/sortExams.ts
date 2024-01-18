import { MockExam } from 'src/exam/entities/mock-exam.entity';

export const sortExams = (
  mockExams: MockExam[],
  orders: number[],
): MockExam[] => {
  return mockExams.sort((a, b) => {
    return orders.indexOf(a.id) - orders.indexOf(b.id);
  });
};
