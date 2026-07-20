import api from './api';

// Settings Identity APIs
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateSettings = async (settingsData) => {
  const response = await api.put('/settings', settingsData);
  return response.data;
};

export const resetSettings = async () => {
  const response = await api.post('/settings/reset');
  return response.data;
};

// Announcement Notifications APIs
export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const createNotification = async (notifData) => {
  const response = await api.post('/notifications', notifData);
  return response.data;
};

export const updateNotification = async (id, notifData) => {
  const response = await api.put(`/notifications/${id}`, notifData);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

// Aggregated Stats
export const getAdminStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

const homepageService = {
  getSettings,
  updateSettings,
  resetSettings,
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  getAdminStats
};

export default homepageService;
