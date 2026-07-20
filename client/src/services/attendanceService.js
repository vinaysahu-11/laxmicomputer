import api from './api';

export const getAttendance = async (course, batch, date) => {
  const response = await api.get(`/attendance?course=${encodeURIComponent(course)}&batch=${encodeURIComponent(batch)}&date=${date}`);
  return response.data;
};

export const saveAttendance = async (attendanceData) => {
  const response = await api.post('/attendance', attendanceData);
  return response.data;
};

const attendanceService = {
  getAttendance,
  saveAttendance
};

export default attendanceService;
