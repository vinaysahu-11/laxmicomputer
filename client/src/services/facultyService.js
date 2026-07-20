import api from './api';

export const getPublicTeachers = async () => {
  const response = await api.get('/teachers?active=true');
  return response.data;
};

export const getAdminTeachers = async () => {
  const response = await api.get('/teachers');
  return response.data;
};

export const createTeacher = async (teacherData) => {
  const response = await api.post('/teachers', teacherData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateTeacher = async (id, teacherData) => {
  const response = await api.put(`/teachers/${id}`, teacherData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await api.delete(`/teachers/${id}`);
  return response.data;
};

const facultyService = {
  getPublicTeachers,
  getAdminTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

export default facultyService;
