import api from './api';

export const getResults = async () => {
  const response = await api.get('/results');
  return response.data;
};

export const createResult = async (resultData) => {
  const response = await api.post('/results', resultData);
  return response.data;
};

export const updateResult = async (id, resultData) => {
  const response = await api.put(`/results/${id}`, resultData);
  return response.data;
};

export const deleteResult = async (id) => {
  const response = await api.delete(`/results/${id}`);
  return response.data;
};

const resultService = {
  getResults,
  createResult,
  updateResult,
  deleteResult
};

export default resultService;
