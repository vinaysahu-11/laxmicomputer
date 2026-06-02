import React, { useState } from 'react';

const Gallery = () => {
  // 1. Initial State Data for Albums and Media Assets
  const [albums, setAlbums] = useState([
    { id: 'alb-1', name: 'Computer Lab', icon: 'folder', count: 5 },
    { id: 'alb-2', name: 'Annual Events', icon: 'folder', count: 3 },
    { id: 'alb-3', name: 'Certifications', icon: 'folder', count: 2 },
    { id: 'alb-4', name: 'Sports Meet', icon: 'folder', count: 2 }
  ]);

  const [selectedAlbum, setSelectedAlbum] = useState('Computer Lab');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [mediaAssets, setMediaAssets] = useState({
    'Computer Lab': [
      { id: 'img-1', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLoOoX4VRJUc03eQPRnt7aNcRuvodbp3XbG4dsmnSRXb5Eu9xupkXBgjryl6ggVSbhL9B40IIoXVHoZk5cZ1_TRGjyHR_MlJgzNmNqOKRPh4jvYjDgLXyUbv94ecXn8WCtPgZ_DLDb497M4jEt-pOT625QG6th2vsuepepE7EylYBXWYTNPVhurM1Xv_J3SyBTLoFvl5W6RXh46L2nO9pobP8LeCsHeTpn3CvrAy9xez7Rc2xwcJxAxjIznDgh5IYiWEHxO3NGYNb8', alt: 'Computer Workstations Lab' },
      { id: 'img-2', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsazeN8QSrl2QnCidnnmIAP8LUnhuWmioQFwrFXZt0INn4IN-TRZw8GEX4e_dC8DSu5WEC53OBKaVJnxTgnKhYuvyWTKMIC1fqxmzndtFBms5z48XetVbyKDacZ_nzDnAtQSkikXFJGz2e8Wu5Hmlh6fuBN1Z2TUWQftru2NvvuzkAzUHIsBWOPQD7pr8Xet9eUs5COSHlN88uokz8JAkS9-Q0SHqku8DuqySJ52otAVhXftNHBDoOzIAPyIixMj9ndOjmeCpQa-5p', alt: 'Candid Collaborative Study' },
      { id: 'img-3', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlaTLbFgWZJTgSefYEiVTyvedknxs5fNB5R1W6DW11bJeiD02XVtsFMLzxpczSj9mM1lH7U68c27OUPThpRxkuXOtMLWzXQul6Bxu8ZsuPQeHgev_y-crTAcOSf8zNDUPUCHrMvAy5ankldAF3Jmd60O5J-Yb80SvcSo7zof0Gj4yntbvj4jipQBp0uyqMu_H3LTcwDlZ_fj6q0-NQ7jP0YbVLFC96kueJPrgq3_cZ7379J1NDO2EOkg5sPr2kv0t6wShNU3oBdSWL', alt: 'Mechanical keyboard coding focus' },
      { id: 'img-4', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMeHFJRmGdwOldgW3yruZwfG4HnQyXDjDBRvs6-MQy1OCTE-ba9xfjIQPIHKnvb_0wiS0Qm12RqTvD_f79iDMCOhQrYO5GhjqUVQVf6Br3qrl6V-Jkbt-zjsO3x2jvROet31Ra2v517ouiagbQnXhCDqj9PGG8d7TQ-rEYUOzq1Hikj0AgFSb7oSMbWYOClUvkKVIesnKmmBTsRb8eFSk2GuuYeJcb4jFB0j7RFAHBOvtT10jlXpEbAvdAboPWDladCGWWMNhl6AGI', alt: 'Robotics Workshop Lecture Hall' },
      { id: 'img-5', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUTz6gndJwkEtGVSGYa6oel6osdqhWR_JdgbPbdSe5HYo5EIgpvmoOmpWfZI6oowH0Rz76pkIFjVNoxEjaXBMTwpvn6bmmAk2czTz_M-uxPvhI19x1Y1lmP7ArOcYYByYuFOrpJncHqjNf6XtjYgpm7WIfbyXMgKLjMs14qfJmSsnJ9kvW-Yqden8ajj1UPhNeZ0xx-C5wUSdtikV1Jo21kYZR2wry5mIxz_-BMsrYuuUa5MIdImHojeg8Rafm1RVcR5jYj4RgemBO', alt: 'Artistic portal classroom visualizations' }
    ],
    'Annual Events': [
      { id: 'img-201', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsazeN8QSrl2QnCidnnmIAP8LUnhuWmioQFwrFXZt0INn4IN-TRZw8GEX4e_dC8DSu5WEC53OBKaVJnxTgnKhYuvyWTKMIC1fqxmzndtFBms5z48XetVbyKDacZ_nzDnAtQSkikXFJGz2e8Wu5Hmlh6fuBN1Z2TUWQftru2NvvuzkAzUHIsBWOPQD7pr8Xet9eUs5COSHlN88uokz8JAkS9-Q0SHqku8DuqySJ52otAVhXftNHBDoOzIAPyIixMj9ndOjmeCpQa-5p', alt: 'Annual Day Celebrations' },
      { id: 'img-202', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMeHFJRmGdwOldgW3yruZwfG4HnQyXDjDBRvs6-MQy1OCTE-ba9xfjIQPIHKnvb_0wiS0Qm12RqTvD_f79iDMCOhQrYO5GhjqUVQVf6Br3qrl6V-Jkbt-zjsO3x2jvROet31Ra2v517ouiagbQnXhCDqj9PGG8d7TQ-rEYUOzq1Hikj0AgFSb7oSMbWYOClUvkKVIesnKmmBTsRb8eFSk2GuuYeJcb4jFB0j7RFAHBOvtT10jlXpEbAvdAboPWDladCGWWMNhl6AGI', alt: 'Hackathon Event 2023' },
      { id: 'img-203', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUTz6gndJwkEtGVSGYa6oel6osdqhWR_JdgbPbdSe5HYo5EIgpvmoOmpWfZI6oowH0Rz76pkIFjVNoxEjaXBMTwpvn6bmmAk2czTz_M-uxPvhI19x1Y1lmP7ArOcYYByYuFOrpJncHqjNf6XtjYgpm7WIfbyXMgKLjMs14qfJmSsnJ9kvW-Yqden8ajj1UPhNeZ0xx-C5wUSdtikV1Jo21kYZR2wry5mIxz_-BMsrYuuUa5MIdImHojeg8Rafm1RVcR5jYj4RgemBO', alt: 'Faculty Conference' }
    ],
    'Certifications': [
      { id: 'img-301', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUTz6gndJwkEtGVSGYa6oel6osdqhWR_JdgbPbdSe5HYo5EIgpvmoOmpWfZI6oowH0Rz76pkIFjVNoxEjaXBMTwpvn6bmmAk2czTz_M-uxPvhI19x1Y1lmP7ArOcYYByYuFOrpJncHqjNf6XtjYgpm7WIfbyXMgKLjMs14qfJmSsnJ9kvW-Yqden8ajj1UPhNeZ0xx-C5wUSdtikV1Jo21kYZR2wry5mIxz_-BMsrYuuUa5MIdImHojeg8Rafm1RVcR5jYj4RgemBO', alt: 'Student Diploma Handover' },
      { id: 'img-302', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLoOoX4VRJUc03eQPRnt7aNcRuvodbp3XbG4dsmnSRXb5Eu9xupkXBgjryl6ggVSbhL9B40IIoXVHoZk5cZ1_TRGjyHR_MlJgzNmNqOKRPh4jvYjDgLXyUbv94ecXn8WCtPgZ_DLDb497M4jEt-pOT625QG6th2vsuepepE7EylYBXWYTNPVhurM1Xv_J3SyBTLoFvl5W6RXh46L2nO9pobP8LeCsHeTpn3CvrAy9xez7Rc2xwcJxAxjIznDgh5IYiWEHxO3NGYNb8', alt: 'Python Certified Batch' }
    ],
    'Sports Meet': [
      { id: 'img-401', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMeHFJRmGdwOldgW3yruZwfG4HnQyXDjDBRvs6-MQy1OCTE-ba9xfjIQPIHKnvb_0wiS0Qm12RqTvD_f79iDMCOhQrYO5GhjqUVQVf6Br3qrl6V-Jkbt-zjsO3x2jvROet31Ra2v517ouiagbQnXhCDqj9PGG8d7TQ-rEYUOzq1Hikj0AgFSb7oSMbWYOClUvkKVIesnKmmBTsRb8eFSk2GuuYeJcb4jFB0j7RFAHBOvtT10jlXpEbAvdAboPWDladCGWWMNhl6AGI', alt: 'Indoor Robotics Competition' },
      { id: 'img-402', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsazeN8QSrl2QnCidnnmIAP8LUnhuWmioQFwrFXZt0INn4IN-TRZw8GEX4e_dC8DSu5WEC53OBKaVJnxTgnKhYuvyWTKMIC1fqxmzndtFBms5z48XetVbyKDacZ_nzDnAtQSkikXFJGz2e8Wu5Hmlh6fuBN1Z2TUWQftru2NvvuzkAzUHIsBWOPQD7pr8Xet9eUs5COSHlN88uokz8JAkS9-Q0SHqku8DuqySJ52otAVhXftNHBDoOzIAPyIixMj9ndOjmeCpQa-5p', alt: 'Campus Volleyball Final' }
    ]
  });

  // Gallery log data state
  const [galleryLogs, setGalleryLogs] = useState([
    { id: 'log-1', action: 'Uploaded 5 photos', album: 'Computer Lab', author: 'Admin Sarah', time: '2 hours ago', color: 'bg-primary-container' },
    { id: 'log-2', action: 'Created new album', album: 'Sports Meet 2024', author: 'Admin Mike', time: 'Yesterday, 14:30', color: 'bg-tertiary' },
    { id: 'log-3', action: 'Deleted item', album: 'Annual Events (IMG_992)', author: 'Admin Sarah', time: '3 days ago', color: 'bg-error' }
  ]);

  // Autocomplete search states
  const [searchQuery, setSearchQuery] = useState('');

  // Bulk Selection States
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);

  // Storage utilization
  const [storageUsage, setStorageUsage] = useState(6.5); // in GB

  // Modals and Alerts
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newAlbumName, setNewAlbumName] = useState('');
  
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    albumTarget: 'Computer Lab',
    sampleIndex: 'img-1'
  });

  const [editingPhoto, setEditingPhoto] = useState(null);

  // 2. Micro-interactions and triggers
  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleCreateAlbumSubmit = (e) => {
    e.preventDefault();
    if (!newAlbumName) {
      alert('Please specify an album name.');
      return;
    }

    if (mediaAssets[newAlbumName]) {
      triggerToast(`An album with the name "${newAlbumName}" already exists.`);
      return;
    }

    // Add new album to list
    const newAlb = {
      id: `alb-${Date.now()}`,
      name: newAlbumName,
      icon: 'folder',
      count: 0
    };
    setAlbums(prev => [...prev, newAlb]);
    setMediaAssets(prev => ({ ...prev, [newAlbumName]: [] }));

    // Append log
    const newLog = {
      id: `log-${Date.now()}`,
      action: 'Created new album',
      album: newAlbumName,
      author: 'Super Admin',
      time: 'Just now',
      color: 'bg-tertiary'
    };
    setGalleryLogs(prev => [newLog, ...prev]);

    triggerToast(`Album "${newAlbumName}" successfully created!`);
    setSelectedAlbum(newAlbumName);
    setNewAlbumName('');
    setIsAlbumModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleUploadPhotoSubmit = (e) => {
    e.preventDefault();
    if (!uploadFormData.title) {
      alert('Please provide a title for the media asset.');
      return;
    }

    // Choose mockup source based on selected sampleIndex
    let srcUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLoOoX4VRJUc03eQPRnt7aNcRuvodbp3XbG4dsmnSRXb5Eu9xupkXBgjryl6ggVSbhL9B40IIoXVHoZk5cZ1_TRGjyHR_MlJgzNmNqOKRPh4jvYjDgLXyUbv94ecXn8WCtPgZ_DLDb497M4jEt-pOT625QG6th2vsuepepE7EylYBXWYTNPVhurM1Xv_J3SyBTLoFvl5W6RXh46L2nO9pobP8LeCsHeTpn3CvrAy9xez7Rc2xwcJxAxjIznDgh5IYiWEHxO3NGYNb8';
    if (uploadFormData.sampleIndex === 'img-2') {
      srcUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsazeN8QSrl2QnCidnnmIAP8LUnhuWmioQFwrFXZt0INn4IN-TRZw8GEX4e_dC8DSu5WEC53OBKaVJnxTgnKhYuvyWTKMIC1fqxmzndtFBms5z48XetVbyKDacZ_nzDnAtQSkikXFJGz2e8Wu5Hmlh6fuBN1Z2TUWQftru2NvvuzkAzUHIsBWOPQD7pr8Xet9eUs5COSHlN88uokz8JAkS9-Q0SHqku8DuqySJ52otAVhXftNHBDoOzIAPyIixMj9ndOjmeCpQa-5p';
    } else if (uploadFormData.sampleIndex === 'img-3') {
      srcUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlaTLbFgWZJTgSefYEiVTyvedknxs5fNB5R1W6DW11bJeiD02XVtsFMLzxpczSj9mM1lH7U68c27OUPThpRxkuXOtMLWzXQul6Bxu8ZsuPQeHgev_y-crTAcOSf8zNDUPUCHrMvAy5ankldAF3Jmd60O5J-Yb80SvcSo7zof0Gj4yntbvj4jipQBp0uyqMu_H3LTcwDlZ_fj6q0-NQ7jP0YbVLFC96kueJPrgq3_cZ7379J1NDO2EOkg5sPr2kv0t6wShNU3oBdSWL';
    }

    const newPhoto = {
      id: `img-${Date.now()}`,
      src: srcUrl,
      alt: uploadFormData.title
    };

    const targetAlbum = uploadFormData.albumTarget;
    setMediaAssets(prev => ({
      ...prev,
      [targetAlbum]: [newPhoto, ...prev[targetAlbum]]
    }));

    // Update album count stat
    setAlbums(prev => prev.map(a => a.name === targetAlbum ? { ...a, count: a.count + 1 } : a));
    
    // Update storage metrics slightly
    setStorageUsage(prev => Math.min(prev + 0.1, 10.0));

    // Append log
    const newLog = {
      id: `log-${Date.now()}`,
      action: `Uploaded photo: ${uploadFormData.title}`,
      album: targetAlbum,
      author: 'Super Admin',
      time: 'Just now',
      color: 'bg-primary-container'
    };
    setGalleryLogs(prev => [newLog, ...prev]);

    triggerToast(`"${uploadFormData.title}" successfully added to ${targetAlbum}!`);
    setSelectedAlbum(targetAlbum);
    setUploadFormData({ title: '', albumTarget: targetAlbum, sampleIndex: 'img-1' });
    setIsUploadModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleIndividualDelete = (photoId, photoAlt) => {
    if (window.confirm(`Are you sure you want to delete visual asset "${photoAlt}"?`)) {
      setMediaAssets(prev => ({
        ...prev,
        [selectedAlbum]: prev[selectedAlbum].filter(p => p.id !== photoId)
      }));

      setAlbums(prev => prev.map(a => a.name === selectedAlbum ? { ...a, count: Math.max(a.count - 1, 0) } : a));
      setStorageUsage(prev => Math.max(prev - 0.1, 0));

      const newLog = {
        id: `log-${Date.now()}`,
        action: `Deleted photo: ${photoAlt}`,
        album: selectedAlbum,
        author: 'Super Admin',
        time: 'Just now',
        color: 'bg-error'
      };
      setGalleryLogs(prev => [newLog, ...prev]);

      triggerToast(`Media asset successfully deleted.`);
    }
  };

  const handleMediaCheckToggle = (photoId) => {
    setSelectedMediaIds(prev => 
      prev.includes(photoId) ? prev.filter(id => id !== photoId) : [...prev, photoId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedMediaIds.length === 0) {
      triggerToast('No items checked. Please select checkboxes on photo cards to bulk delete.');
      return;
    }

    if (window.confirm(`Retract and delete all ${selectedMediaIds.length} checked assets simultaneously?`)) {
      const removedCount = selectedMediaIds.length;
      
      setMediaAssets(prev => ({
        ...prev,
        [selectedAlbum]: prev[selectedAlbum].filter(p => !selectedMediaIds.includes(p.id))
      }));

      setAlbums(prev => prev.map(a => a.name === selectedAlbum ? { ...a, count: Math.max(a.count - removedCount, 0) } : a));
      setStorageUsage(prev => Math.max(prev - (removedCount * 0.1), 0));

      const newLog = {
        id: `log-${Date.now()}`,
        action: `Bulk deleted ${removedCount} items`,
        album: selectedAlbum,
        author: 'Super Admin',
        time: 'Just now',
        color: 'bg-error'
      };
      setGalleryLogs(prev => [newLog, ...prev]);

      triggerToast(`Successfully bulk deleted ${removedCount} media assets.`);
      setSelectedMediaIds([]);
    }
  };

  const handleOpenEditPhoto = (photo) => {
    setEditingPhoto({ ...photo });
    setIsEditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseEditPhoto = () => {
    setIsEditModalOpen(false);
    setEditingPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const handleUpdatePhotoSubmit = (e) => {
    e.preventDefault();
    setMediaAssets(prev => ({
      ...prev,
      [selectedAlbum]: prev[selectedAlbum].map(p => p.id === editingPhoto.id ? { ...editingPhoto } : p)
    }));

    handleCloseEditPhoto();
    triggerToast('Media caption details updated successfully.');
  };

  const activePhotos = mediaAssets[selectedAlbum] || [];

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg text-left gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Gallery Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
            Curate and organize the academy's visual journey across lab activities and events.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => {
              setNewAlbumName('');
              setIsAlbumModalOpen(true);
              document.body.style.overflow = 'hidden';
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-primary font-label-md text-label-md rounded-lg hover:scale-102 transition-transform duration-200 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">create_new_folder</span>
            <span>Create Album</span>
          </button>
          <button 
            onClick={() => {
              setUploadFormData({ title: '', albumTarget: selectedAlbum, sampleIndex: 'img-1' });
              setIsUploadModalOpen(true);
              document.body.style.overflow = 'hidden';
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:scale-102 transition-transform duration-200 active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            <span>Upload Photos</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout for Management */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Album Selection Panel (Left column) */}
        <div className="col-span-12 lg:col-span-3 space-y-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                All Albums
              </h3>
            </div>
            
            <div className="space-y-2">
              {albums.map((alb) => (
                <button
                  key={alb.id}
                  onClick={() => {
                    setSelectedAlbum(alb.name);
                    setSelectedMediaIds([]);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all ${
                    selectedAlbum === alb.name
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'hover:bg-surface-container text-on-surface-variant font-light'
                  }`}
                >
                  <span className="flex items-center">
                    <span className={`material-symbols-outlined mr-3 text-[18px] ${selectedAlbum === alb.name ? 'fill-current' : ''}`}>
                      {alb.icon}
                    </span>
                    {alb.name}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedAlbum === alb.name ? 'bg-primary text-on-primary' : 'bg-surface-container-high'
                  }`}>
                    {mediaAssets[alb.name] ? mediaAssets[alb.name].length : 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-outline-variant space-y-2">
              <h4 className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Storage Usage
              </h4>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
                  style={{ width: `${(storageUsage / 10.0) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-on-surface-variant font-bold">
                {storageUsage.toFixed(1)}GB / 10GB ({((storageUsage / 10.0) * 100).toFixed(0)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Main Gallery Canvas (Right column) */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden min-h-[600px] flex flex-col justify-between">
            
            {/* Control Bar */}
            <div className="px-stack-md py-4 border-b border-outline-variant flex justify-between items-center bg-surface flex-wrap gap-2">
              <div>
                <span className="font-headline-sm text-headline-sm font-bold">
                  {selectedAlbum} 
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
                
                <div className="w-px h-6 bg-outline-variant mx-2"></div>
                
                <button 
                  onClick={handleBulkDelete}
                  className={`flex items-center font-bold text-xs hover:text-error transition-colors px-3 py-1.5 rounded-lg ${
                    selectedMediaIds.length > 0 ? 'text-error bg-error-container/20' : 'text-on-surface-variant/50'
                  }`}
                >
                  <span className="material-symbols-outlined mr-1.5 text-[18px]">delete</span>
                  <span>Bulk Delete {selectedMediaIds.length > 0 && `(${selectedMediaIds.length})`}</span>
                </button>
                
                <button 
                  onClick={() => triggerToast('Toggling dynamic media manual drag orderings...')}
                  className="flex items-center text-on-surface-variant font-bold text-xs hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined mr-1.5 text-[18px]">reorder</span>
                  <span>Reorder</span>
                </button>
              </div>
            </div>

            {/* Asset Grid / List View */}
            <div className="p-stack-md flex-1">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Photo Cards mapping */}
                  {activePhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className="relative group aspect-square rounded-lg overflow-hidden border border-outline-variant hover-lift bg-surface-container transition-all"
                    >
                      <img 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={photo.alt}
                        src={photo.src}
                      />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3">
                        <div className="flex justify-between items-center">
                          <input 
                            type="checkbox"
                            checked={selectedMediaIds.includes(photo.id)}
                            onChange={() => handleMediaCheckToggle(photo.id)}
                            className="w-5 h-5 rounded border-white/40 bg-transparent text-primary focus:ring-primary cursor-pointer"
                          />
                          <button 
                            onClick={() => handleOpenEditPhoto(photo)}
                            className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white/40 transition-colors flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-[16px]">more_vert</span>
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleOpenEditPhoto(photo)}
                            className="flex-grow py-1.5 bg-white hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded-md shadow-sm active:scale-95 duration-100 font-bold text-xs"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleIndividualDelete(photo.id, photo.alt)}
                            className="bg-error text-on-error p-1.5 rounded-md flex items-center justify-center active:scale-95 duration-100"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Media Upload Placeholder Card */}
                  <button 
                    onClick={() => {
                      setUploadFormData({ title: '', albumTarget: selectedAlbum, sampleIndex: 'img-1' });
                      setIsUploadModalOpen(true);
                      document.body.style.overflow = 'hidden';
                    }}
                    className="aspect-square rounded-lg border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center p-6 text-on-surface-variant group"
                  >
                    <span className="material-symbols-outlined text-4xl mb-2 group-hover:scale-110 transition-transform text-primary">add_a_photo</span>
                    <span className="font-label-md text-label-md font-bold">Add New Media</span>
                    <span className="text-[10px] mt-1 opacity-60">JPEG, PNG up to 10MB</span>
                  </button>
                </div>
              ) : (
                /* List View Layout */
                <div className="space-y-2 text-left">
                  {activePhotos.map((photo) => (
                    <div key={photo.id} className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/60 flex items-center justify-between gap-4 hover:border-primary transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <input 
                          type="checkbox"
                          checked={selectedMediaIds.includes(photo.id)}
                          onChange={() => handleMediaCheckToggle(photo.id)}
                          className="w-5 h-5 rounded border-outline-variant bg-transparent text-primary focus:ring-primary cursor-pointer shrink-0"
                        />
                        <img className="w-12 h-12 object-cover rounded-md border border-outline-variant/40 shrink-0" src={photo.src} alt={photo.alt} />
                        <span className="font-label-md text-on-surface truncate font-bold">{photo.alt}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => handleOpenEditPhoto(photo)}
                          className="px-3 py-1.5 hover:bg-surface-container rounded-lg text-primary text-xs font-bold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleIndividualDelete(photo.id, photo.alt)}
                          className="p-1.5 hover:bg-error-container/30 text-error rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {activePhotos.length === 0 && (
                    <div className="py-16 text-center text-on-surface-variant font-light italic">
                      No media available. Click upload above to add items.
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Recent Activity Table / Gallery logs */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden text-left mt-8">
        <div className="px-stack-md py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm font-bold">Gallery Audit Logs</h3>
          <button 
            onClick={() => triggerToast('Opening full systems history log tracker...')}
            className="text-primary font-label-md text-label-md hover:underline font-bold text-sm"
          >
            View All History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Action Event</th>
                <th className="px-6 py-4">Target Album</th>
                <th className="px-6 py-4">Managed By</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant font-light">
              {galleryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container transition-all duration-200">
                  <td className="px-6 py-4 flex items-center">
                    <span className={`w-2.5 h-2.5 rounded-full mr-3 shrink-0 ${
                      log.color === 'bg-error' ? 'bg-red-500' : log.color === 'bg-tertiary' ? 'bg-blue-600' : 'bg-green-500'
                    }`}></span>
                    <span className="font-medium text-on-surface">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface">{log.album}</td>
                  <td className="px-6 py-4 font-semibold">{log.author}</td>
                  <td className="px-6 py-4 text-right text-on-surface-variant font-bold text-xs uppercase">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => {
          setUploadFormData({ title: '', albumTarget: selectedAlbum, sampleIndex: 'img-1' });
          setIsUploadModalOpen(true);
          document.body.style.overflow = 'hidden';
        }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50 group border border-primary-fixed"
        id="fab-upload"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-16 bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md font-label-md text-label-md whitespace-nowrap pointer-events-none border border-outline-variant/20">
          Quick Upload
        </span>
      </button>

      {/* Slide-Up Notification Toast */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* Modal: Create Album */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseAlbumModal}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create New Media Album</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={() => { setIsAlbumModalOpen(false); document.body.style.overflow = 'auto'; }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateAlbumSubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Album Name</label>
                <input 
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="e.g. Summer Camp 2024"
                  type="text"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => { setIsAlbumModalOpen(false); document.body.style.overflow = 'auto'; }}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Create Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Upload Photo */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => { setIsUploadModalOpen(false); document.body.style.overflow = 'auto'; }}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Upload Campus Media Assets</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={() => { setIsUploadModalOpen(false); document.body.style.overflow = 'auto'; }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUploadPhotoSubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Media Caption / Title</label>
                <input 
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="e.g. Student Hackathon Project Presentation"
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Target Album Folder</label>
                  <select 
                    value={uploadFormData.albumTarget}
                    onChange={(e) => setUploadFormData(prev => ({ ...prev, albumTarget: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer font-bold text-body-sm"
                  >
                    {albums.map((alb) => (
                      <option key={alb.id} value={alb.name}>{alb.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Media Sample Image</label>
                  <select 
                    value={uploadFormData.sampleIndex}
                    onChange={(e) => setUploadFormData(prev => ({ ...prev, sampleIndex: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer font-bold text-body-sm"
                  >
                    <option value="img-1">Computer Workstations Lab</option>
                    <option value="img-2">Candid Collaborative Coding</option>
                    <option value="img-3">Hands mechanical coding focus</option>
                  </select>
                </div>
              </div>

              <div className="p-8 border-2 border-dashed border-outline-variant/60 rounded-xl flex flex-col items-center justify-center bg-surface-container-lowest/50 text-on-surface-variant text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
                <p className="text-xs font-bold">Standard drag-n-drop file indicators active.</p>
                <p className="text-[10px] font-light mt-1">Mock upload simulator will inject selected sample image.</p>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => { setIsUploadModalOpen(false); document.body.style.overflow = 'auto'; }}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Record Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Photo Caption */}
      {isEditModalOpen && editingPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseEditPhoto}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant text-left animate-scale-in">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Edit Asset Captions</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseEditPhoto}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdatePhotoSubmit} className="p-stack-md space-y-4">
              <div className="text-center">
                <img className="w-32 h-32 object-cover rounded-lg border border-outline-variant/60 mx-auto shadow" src={editingPhoto.src} alt={editingPhoto.alt} />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Image Alt Caption</label>
                <input 
                  value={editingPhoto.alt}
                  onChange={(e) => setEditingPhoto(prev => ({ ...prev, alt: e.target.value }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  type="text"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseEditPhoto}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;

