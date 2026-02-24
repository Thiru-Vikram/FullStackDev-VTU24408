import api from './axios';

export const getAllExams = () => api.get('/student/exams');
export const getExam = (examId) => api.get(`/student/exams/${examId}`);
export const getExamQuestions = (examId) => api.get(`/student/exams/${examId}/questions`);
export const startExam = (examId) => api.post(`/student/exams/${examId}/start`);
export const submitExam = (examId, data) => api.post(`/student/exams/${examId}/submit`, data);
export const getMyResults = () => api.get('/student/results');
