import api from './api';

export const getSuccessStories = async (activeOnly = false) => {
  const response = await api.get(`/success-stories${activeOnly ? '?active=true' : ''}`);
  return response.data;
};

export const createSuccessStory = async (storyData) => {
  const response = await api.post('/success-stories', storyData);
  return response.data;
};

export const updateSuccessStory = async (id, storyData) => {
  const response = await api.put(`/success-stories/${id}`, storyData);
  return response.data;
};

export const deleteSuccessStory = async (id) => {
  const response = await api.delete(`/success-stories/${id}`);
  return response.data;
};

const successStoryService = {
  getSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory
};

export default successStoryService;
