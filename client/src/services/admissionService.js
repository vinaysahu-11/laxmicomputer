import api from './api';

export const getAdmissions = async () => {
  const response = await api.get('/admissions');
  return response.data;
};

export const createAdmission = async (admissionData) => {
  const response = await api.post('/admissions', admissionData);
  return response.data;
};

export const updateAdmission = async (id, admissionData) => {
  const response = await api.put(`/admissions/${id}`, admissionData);
  return response.data;
};

export const deleteAdmission = async (id) => {
  const response = await api.delete(`/admissions/${id}`);
  return response.data;
};

const admissionService = {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission
};

export default admissionService;
