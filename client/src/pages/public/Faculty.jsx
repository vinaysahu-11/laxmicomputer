import React, { useState, useEffect } from 'react';
import facultyService from '../../services/facultyService';

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // for detail modal

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const data = await facultyService.getPublicTeachers();
      setTeachers(data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load faculty directory profiles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  const getInitials = (name) => {
    if (!name) return 'TC';
    return name
      .split(' ')
      .map((p) => p.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg min-h-screen text-left">
      {/* Header Section */}
      <header className="mb-stack-lg text-center md:text-left animate-fade-in">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-stack-sm text-primary">Our Expert Faculty</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
          Learn from industry veterans and certified educators dedicated to your digital success. Our faculty brings decades of combined experience in high-end IT fields.
        </p>
      </header>

      {/* Roster Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Syncing instructor roster...</p>
        </div>
      ) : error ? (
        <div className="py-16 max-w-md mx-auto text-center bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
          <p className="font-body-md font-semibold">{error}</p>
          <button 
            onClick={fetchFaculty}
            className="mt-4 px-6 py-2 bg-error text-on-error rounded-lg font-label-md text-xs hover:opacity-90 transition-opacity"
          >
            Retry Load
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {teachers.map((faculty, idx) => {
            const initials = getInitials(faculty.name);
            const photoSrc = getImageUrl(faculty.photo);

            return (
              <article 
                key={faculty._id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-350 shadow-sm hover:shadow-md flex flex-col cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedTeacher(faculty)}
                style={{
                  transform: hoveredIndex === idx ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), shadow 0.3s ease'
                }}
              >
                <div className="relative h-64 w-full bg-secondary-container overflow-hidden">
                  {faculty.photo ? (
                    <img 
                      alt={faculty.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      src={photoSrc} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-5xl">
                      {initials}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-1 bg-primary text-on-primary text-label-sm font-label-sm rounded-full font-bold uppercase tracking-wider text-[10px]">
                      Instructor
                    </span>
                  </div>
                </div>
                
                <div className="p-stack-lg flex flex-col flex-grow text-left">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">{faculty.name}</h2>
                  <p className="font-label-md text-primary mb-stack-sm font-bold text-sm">{faculty.subject}</p>
                  
                  <div className="flex items-center gap-2 text-on-surface-variant mb-stack-md">
                    <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    <span className="font-label-sm font-semibold">{faculty.experience} Experience</span>
                  </div>
                  
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-lg flex-grow font-light line-clamp-3">
                    {faculty.bio || 'Experienced educator and professional developer committed to supporting students through interactive learning.'}
                  </p>
                  
                  <button className="w-full py-stack-sm border border-primary text-primary font-label-md rounded-lg hover:bg-primary/5 transition-all font-bold mt-auto active:scale-95">
                    View Details &amp; Contact
                  </button>
                </div>
              </article>
            );
          })}

          {/* CTA Card */}
          <article className="bg-primary-container text-on-primary-container rounded-xl p-stack-lg flex flex-col justify-center items-center text-center shadow-lg border border-primary/20">
            <div className="bg-surface-container-lowest rounded-full p-4 mb-stack-md">
              <span className="material-symbols-outlined text-primary text-[48px]">groups</span>
            </div>
            <h2 className="font-headline-md text-headline-md mb-stack-sm font-bold">Join Our Academic Team</h2>
            <p className="font-body-sm text-body-sm mb-stack-lg font-light text-on-primary-container/80">
              Are you an industry expert with a passion for teaching? We are always looking for exceptional educators to join our growing community.
            </p>
            <button 
              onClick={() => alert('Please contact Laxmi Computer Education HR at info@laxmicomputer.com with your resume.')}
              className="bg-on-primary-container text-surface px-stack-lg py-stack-sm rounded-lg font-label-md hover:scale-105 transition-transform active:scale-95 font-bold shadow-md"
            >
              Apply Now
            </button>
          </article>
        </div>
      )}

      {/* Mentorship Stats */}
      <section className="mt-stack-lg bg-surface-container-low rounded-2xl p-stack-lg flex flex-col md:flex-row justify-around items-center gap-stack-lg border border-outline-variant/30">
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg font-bold">12+</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs">Expert Mentors</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg font-bold">8,500+</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs">Students Trained</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg font-bold">98%</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs">Passing Rate</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg font-bold">100%</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs">Practical Focus</p>
        </div>
      </section>

      {/* Teacher Detail Modal (Popup) */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedTeacher(null)}></div>
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="flex justify-between items-start p-6 bg-surface-container-low border-b border-outline-variant/40">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">{selectedTeacher.name}</h3>
                <p className="text-primary font-label-md text-sm font-bold uppercase tracking-wider">{selectedTeacher.subject}</p>
              </div>
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-square md:h-44 md:w-44 rounded-xl overflow-hidden bg-secondary-container border border-outline-variant">
                  {selectedTeacher.photo ? (
                    <img 
                      src={getImageUrl(selectedTeacher.photo)} 
                      alt={selectedTeacher.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-4xl">
                      {getInitials(selectedTeacher.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-xs uppercase text-on-surface-variant tracking-wider font-semibold">Qualification</h4>
                    <p className="text-body-md font-medium">{selectedTeacher.qualification}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-on-surface-variant tracking-wider font-semibold">Experience</h4>
                    <p className="text-body-md font-medium">{selectedTeacher.experience}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-on-surface-variant tracking-wider font-semibold">Contact Info</h4>
                    <p className="text-body-sm text-on-surface font-light flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">mail</span> {selectedTeacher.email}
                    </p>
                    <p className="text-body-sm text-on-surface font-light flex items-center gap-1.5 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">phone</span> {selectedTeacher.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase text-on-surface-variant tracking-wider font-semibold mb-1">Biography / About</h4>
                <p className="text-body-sm text-on-surface-variant font-light leading-relaxed whitespace-pre-line">
                  {selectedTeacher.bio || 'This instructor is dedicated to delivering quality computing education and helping students succeed in their careers.'}
                </p>
              </div>

              {/* Social Links */}
              {selectedTeacher.socialLinks && (selectedTeacher.socialLinks.facebook || selectedTeacher.socialLinks.twitter || selectedTeacher.socialLinks.linkedin) && (
                <div className="pt-4 border-t border-outline-variant/40 flex items-center gap-3">
                  <span className="text-xs uppercase text-on-surface-variant font-semibold">Connect:</span>
                  <div className="flex gap-2">
                    {selectedTeacher.socialLinks.linkedin && (
                      <a 
                        href={selectedTeacher.socialLinks.linkedin.startsWith('http') ? selectedTeacher.socialLinks.linkedin : `https://${selectedTeacher.socialLinks.linkedin}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1 bg-surface-container border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-colors text-xs rounded flex items-center gap-1"
                      >
                        LinkedIn
                      </a>
                    )}
                    {selectedTeacher.socialLinks.facebook && (
                      <a 
                        href={selectedTeacher.socialLinks.facebook.startsWith('http') ? selectedTeacher.socialLinks.facebook : `https://${selectedTeacher.socialLinks.facebook}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1 bg-surface-container border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-colors text-xs rounded flex items-center gap-1"
                      >
                        Facebook
                      </a>
                    )}
                    {selectedTeacher.socialLinks.twitter && (
                      <a 
                        href={selectedTeacher.socialLinks.twitter.startsWith('http') ? selectedTeacher.socialLinks.twitter : `https://${selectedTeacher.socialLinks.twitter}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1 bg-surface-container border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-colors text-xs rounded flex items-center gap-1"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Faculty;
