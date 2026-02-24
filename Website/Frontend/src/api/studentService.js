import api from './axios';

const mockExams = [
  { id: 1, title: 'Data Structures & Algorithms', duration: 60, totalMarks: 100, subject: 'CSE' },
  { id: 2, title: 'Operating Systems', duration: 45, totalMarks: 50, subject: 'CSE' },
  { id: 3, title: 'Database Management Systems', duration: 90, totalMarks: 100, subject: 'CSE' },
];

const mockResults = [
  { attemptId: 1, examTitle: 'Data Structures & Algorithms', score: 82, totalMarks: 100, percentage: 82, status: 'PASS' },
  { attemptId: 2, examTitle: 'Operating Systems', score: 36, totalMarks: 50, percentage: 72, status: 'PASS' },
  { attemptId: 3, examTitle: 'Computer Networks', score: 20, totalMarks: 50, percentage: 40, status: 'FAIL' },
];

const fallback = (mockData) => Promise.resolve({ data: mockData });

export const getAllExams = () => api.get('/student/exams').catch(() => fallback(mockExams));
export const getExam = (examId) => api.get(`/student/exams/${examId}`).catch(() => fallback(mockExams.find(e => e.id === +examId) || {}));
export const getExamQuestions = (examId) => api.get(`/student/exams/${examId}/questions`).catch(() => fallback([]));
export const startExam = (examId) => api.post(`/student/exams/${examId}/start`).catch(() => fallback({}));
export const submitExam = (examId, data) => api.post(`/student/exams/${examId}/submit`, data).catch(() => fallback({ score: 0, totalMarks: 100, percentage: 0, status: 'FAIL' }));
export const getMyResults = () => api.get('/student/results').catch(() => fallback(mockResults));
