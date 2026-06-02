import React, { useState } from 'react';
import StudyMaterialCard from '../../components/teacher/materials/StudyMaterialCard';

const StudyMaterials = () => {
  // Filters & Layout States
  const [selectedFolder, setSelectedFolder] = useState('All Folders');
  const [layoutMode, setLayoutMode] = useState('grid'); // grid, list
  
  // Modals States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null); // { title, format, url }
  const [shareFile, setShareFile] = useState(null);
  
  // Form Upload fields
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCourse, setUploadCourse] = useState('Web Development');
  const [uploadFormat, setUploadFormat] = useState('PDF');
  const [uploadSize, setUploadSize] = useState('4.2 MB');

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Static items array
  const [materials, setMaterials] = useState([
    { 
      id: 1, 
      title: 'Lesson 12: React Context API.pdf', 
      course: 'Web Development', 
      format: 'PDF', 
      size: '2.4 MB', 
      timeAgo: '2h ago',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0wokzcDkWEhEXa-0OY29_xL6_em01fjzzCEeFmdFPjvuK3lo9Ilmuu2o5moQyMU6j8quhgfFN7KmA4L21cNF8pt-109UJzAbdHhiE3ngKn_uCMUXsXJgLKbpnk9pWWHngb60ARM6uhyoQ3T1jPrHfrtvqf-zR93NASYyyk-xot94pz3CZDeYVXcHrojzsmXTvXZ-vh5D8dlP5HBr5UiAP_y4dyCH3esytbymOZWZtmzrpDL7Jvizb04G7dan4w4fXnrKLqC-od1N0'
    },
    { 
      id: 2, 
      title: 'Full Session: Data Structures', 
      course: 'Intro to Python', 
      format: 'MP4', 
      size: '450 MB', 
      timeAgo: 'Yesterday',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAImaqz4FcXlVtXRj1bK757bAv7Zmbz4Qz3CXPeB67oLydwDVvv2y0wPwezYAG5-lOlAfdCAqobyja65-s65R4655NgrJxmCdSll7-MWzbnq9Vft7LghOEpZf8NnDzbAgEounZXeYqQPEXSsIovpO8FE59b-VAvH6UGqsPitpXKjTc6iF0bj1FxpdQxoPfKPWMWrlRnxG7DZ681LoERJp3CUwYg2JT7ExTLkB4q1xu8XJa6k_JBVibKR725V-jTKK2YhyQJyDcEX9Wk'
    },
    { 
      id: 3, 
      title: 'Motherboard Layouts v2.0', 
      course: 'System Architecture', 
      format: 'PDF', 
      size: '5.1 MB', 
      timeAgo: 'Sep 12',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNoQLGB37MnuTr9JbjB-egfiEbIuEHXuVDVvPXSUIB8TVa7vGIeKAE5FGS_-1Fvwha9W2YRMo091XqjrhPuzN3lvwQ_Oujup_VncC70bP8duGjJvhLjeV1cbqwaAEJcIjSAS8jjTP5SIetQtL58MkzM4sbzTEQ3Kwmxvp3k3HnC9Zd_524kpcEA89X799578hH2XVohFXbFbmiaJU7ULxkx8a1OE-FJVKntCN83jnKa3A2r6O58z-nWXR7RFrGcXbX_W5dKqocytpk'
    }
  ]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newItem = {
      id: materials.length + 1,
      title: uploadTitle + (uploadFormat === 'PDF' ? '.pdf' : '.mp4'),
      course: uploadCourse,
      format: uploadFormat,
      size: uploadSize,
      timeAgo: 'Just now',
      coverImage: uploadFormat === 'PDF' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0wokzcDkWEhEXa-0OY29_xL6_em01fjzzCEeFmdFPjvuK3lo9Ilmuu2o5moQyMU6j8quhgfFN7KmA4L21cNF8pt-109UJzAbdHhiE3ngKn_uCMUXsXJgLKbpnk9pWWHngb60ARM6uhyoQ3T1jPrHfrtvqf-zR93NASYyyk-xot94pz3CZDeYVXcHrojzsmXTvXZ-vh5D8dlP5HBr5UiAP_y4dyCH3esytbymOZWZtmzrpDL7Jvizb04G7dan4w4fXnrKLqC-od1N0'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAImaqz4FcXlVtXRj1bK757bAv7Zmbz4Qz3CXPeB67oLydwDVvv2y0wPwezYAG5-lOlAfdCAqobyja65-s65R4655NgrJxmCdSll7-MWzbnq9Vft7LghOEpZf8NnDzbAgEounZXeYqQPEXSsIovpO8FE59b-VAvH6UGqsPitpXKjTc6iF0bj1FxpdQxoPfKPWMWrlRnxG7DZ681LoERJp3CUwYg2JT7ExTLkB4q1xu8XJa6k_JBVibKR725V-jTKK2YhyQJyDcEX9Wk'
    };

    setMaterials([newItem, ...materials]);
    setUploadTitle('');
    setIsUploadOpen(false);
    triggerToast("🚀 Study material uploaded and linked to syllabus successfully!");
  };

  const handleDownload = (item) => {
    triggerToast(`⏳ Downloading "${item.title}"... Syncing package mirrors...`);
  };

  const handleShareClick = (item) => {
    setShareFile(item);
  };

  const handleCopyLink = () => {
    triggerToast("📋 Resource link successfully copied onto clipboard!");
    setShareFile(null);
  };

  // Filter logic
  const filteredMaterials = materials.filter(m => {
    if (selectedFolder === 'All Folders') return true;
    if (selectedFolder === 'Intro to Python') return m.course === 'Intro to Python';
    if (selectedFolder === 'Advanced Web Dev') return m.course === 'Web Development';
    if (selectedFolder === 'System Architecture') return m.course === 'System Architecture';
    return true;
  });

  return (
    <div className="text-left relative select-none">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-none">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Study Materials</h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl font-light leading-relaxed">
            Manage your academic assets, uploaded lectures, and student reference guides in one central teacher repository.
          </p>
        </div>
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:translate-y-[-2px] transition-all active:scale-95 cursor-pointer border-none outline-none text-xs shrink-0 self-start md:self-end"
        >
          <span className="material-symbols-outlined text-lg">cloud_upload</span>
          <span>Upload New Material</span>
        </button>
      </div>

      {/* Bento Grid Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* PDF Notes Summary */}
        <div className="glass-card p-6 rounded-2xl border border-outline-variant flex flex-col justify-between group hover:border-primary transition-colors cursor-default">
          <div className="flex justify-between items-start mb-8 text-xs">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl select-none">
              <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
            </div>
            <span className="text-on-surface-variant font-label-md font-semibold opacity-80">Total: 142 Files</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm">Lecture Notes</h3>
            <p className="text-on-surface-variant text-body-sm text-xs font-light mt-1">Structured PDF guides for all active courses.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant flex items-center justify-between text-primary font-semibold text-xs select-none">
            <span>View Library</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>

        {/* Video Classes Summary */}
        <div className="glass-card p-6 rounded-2xl border border-outline-variant flex flex-col justify-between group hover:border-primary transition-colors cursor-default">
          <div className="flex justify-between items-start mb-8 text-xs">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl select-none">
              <span className="material-symbols-outlined text-3xl">play_circle</span>
            </div>
            <span className="text-on-surface-variant font-label-md font-semibold opacity-80">48 Hours Uploaded</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm">Recorded Classes</h3>
            <p className="text-on-surface-variant text-body-sm text-xs font-light mt-1">Live session recordings and tutorials.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant flex items-center justify-between text-primary font-semibold text-xs select-none">
            <span>Access Videos</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>

        {/* Cloud Storage Capacity */}
        <div className="bg-primary text-on-primary p-6 rounded-2xl flex flex-col justify-between shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">cloud</span>
          </div>
          
          <div className="relative z-10 text-xs">
            <div className="flex justify-between items-center mb-6 select-none">
              <span className="font-label-md uppercase tracking-widest opacity-80 font-bold">Storage Capacity</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[9px] font-bold">PREMIUM</span>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold">12.4</span>
              <span className="text-lg opacity-80 font-light"> / 50 GB</span>
            </div>
            
            {/* Storage Progress Bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full" style={{ width: '25%' }}></div>
            </div>
            <p className="text-[10px] opacity-90 font-light leading-none">25% of storage used. Keep up the great work!</p>
          </div>
          
          <button 
            onClick={() => setIsUpgradeOpen(true)}
            className="relative z-10 mt-6 bg-white text-primary py-2.5 rounded-lg font-bold text-xs hover:bg-opacity-90 transition-all border-none cursor-pointer outline-none active:scale-[0.98]"
          >
            Upgrade Storage
          </button>
        </div>

      </div>

      {/* Material List Container */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
        
        {/* Table/Grid Filter Header */}
        <div className="px-8 py-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h4 className="font-headline-sm text-sm font-bold text-on-surface">Recent Materials</h4>
          
          <div className="flex items-center gap-3 text-xs font-semibold select-none">
            <select 
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-2 outline-none cursor-pointer focus:border-primary font-semibold text-xs"
            >
              <option value="All Folders">All Folders</option>
              <option value="Intro to Python">Intro to Python</option>
              <option value="Advanced Web Dev">Advanced Web Dev</option>
              <option value="System Architecture">System Architecture</option>
            </select>
            
            {/* View Switcher Layout Buttons */}
            <div className="flex border border-outline-variant rounded-lg overflow-hidden">
              <button 
                onClick={() => setLayoutMode('grid')}
                className={`p-2 border-none cursor-pointer outline-none ${
                  layoutMode === 'grid' 
                    ? 'bg-surface-container-high text-primary border-r border-outline-variant' 
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-lg font-bold">grid_view</span>
              </button>
              <button 
                onClick={() => setLayoutMode('list')}
                className={`p-2 border-none cursor-pointer outline-none ${
                  layoutMode === 'list' 
                    ? 'bg-surface-container-high text-primary' 
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-lg font-bold">list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Dynamic Rendering */}
        {layoutMode === 'grid' ? (
          /* Cards Grid Mode */
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((item) => (
              <StudyMaterialCard 
                key={item.id}
                title={item.title}
                course={item.course}
                format={item.format}
                size={item.size}
                timeAgo={item.timeAgo}
                coverImage={item.coverImage}
                onPreview={() => setPreviewFile(item)}
                onDownload={() => handleDownload(item)}
              />
            ))}
            
            {/* Card 4 (Upload Folder dashed card) */}
            <div 
              onClick={() => setIsUploadOpen(true)}
              className="border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center p-8 bg-surface/40 hover:bg-surface-container-low hover:border-primary transition-all cursor-pointer group text-xs select-none"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">add</span>
              </div>
              <p className="font-label-md text-on-surface-variant group-hover:text-primary font-bold">Upload Folder</p>
              <p className="text-[10px] text-on-surface-variant mt-1 font-light">Drag and drop files here</p>
            </div>
          </div>
        ) : (
          /* Row List Mode */
          <div className="p-8 overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant font-bold">
                <tr>
                  <th className="px-6 py-4">Resource File Name</th>
                  <th className="px-6 py-4">Associated Course</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
                {filteredMaterials.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface truncate max-w-[200px]">{item.title}</td>
                    <td className="px-6 py-4 font-medium">{item.course}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4 text-primary font-bold">{item.format}</td>
                    <td className="px-6 py-4 text-center select-none">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => setPreviewFile(item)}
                          className="text-primary hover:underline bg-transparent border-none cursor-pointer outline-none font-bold"
                        >
                          Preview
                        </button>
                        <button 
                          onClick={() => handleDownload(item)}
                          className="text-primary hover:underline bg-transparent border-none cursor-pointer outline-none font-bold"
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        <div className="px-8 py-6 border-t border-outline-variant flex items-center justify-between text-xs font-semibold select-none">
          <p className="text-body-sm text-on-surface-variant font-light leading-none">Showing 1 to {filteredMaterials.length} of 142 resources</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-outline-variant rounded-lg text-on-surface-variant disabled:opacity-30 bg-transparent cursor-default">
              <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded-lg text-xs font-bold border-none">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-lg text-xs font-bold bg-transparent border-none cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-lg text-xs font-bold bg-transparent border-none cursor-pointer">3</button>
            <button className="p-2 border border-outline-variant rounded-lg text-on-surface-variant bg-transparent cursor-pointer hover:bg-surface-container active:scale-95">
              <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* Pro Tip Resource Tagging Callout */}
      <div className="mt-10 p-6 bg-secondary-container/30 rounded-2xl border border-secondary-container flex items-start gap-4 text-xs text-left">
        <span className="material-symbols-outlined text-primary mt-1 select-none">lightbulb</span>
        <div>
          <h5 className="font-headline-sm text-on-secondary-container font-bold text-sm">Pro Tip: Resource Tagging</h5>
          <p className="text-body-sm text-on-secondary-container opacity-80 mt-1 font-light leading-relaxed">
            You can now tag your materials by student batch year. This helps students find relevant content faster during exam seasons. Try adding a '2024-Batch' tag to your next upload!
          </p>
        </div>
      </div>

      {/* MODAL 1: Upload Document */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2 select-none">
                <span className="material-symbols-outlined text-primary">cloud_upload</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Upload Study Handouts</h3>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-[10px] text-on-surface-variant uppercase font-semibold">Document Title</label>
                <input 
                  type="text" 
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Introduction to React Context"
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 select-none">
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-semibold">Associated Course</label>
                  <select 
                    value={uploadCourse}
                    onChange={(e) => setUploadCourse(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Intro to Python">Intro to Python</option>
                    <option value="System Architecture">System Architecture</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-semibold">Format</label>
                  <select 
                    value={uploadFormat}
                    onChange={(e) => setUploadFormat(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="MP4">MP4 Video</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02] font-bold"
                >
                  Publish Material
                </button>
                <button 
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Upgrade Storage */}
      {isUpgradeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20 select-none">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">cloud</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Upgrade Cloud Storage</h3>
              </div>
              <button 
                onClick={() => setIsUpgradeOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="font-light text-on-surface-variant leading-relaxed">
                Unlock higher storage bandwidths for large proctored classes and high-definition recorded tutorials.
              </p>
              
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/35 flex justify-between items-center">
                <div>
                  <p className="font-bold text-on-surface">Professional Tier (250 GB)</p>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5">High definition uploads &amp; archives</p>
                </div>
                <span className="text-primary font-bold text-sm">$9.99/mo</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setIsUpgradeOpen(false);
                    triggerToast("💳 Premium cloud upgraded successfully!");
                  }}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02] font-bold"
                >
                  Upgrade Now
                </button>
                <button 
                  onClick={() => setIsUpgradeOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Preview Lightbox */}
      {previewFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative border border-white/10 text-left flex flex-col h-[80vh]">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4 select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  {previewFile.format === 'MP4' ? 'video_library' : 'menu_book'}
                </span>
                <h3 className="font-headline-sm text-sm font-bold text-on-surface truncate max-w-lg">{previewFile.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDownload(previewFile)}
                  className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer hover:bg-primary-container transition-all"
                >
                  Download File
                </button>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none p-1.5 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl bg-surface-container-low relative border border-outline-variant/25 flex items-center justify-center">
              {previewFile.format === 'MP4' ? (
                /* MP4 recorded lecture streams */
                <div className="w-full h-full flex flex-col md:flex-row">
                  <div className="flex-1 bg-black flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-[100px] text-white/20 select-none absolute">play_circle</span>
                    <video className="w-full max-h-full aspect-video z-10" controls poster={previewFile.coverImage}></video>
                  </div>
                  <div className="w-80 border-l border-outline-variant/20 bg-surface-container-lowest p-4 flex flex-col gap-3 h-full shrink-0 select-none">
                    <h4 className="font-bold text-xs text-on-surface">Interactive Lecture Chat</h4>
                    <div className="flex-1 bg-surface-container-low rounded-lg p-3 text-[10px] overflow-y-auto space-y-2 font-light">
                      <p><strong>Rahul Verma:</strong> Professor, can you repeat Context overrides?</p>
                      <p><strong>Priya Patel:</strong> Loved the modular layout details!</p>
                      <p><strong>Alex Smith:</strong> Submitting notes now.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* PDF slide document viewer */
                <div className="w-full h-full p-8 overflow-y-auto bg-slate-300 dark:bg-zinc-800 flex flex-col items-center gap-4">
                  <div className="w-full max-w-2xl bg-white aspect-[1/1.4] shadow-md border border-outline-variant/30 flex items-center justify-center relative select-none">
                    <div className="text-center p-6 text-xs font-light">
                      <span className="material-symbols-outlined text-primary text-4xl mb-2">picture_as_pdf</span>
                      <h4 className="font-bold text-on-surface text-sm mb-1">{previewFile.title}</h4>
                      <p className="text-on-surface-variant">Page 1 of 12 • Cloud Document Stream</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudyMaterials;
