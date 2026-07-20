import api from './api';

export const getContacts = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const createContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await api.put(`/contact/${id}`, contactData);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

const contactService = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};

export default contactService;
