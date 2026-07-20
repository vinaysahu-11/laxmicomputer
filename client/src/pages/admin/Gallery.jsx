import React, { useState, useEffect, useRef } from 'react';
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getStorageUsage
} from '../../services/galleryService';
import api from '../../services/api';

const Gallery = () => {
  // Database States
  const [albums, setAlbums] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null); // stores album object
  const [storageUsage, setStorageUsage] = useState({ sizeInGB: 0, limitInGB: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI States
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [activeMenuId, setActiveMenuId] = useState(null); // tracks active album dropdown menu (albumId)

  // Drag & Drop / Upload States
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Modals States
  const [isCreateAlbumModalOpen, setIsCreateAlbumModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteAlbumConfirmOpen, setIsDeleteAlbumConfirmOpen] = useState(false);

  // Modal target objects
  const [albumToEdit, setAlbumToEdit] = useState(null);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [imageToPreview, setImageToPreview] = useState(null);

  // Form states
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumCover, setNewAlbumCover] = useState(null);

  const [editAlbumName, setEditAlbumName] = useState('');
  const [editAlbumCover, setEditAlbumCover] = useState(null);

  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    imageFile: null
  });

  const [editImageTitle, setEditImageTitle] = useState('');
  const [editImageAlbumId, setEditImageAlbumId] = useState('');

  // File input refs
  const uploadFileInputRef = useRef(null);
  const albumCoverInputRef = useRef(null);
  const editAlbumCoverInputRef = useRef(null);

  // Load all records from backend
  const loadData = async () => {
    try {
      setLoading(true);
      const [albumsData, galleryData, storageData] = await Promise.all([
        getAlbums(),
        getGalleryItems(),
        getStorageUsage()
      ]);
      
      setAlbums(albumsData || []);
      setGalleryItems(galleryData || []);
      setStorageUsage(storageData || { sizeInGB: 0, limitInGB: 10 });
      setError('');

      // Auto-select first album if none selected or if selected is missing
      if (albumsData && albumsData.length > 0) {
        if (!selectedAlbum) {
          setSelectedAlbum(albumsData[0]);
        } else {
          const stillExists = albumsData.find(a => a._id === selectedAlbum._id);
          if (stillExists) {
            setSelectedAlbum(stillExists);
          } else {
            setSelectedAlbum(albumsData[0]);
          }
        }
      } else {
        setSelectedAlbum(null);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch gallery media and albums from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Helper function to show notifications
  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // 1. ALBUM CRUD HANDLERS
  const handleCreateAlbumSubmit = async (e) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;

    try {
      const formData = new FormData();
      formData.append('name', newAlbumName);
      if (newAlbumCover) {
        formData.append('coverImage', newAlbumCover);
      }

      await createAlbum(formData);
      triggerToast(`Album "${newAlbumName}" successfully created!`);
      
      setIsCreateAlbumModalOpen(false);
      setNewAlbumName('');
      setNewAlbumCover(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating album.');
    }
  };

  const handleUpdateAlbumSubmit = async (e) => {
    e.preventDefault();
    if (!editAlbumName.trim() || !albumToEdit) return;

    try {
      const formData = new FormData();
      formData.append('name', editAlbumName);
      if (editAlbumCover) {
        formData.append('coverImage', editAlbumCover);
      }

      await updateAlbum(albumToEdit._id, formData);
      triggerToast('Album category updated successfully!');
      
      setIsEditAlbumModalOpen(false);
      setAlbumToEdit(null);
      setEditAlbumName('');
      setEditAlbumCover(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating album.');
    }
  };

  const handleDeleteAlbumSubmit = async () => {
    if (!albumToDelete) return;
    try {
      await deleteAlbum(albumToDelete._id);
      triggerToast(`Album "${albumToDelete.name}" and all its photos permanently deleted.`);
      
      setIsDeleteAlbumConfirmOpen(false);
      setAlbumToDelete(null);
      loadData();
    } catch (err) {
      console.error(err);
      triggerToast('Error deleting album.', 'error');
    }
  };

  // 2. IMAGE UPLOAD & CRUD HANDLERS
  const executeImageUpload = async (file, title) => {
    if (!selectedAlbum || !file) return;
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('title', title || file.name.substring(0, file.name.lastIndexOf('.')) || 'Untitled Image');
      formData.append('albumId', selectedAlbum._id);
      formData.append('image', file);

      // Upload with progress tracking
      await api.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      triggerToast('Photo successfully uploaded to album!');
      setIsUploadModalOpen(false);
      setUploadFormData({ title: '', imageFile: null });
      loadData();
    } catch (err) {
      console.error(err);
      alert('Error uploading media. Please check file format and size limits.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUploadPhotoSubmit = (e) => {
    e.preventDefault();
    if (!uploadFormData.imageFile) {
      alert('Please select an image file to upload.');
      return;
    }
    executeImageUpload(uploadFormData.imageFile, uploadFormData.title);
  };

  // Drag & Drop Event Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile.type.startsWith('image/')) {
        alert('Only image files (JPG, PNG, WEBP, JPEG) are allowed!');
        return;
      }
      setUploadFormData({
        title: droppedFile.name.substring(0, droppedFile.name.lastIndexOf('.')),
        imageFile: droppedFile
      });
      setIsUploadModalOpen(true);
    }
  };

  const handleUpdateImageSubmit = async (e) => {
    e.preventDefault();
    if (!editImageTitle.trim() || !imageToEdit) return;

    try {
      await updateGalleryItem(imageToEdit._id, {
        title: editImageTitle,
        albumId: editImageAlbumId
      });
      
      triggerToast('Photo details updated successfully!');
      setIsEditImageModalOpen(false);
      setImageToEdit(null);
      loadData();
    } catch (err) {
      console.error(err);
      triggerToast('Error updating image details.', 'error');
    }
  };

  const handleDeleteImage = async (photo) => {
    if (window.confirm(`Are you sure you want to permanently delete "${photo.title}"?`)) {
      try {
        await deleteGalleryItem(photo._id);
        triggerToast('Image deleted successfully.');
        loadData();
      } catch (err) {
        console.error(err);
        triggerToast('Failed to delete image.', 'error');
      }
    }
  };

  // Menu items click outside close
  useEffect(() => {
    const handleCloseMenu = () => setActiveMenuId(null);
    window.addEventListener('click', handleCloseMenu);
    return () => window.removeEventListener('click', handleCloseMenu);
  }, []);

  const toggleAlbumMenu = (e, albumId) => {
    e.stopPropagation();
    if (activeMenuId === albumId) {
      setActiveMenuId(null);
    } else {
      setActiveMenuId(albumId);
    }
  };

  // Get photos in active selected album
  const activePhotos = galleryItems.filter(p => selectedAlbum && p.albumId === selectedAlbum._id);

  if (loading && albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading dynamic media manager...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg text-left gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Media Library</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
            Upload, sort, and manage campus photos across albums dynamically with drag & drop support.
          </p>
        </div>
        <div className="flex gap-3 shrink-0 self-start md:self-auto">
          <button 
            onClick={() => setIsCreateAlbumModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-primary font-label-md text-label-md rounded-lg hover:scale-102 transition-transform duration-200 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">create_new_folder</span>
            <span>Create Album</span>
          </button>
          <button 
            onClick={() => {
              setUploadFormData({ title: '', imageFile: null });
              setIsUploadModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:scale-102 transition-transform duration-200 active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Left Side: Albums Panel & Storage */}
        <div className="col-span-12 lg:col-span-3 space-y-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm space-y-6">
            <h3 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
              Albums
            </h3>
            
            {albums.length === 0 ? (
              <p className="text-xs text-on-surface-variant italic">No albums created yet.</p>
            ) : (
              <div className="space-y-1">
                {albums.map((alb) => {
                  const count = galleryItems.filter(item => item.albumId === alb._id).length;
                  const isSelected = selectedAlbum && selectedAlbum._id === alb._id;
                  
                  return (
                    <div 
                      key={alb._id} 
                      className={`group/item flex items-center justify-between w-full p-2.5 rounded-lg font-medium transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                          : 'hover:bg-surface-container text-on-surface-variant font-light'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedAlbum(alb)}
                        className="flex items-center flex-1 text-left min-w-0 pr-2"
                      >
                        <span className={`material-symbols-outlined mr-3 text-[18px] ${isSelected ? 'fill-current' : ''}`}>
                          folder
                        </span>
                        <span className="truncate text-body-md leading-none">{alb.name}</span>
                      </button>

                      {/* Dropdown Menu actions for Album */}
                      <div className="relative shrink-0 flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high'
                        }`}>
                          {count}
                        </span>
                        
                        <button
                          onClick={(e) => toggleAlbumMenu(e, alb._id)}
                          className="p-1 text-on-surface-variant/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">more_vert</span>
                        </button>

                        {activeMenuId === alb._id && (
                          <div 
                            className="absolute right-0 top-7 bg-surface-container-lowest border border-outline-variant shadow-lg rounded-lg py-1.5 w-36 z-30 font-label-md text-label-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                setAlbumToEdit(alb);
                                setEditAlbumName(alb.name);
                                setEditAlbumCover(null);
                                setIsEditAlbumModalOpen(true);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container text-left font-light"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span> Edit Cover / Name
                            </button>
                            <button
                              onClick={() => {
                                setAlbumToDelete(alb);
                                setIsDeleteAlbumConfirmOpen(true);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-error hover:bg-error-container/10 text-left font-bold"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span> Delete Album
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Disk Storage widget */}
            <div className="pt-6 border-t border-outline-variant space-y-2">
              <h4 className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Storage Utilization
              </h4>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
                  style={{ width: `${(storageUsage.sizeInGB / storageUsage.limitInGB) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-on-surface-variant font-bold">
                {storageUsage.sizeInGB >= 0.001 ? storageUsage.sizeInGB.toFixed(3) : (storageUsage.sizeInGB * 1024).toFixed(1) + 'MB'} / {storageUsage.limitInGB}GB ({((storageUsage.sizeInGB / storageUsage.limitInGB) * 100).toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Main Drag-and-drop Image Canvas */}
        <div 
          className="col-span-12 lg:col-span-9"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden min-h-[600px] flex flex-col justify-between relative">
            
            {/* Overlay feedback for Drag over */}
            {dragActive && (
              <div className="absolute inset-0 bg-primary/10 border-4 border-dashed border-primary z-20 flex flex-col items-center justify-center backdrop-blur-xs transition-all pointer-events-none">
                <span className="material-symbols-outlined text-primary text-6xl animate-bounce">upload_file</span>
                <h3 className="font-headline-md text-primary font-bold mt-2">Drop image file here to upload</h3>
                <p className="text-on-surface-variant text-sm mt-1">Supports JPG, PNG, JPEG, WEBP</p>
              </div>
            )}

            {/* Control Bar */}
            <div className="px-stack-md py-4 border-b border-outline-variant flex justify-between items-center bg-surface flex-wrap gap-2">
              <div>
                <span className="font-headline-sm text-headline-sm font-bold">
                  {selectedAlbum ? selectedAlbum.name : 'Select Album'}
                  <span className="text-on-surface-variant font-light opacity-50 ml-2 text-sm uppercase">
                    {activePhotos.length} items
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                    viewMode === 'grid' ? 'text-primary bg-primary-container/20' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                  title="Grid View"
                >
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                    viewMode === 'list' ? 'text-primary bg-primary-container/20' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                  title="List View"
                >
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>

            {/* Gallery images display */}
            <div className="p-stack-md flex-1">
              {!selectedAlbum ? (
                <div className="py-16 text-center text-on-surface-variant font-light italic">
                  Select an album from the left sidebar to display images.
                </div>
              ) : activePhotos.length === 0 ? (
                <div className="py-16 text-center text-on-surface-variant font-light">
                  <span className="material-symbols-outlined text-primary text-5xl mb-2">add_photo_alternate</span>
                  <p className="font-body-lg">This album is currently empty.</p>
                  <p className="text-xs text-on-surface-variant mt-1">Drag and drop images anywhere here or click upload above to add photos.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
                  {activePhotos.map((photo) => {
                    const imgSrc = photo.image.startsWith('/uploads') ? `http://localhost:5000${photo.image}` : photo.image;
                    
                    return (
                      <div 
                        key={photo._id}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-outline-variant hover-lift bg-surface-container transition-all"
                      >
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt={photo.title}
                          src={imgSrc}
                        />
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3">
                          <div className="flex justify-end">
                            <button 
                              onClick={() => {
                                setImageToPreview(photo);
                                setIsPreviewModalOpen(true);
                              }}
                              className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white/40 transition-colors flex items-center justify-center"
                              title="Preview"
                            >
                              <span className="material-symbols-outlined text-[16px]">visibility</span>
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setImageToEdit(photo);
                                setEditImageTitle(photo.title);
                                setEditImageAlbumId(photo.albumId);
                                setIsEditImageModalOpen(true);
                              }}
                              className="flex-grow py-1.5 bg-white hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded-md shadow-sm active:scale-95 duration-100 font-bold text-xs"
                            >
                              Edit / Move
                            </button>
                            <button 
                              onClick={() => handleDeleteImage(photo)}
                              className="bg-error text-on-error p-1.5 rounded-md flex items-center justify-center active:scale-95 duration-100"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="space-y-2 text-left">
                  {activePhotos.map((photo) => {
                    const imgSrc = photo.image.startsWith('/uploads') ? `http://localhost:5000${photo.image}` : photo.image;
                    
                    return (
                      <div 
                        key={photo._id} 
                        className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/60 flex items-center justify-between gap-4 hover:border-primary transition-all"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img className="w-12 h-12 object-cover rounded-md border border-outline-variant/40 shrink-0" src={imgSrc} alt={photo.title} />
                          <span className="font-label-md text-on-surface truncate font-bold">{photo.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setImageToPreview(photo);
                              setIsPreviewModalOpen(true);
                            }}
                            className="px-2 py-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant text-xs flex items-center"
                            title="Preview"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                          <button 
                            onClick={() => {
                              setImageToEdit(photo);
                              setEditImageTitle(photo.title);
                              setEditImageAlbumId(photo.albumId);
                              setIsEditImageModalOpen(true);
                            }}
                            className="px-3 py-1.5 hover:bg-surface-container rounded-lg text-primary text-xs font-bold"
                          >
                            Edit / Move
                          </button>
                          <button 
                            onClick={() => handleDeleteImage(photo)}
                            className="p-1.5 hover:bg-error-container/30 text-error rounded-lg"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Slide-Up Notification Toast */}
      {toast.visible && (
        <div className="fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-[110] border border-outline-variant/20">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Modal: Create Album */}
      {isCreateAlbumModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsCreateAlbumModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant text-left">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create Category Album</h3>
              <button className="p-1.5 hover:bg-surface-variant rounded-full flex items-center justify-center" onClick={() => setIsCreateAlbumModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateAlbumSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Album Name</label>
                <input 
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  placeholder="e.g. Annual Fest 2026"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Cover Image (Optional)</label>
                <input 
                  type="file"
                  accept="image/*"
                  ref={albumCoverInputRef}
                  onChange={(e) => setNewAlbumCover(e.target.files[0])}
                  className="w-full text-body-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg p-2" 
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsCreateAlbumModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Create Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Album */}
      {isEditAlbumModalOpen && albumToEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsEditAlbumModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant text-left">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Edit Category Album</h3>
              <button className="p-1.5 hover:bg-surface-variant rounded-full flex items-center justify-center" onClick={() => setIsEditAlbumModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdateAlbumSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Rename Album</label>
                <input 
                  value={editAlbumName}
                  onChange={(e) => setEditAlbumName(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Change Cover Image (Optional)</label>
                <input 
                  type="file"
                  accept="image/*"
                  ref={editAlbumCoverInputRef}
                  onChange={(e) => setEditAlbumCover(e.target.files[0])}
                  className="w-full text-body-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg p-2" 
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsEditAlbumModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Album Confirmation */}
      {isDeleteAlbumConfirmOpen && albumToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsDeleteAlbumConfirmOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant text-left animate-scale-in">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-error-container/20">
              <h3 className="font-headline-sm text-headline-sm font-bold text-error flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span> Delete Album Category
              </h3>
              <button className="p-1.5 hover:bg-surface-variant rounded-full flex items-center justify-center" onClick={() => setIsDeleteAlbumConfirmOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-body-md text-on-surface">
                Are you sure you want to delete the album <strong>"{albumToDelete.name}"</strong>?
              </p>
              <div className="p-3.5 bg-error-container/10 border border-error/20 rounded-lg text-xs text-error font-medium">
                <strong>Warning:</strong> Deleting this album will also permanently remove all linked photo assets inside it from the system and server storage.
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsDeleteAlbumConfirmOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-error text-on-error rounded-lg font-label-md hover:bg-error/95 shadow-md active:scale-95 duration-100" 
                  onClick={handleDeleteAlbumSubmit}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Upload Image */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => { if(!isUploading) setIsUploadModalOpen(false); }}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Upload Photo</h3>
              <button className="p-1.5 hover:bg-surface-variant rounded-full flex items-center justify-center" onClick={() => { if(!isUploading) setIsUploadModalOpen(false); }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUploadPhotoSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Photo Title / Caption</label>
                <input 
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  placeholder="e.g. Lab Programming Activity"
                  type="text"
                  required
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Selected Album Target</label>
                <div className="py-2 px-3 border border-outline-variant rounded-lg bg-surface-container-low font-bold text-xs">
                  {selectedAlbum ? selectedAlbum.name : 'No Album Selected'}
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Select File</label>
                <input 
                  type="file"
                  accept="image/*"
                  required
                  ref={uploadFileInputRef}
                  disabled={isUploading}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                  className="w-full text-body-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg p-2" 
                />
                <p className="text-[10px] text-on-surface-variant mt-1">Supports JPG, PNG, WEBP, JPEG. Max size 5MB.</p>
              </div>

              {/* Progress bar */}
              {isUploading && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] animate-spin">sync</span> Uploading...
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsUploadModalOpen(false)}
                  type="button"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100 flex items-center gap-1.5" 
                  type="submit"
                  disabled={isUploading}
                >
                  <span className="material-symbols-outlined text-sm">cloud_upload</span> Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Image Title / Move Album */}
      {isEditImageModalOpen && imageToEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsEditImageModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant text-left animate-scale-in">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Edit Photo Settings</h3>
              <button className="p-1.5 hover:bg-surface-variant rounded-full flex items-center justify-center" onClick={() => setIsEditImageModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdateImageSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Image Title</label>
                <input 
                  value={editImageTitle}
                  onChange={(e) => setEditImageTitle(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Move to Album</label>
                <select 
                  value={editImageAlbumId}
                  onChange={(e) => setEditImageAlbumId(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface cursor-pointer font-bold text-body-sm"
                >
                  {albums.map((alb) => (
                    <option key={alb._id} value={alb._id}>{alb.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsEditImageModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {isPreviewModalOpen && imageToPreview && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120] flex flex-col items-center justify-center p-4"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 flex items-center justify-center border border-white/20 transition-colors z-10"
            onClick={() => setIsPreviewModalOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="max-w-4xl max-h-[80vh] overflow-hidden flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={imageToPreview.image.startsWith('/uploads') ? `http://localhost:5000${imageToPreview.image}` : imageToPreview.image} 
              alt={imageToPreview.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-headline-sm text-headline-sm font-semibold">{imageToPreview.title}</h3>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold">Album: {selectedAlbum ? selectedAlbum.name : ''}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
