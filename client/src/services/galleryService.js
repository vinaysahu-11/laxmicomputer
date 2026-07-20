import api from './api';

// Album API Services
export const getAlbums = async () => {
  const response = await api.get('/albums');
  return response.data;
};

export const createAlbum = async (albumData) => {
  const response = await api.post('/albums', albumData);
  return response.data;
};

export const updateAlbum = async (id, albumData) => {
  const response = await api.put(`/albums/${id}`, albumData);
  return response.data;
};

export const deleteAlbum = async (id) => {
  const response = await api.delete(`/albums/${id}`);
  return response.data;
};

// Gallery API Services
export const getGalleryItems = async (albumId) => {
  const response = await api.get(`/gallery${albumId ? `?albumId=${albumId}` : ''}`);
  return response.data;
};

export const createGalleryItem = async (galleryFormData) => {
  const response = await api.post('/gallery/upload', galleryFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateGalleryItem = async (id, galleryData) => {
  const response = await api.put(`/gallery/${id}`, galleryData);
  return response.data;
};

export const deleteGalleryItem = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

export const getStorageUsage = async () => {
  const response = await api.get('/gallery/storage');
  return response.data;
};

const galleryService = {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getStorageUsage
};

export default galleryService;
