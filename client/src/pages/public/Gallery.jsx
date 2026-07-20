import React, { useState, useEffect } from 'react';
import { getAlbums, getGalleryItems } from '../../services/galleryService';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Photos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePhoto, setActivePhoto] = useState(null); // stores photo item for Lightbox modal

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const [albumsData, itemsData] = await Promise.all([
        getAlbums(),
        getGalleryItems()
      ]);
      setAlbums(albumsData || []);
      setGalleryItems(itemsData || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load academy gallery.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Map album ID to album name for display & filtering
  const albumMap = {};
  albums.forEach(alb => {
    albumMap[alb._id] = alb.name;
  });

  const categories = ['All Photos', ...albums.map(alb => alb.name)];
  
  const filteredItems = selectedCategory === 'All Photos'
    ? galleryItems
    : galleryItems.filter(item => albumMap[item.albumId] === selectedCategory);

  const getGridClass = (index) => {
    const patterns = [
      'md:col-span-8 aspect-[16/10]',
      'md:col-span-4 aspect-[16/10]',
      'md:col-span-4 aspect-[3/4]',
      'md:col-span-4 aspect-square',
      'md:col-span-4 aspect-square',
      'md:col-span-4 aspect-[3/4]',
      'md:col-span-12 h-64'
    ];
    return patterns[index % patterns.length];
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg pb-stack-lg">
      <header className="mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl mb-stack-sm text-primary">Academy Gallery</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Witness the excellence of Laxmi Computer Education through our state-of-the-art facilities, vibrant campus life, and successful milestones.
        </p>
      </header>

      {/* Category Filters */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-stack-sm mb-stack-lg">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-label-md transition-all shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-secondary-container text-on-secondary-container hover:bg-primary-container/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Bento Grid Layout / Loading / Error */}
      {loading ? (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Syncing gallery collection...</p>
        </div>
      ) : error ? (
        <div className="py-16 max-w-md mx-auto text-center bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
          <p className="font-body-md font-semibold">{error}</p>
          <button 
            onClick={fetchGallery}
            className="mt-4 px-6 py-2 bg-error text-on-error rounded-lg font-label-md text-xs hover:opacity-90 transition-opacity"
          >
            Retry Load
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">photo_library</span>
          <p className="font-body-lg text-on-surface-variant">No images found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {filteredItems.map((item, index) => {
            const gridClass = getGridClass(index);
            const imageSrc = getImageUrl(item.image);
            const categoryName = albumMap[item.albumId] || 'Gallery';
            
            return (
              <div 
                key={item._id}
                onClick={() => setActivePhoto(item)}
                className={`${gridClass} group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 cursor-pointer`}
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={imageSrc} 
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-lg">
                  <span className="text-white font-label-sm uppercase tracking-wider mb-2">{categoryName}</span>
                  <h3 className="text-white font-headline-sm">{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors focus:outline-none"
            onClick={() => setActivePhoto(null)}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              src={getImageUrl(activePhoto.image)} 
              alt={activePhoto.title}
            />
            <div className="text-center mt-4 text-white">
              <span className="text-primary font-label-sm uppercase tracking-wider block mb-1">
                {albumMap[activePhoto.albumId] || 'Gallery'}
              </span>
              <h3 className="font-headline-md text-headline-sm md:text-headline-md">{activePhoto.title}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;

