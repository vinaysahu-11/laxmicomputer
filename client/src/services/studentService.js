import api from './api';

export const getStudents = async (params = {}) => {
  const response = await api.get('/students', { params });
  return response.data;
};

export const createStudent = async (formData) => {
  // Support both FormData (file uploads) and JSON payloads
  const headers = formData instanceof FormData 
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  const response = await api.post('/students', formData, { headers });
  return response.data;
};

export const updateStudent = async (id, formData) => {
  const headers = formData instanceof FormData 
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  const response = await api.put(`/students/${id}`, formData, { headers });
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

const studentService = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
};

export default studentService;
