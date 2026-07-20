import api from './api';

export const getReviews = async (all = false) => {
  const response = await api.get(`/reviews${all ? '?all=true' : ''}`);
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const updateReview = async (id, reviewData) => {
  const response = await api.put(`/reviews/${id}`, reviewData);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

const reviewService = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
};

export default reviewService;
