import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';

export const disciplineLabel = {
  [Discipline.Design]: 'Dizajn',
  [Discipline.Development]: 'Programiranje',
  [Discipline.Marketing]: 'Marketing',
  [Discipline.Multimedia]: 'Multimedija',
};

export const disciplineStatusLabel = {
  [DisciplineStatus.Pending]: 'Na čekanju',
  [DisciplineStatus.Rejected]: 'Odbijen',
  [DisciplineStatus.Approved]: 'Primljen',
};

export const testStatusLabel = {
  [TestStatus.Pending]: 'Na čekanju',
  [TestStatus.Missed]: 'Propušteno',
  [TestStatus.Done]: 'Obavljeno',
};

export const interviewStatusLabel = {
  [InterviewStatus.Pending]: 'Na čekanju',
  [InterviewStatus.Missed]: 'Propušteno',
  [InterviewStatus.Done]: 'Obavljeno',
};
