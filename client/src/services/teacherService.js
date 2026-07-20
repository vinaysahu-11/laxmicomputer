import api from './api';

export const getTeachers = async (active = false) => {
  const response = await api.get(`/teachers${active ? '?active=true' : ''}`);
  return response.data;
};

export const createTeacher = async (formData) => {
  const response = await api.post('/teachers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateTeacher = async (id, formData) => {
  const response = await api.put(`/teachers/${id}`, formData, {
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

const teacherService = {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

export default teacherService;
