import api from './axios';

const mockExams = [
  { id: 1, title: 'Data Structures & Algorithms', duration: 60, totalMarks: 100, subject: 'CSE', questionCount: 20 },
  { id: 2, title: 'Operating Systems', duration: 45, totalMarks: 50, subject: 'CSE', questionCount: 10 },
  { id: 3, title: 'Database Management Systems', duration: 90, totalMarks: 100, subject: 'CSE', questionCount: 25 },
];

const mockQuestions = [
  { id: 1, text: 'What is the time complexity of binary search?', optionA: 'O(n)', optionB: 'O(log n)', optionC: 'O(n^2)', optionD: 'O(1)', correctOption: 'B', marks: 5 },
  { id: 2, text: 'Which data structure uses LIFO?', optionA: 'Queue', optionB: 'Tree', optionC: 'Stack', optionD: 'Graph', correctOption: 'C', marks: 5 },
];

const mockResults = [
  { studentName: 'Alice', score: 90, totalMarks: 100, percentage: 90, status: 'PASS' },
  { studentName: 'Bob', score: 45, totalMarks: 100, percentage: 45, status: 'FAIL' },
];

const fallback = (mockData) => Promise.resolve({ data: mockData });

// Exams
export const createExam = (data) => api.post('/faculty/exams', data);
export const getMyExams = () => api.get('/faculty/exams').catch(() => fallback(mockExams));
export const updateExam = (id, data) => api.put(`/faculty/exams/${id}`, data);
export const deleteExam = (id) => api.delete(`/faculty/exams/${id}`);

// Questions
export const addQuestion = (examId, data) => api.post(`/faculty/exams/${examId}/questions`, data);
export const getQuestions = (examId) => api.get(`/faculty/exams/${examId}/questions`).catch(() => fallback(mockQuestions));
export const updateQuestion = (id, data) => api.put(`/faculty/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/faculty/questions/${id}`);

// Results
export const getExamResults = (examId) => api.get(`/faculty/exams/${examId}/results`).catch(() => fallback(mockResults));
