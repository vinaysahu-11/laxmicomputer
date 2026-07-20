import api from './api';

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data.courses || [];
};

export const getFeaturedCourses = async () => {
  const response = await api.get('/courses/featured');
  return response.data;
};

export const getCourse = async (idOrSlug) => {
  const response = await api.get(`/courses/${idOrSlug}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  // courseData can be FormData for file upload or JSON
  const response = await api.post('/courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

const courseService = {
  getCourses,
  getFeaturedCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};

export default courseService;
