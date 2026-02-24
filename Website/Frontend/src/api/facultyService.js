import api from './axios';

// Exams
export const createExam = (data) => api.post('/faculty/exams', data);
export const getMyExams = () => api.get('/faculty/exams');
export const updateExam = (id, data) => api.put(`/faculty/exams/${id}`, data);
export const deleteExam = (id) => api.delete(`/faculty/exams/${id}`);

// Questions
export const addQuestion = (examId, data) => api.post(`/faculty/exams/${examId}/questions`, data);
export const getQuestions = (examId) => api.get(`/faculty/exams/${examId}/questions`);
export const updateQuestion = (id, data) => api.put(`/faculty/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/faculty/questions/${id}`);

// Results
export const getExamResults = (examId) => api.get(`/faculty/exams/${examId}/results`);
