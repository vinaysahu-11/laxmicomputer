import React, { useState, useEffect } from 'react';
import resultService from '../../services/resultService';

const Results = () => {
  const [hoveredStoryIndex, setHoveredStoryIndex] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await resultService.getResults();
      // Sort results by percentage descending to find academic toppers
      const sortedResults = (data || []).sort((a, b) => b.percentage - a.percentage);
      setResults(sortedResults);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load student results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.split(' ');
    return parts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2) || 'ST';
  };

  const mainTopper = results.length > 0 ? results[0] : null;
  const secondaryToppers = results.length > 1 ? results.slice(1) : [];

  const storiesData = [
    {
      id: 1,
      name: 'Kiran Gupta',
      placement: 'Placed at Google',
      quote: '"The hands-on training at LAXMI changed my perspective on coding. I went from a beginner to a confident developer in just 6 months. Truly life-changing!"',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3j812z3y2QdcdfhKmpVvPpvb0pgv6EHPScLLt003Yzcet_nLhqGTBIC_v0Fk9011RDHVmJOMyL-dEcdHev4IgGWOZgmrm8nHTxhrePqMp__gbmZ9lB-bEOleYMp8lFkNkrQTq3-2ztS0lrv3Qr61zGiERaGP87DCEnBH5eTvZ2wQJanrdXCR_nf6WtBkg1KA-wCbOgO-mupc3vCJQjGbNXPxxJUvXuwzlMNezuDb4O_FK4IwxHlo30jTN5wdXJMmDc4eDVdYhAmsE'
    },
    {
      id: 2,
      name: 'Arjun Mehta',
      placement: 'Placed at Microsoft',
      quote: '"Laxmi Education doesn\'t just teach syntax; they teach problem-solving. The placement cell helped me land my dream job at my first interview."',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRRMHvhfG9ZBiY-9hTf8eOKFUXF6l2MYXfsA9l9C6l5fX9K4R7Zcps9QQmfcVU-WgdB2L2RTLkezTxhGCnxWblgmIFANVnQLJJICfHNJuSCH7Uo_sOK02Ijbpyy-1C2jYi5bCU_WAoHhI5-bmE6-aVrB29D5F_4tJZVvYpy9O5hjQyNQ-G_fJGfKGEHe7QbGowmmCCp-220KdVZZ7haXB68pl67K-DxqAyfmnbp4u4CRECIejOEllaefbmHz8E2Eiy9k0Xq0sf_mv'
    },
    {
      id: 3,
      name: 'Riya Sen',
      placement: 'Placed at Amazon',
      quote: '"The curriculum is exactly what the industry demands. The mentors are patient and highly knowledgeable. Best decision for my career!"',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHQwyplE8esTKElf9LejsdlFmeSmSU4FsvTUfsvHANlI5cVDZvVPZGS900zQK3WdrIsTHCJpukkW_6pWseBdjurncARv4o5RlGsZEv1hbOwIsgf3AV8f6rPhFL-y8Q8WncvaLgeypsRrcFLo0mmOKBCQyb93AIL85iP02jmn-un0dXq6C5tEqmHnrb3Kg-0gO7v2l8xi2HMPK1oFPRiYtAkoEvOZaYupyh6W3lmlWxCQycS83kijTUHU21cqEZQKfePye8gyS26ifO'
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg space-y-24">
      {/* Hero Title Section */}
      <header className="text-center space-y-stack-sm max-w-3xl mx-auto">
        <h1 className="font-headline-xl text-headline-xl text-on-surface">Academic Excellence &amp; <span className="text-primary">Career Success</span></h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Celebrate the remarkable achievements of our students who have mastered digital skills and secured placements in top global firms.</p>
      </header>

      {/* Student Achievements: Toppers (Bento Style) */}
      {loading ? (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Syncing academic toppers...</p>
        </div>
      ) : error ? (
        <div className="py-16 max-w-md mx-auto text-center bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
          <p className="font-body-md font-semibold">{error}</p>
          <button 
            onClick={fetchResults}
            className="mt-4 px-6 py-2 bg-error text-on-error rounded-lg font-label-md text-xs hover:opacity-90 transition-opacity"
          >
            Retry Load
          </button>
        </div>
      ) : results.length === 0 ? (
        <div className="py-16 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">school</span>
          <p className="font-body-lg text-on-surface-variant">No academic achievements recorded yet.</p>
        </div>
      ) : (
        <section>
          <div className="flex items-end justify-between mb-stack-lg">
            <div className="space-y-2">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Student Achievements</h2>
              <div className="h-1 w-24 bg-primary-container rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Main Topper Card */}
            {mainTopper && (
              <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-full h-80 bg-primary/10 flex flex-col items-center justify-center text-primary text-5xl font-bold">
                  <span>{getInitials(mainTopper.studentName)}</span>
                  <span className="text-headline-sm mt-3 font-semibold">{mainTopper.percentage}%</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 p-stack-lg text-on-primary w-full">
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-label-sm mb-2 inline-block font-bold">ACADEMIC TOPPER</span>
                  <h3 className="font-headline-md text-headline-md font-bold">{mainTopper.studentName}</h3>
                  <p className="font-body-sm text-body-sm opacity-90">{mainTopper.courseName} - Grade: {mainTopper.grade}</p>
                </div>
              </div>
            )}

            {/* Secondary Topper Grid */}
            <div className="md:col-span-6 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              {secondaryToppers.map((topper, index) => (
                <div 
                  key={topper._id} 
                  className="p-stack-lg bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shrink-0 font-bold ${
                    index % 3 === 0 ? 'bg-primary-container text-on-primary-container' :
                    index % 3 === 1 ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                  }`}>
                    <span className="text-sm">{getInitials(topper.studentName)}</span>
                    <span className="text-[10px] font-light">{topper.percentage}%</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{topper.studentName}</h4>
                    <p className="text-on-surface-variant text-body-sm">{topper.courseName} - Grade: {topper.grade}</p>
                  </div>
                </div>
              ))}
              {secondaryToppers.length === 0 && (
                <div className="col-span-2 flex items-center justify-center p-8 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface-variant">
                  More toppers will be updated soon.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Showcase */}
      <section className="bg-surface-container-lowest rounded-3xl p-stack-lg border border-outline-variant">
        <div className="text-center mb-stack-lg space-y-2">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Global Certifications</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Our programs are accredited by industry leaders, ensuring your skills are recognized worldwide.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          <div className="group relative aspect-[4/3] bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center justify-center p-8">
            <img 
              className="opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 max-h-full max-w-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlVRFefqORPPYWQOFEXqeh8MwDx6uhdKaKjZaLcmBidUZ48OuIPzuFST6p5pAYqM9PwTx_bZi_n4FRNF-jEATsJsJRZUr8sYKJg2ghcwJOFGaqI0M9gtx5pOW-8snAUOquBHZsgxLkYTsFGHvEWjUHPLDnEElxY62epHHXMa1QH7lPP76CZsIpIt31UhArbe75rOfnl_ck8GQxmjwV_NFKSP1mWuU4dRy96q8cWfu-ICtwSYe9UvNUhMDIuJbIQgX5j8hcZFq8rvK3" 
              alt="Certification logo"
            />
          </div>
          <div className="group relative aspect-[4/3] bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center justify-center p-8">
            <img 
              className="opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 max-h-full max-w-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAelwHn4o5NcuBsEXuSPjnJgaq9ogSui5ZTHTtbN0fuCOkRIcSpnV9go9bICjTu5XmUgGrucLYQq7TfF-WGRUSyMJq6NUhlf0zYKZcVDKO7l-1VfjnabuNqil-nnZM6jav50TyrBPsaF4Bizf2wEzQJSET2atIb4jFEnQmpjY0rw7J2YwjjQCiQszB-rIQ6m9_NrlPqEhrQ6nmVIicYe2iQz7aFlRJmcRzYmU2tAERm7emBIkyqUkD6BrO_cvBC22PFhMsr-5b_hzNy" 
              alt="Certification logo"
            />
          </div>
          <div className="group relative aspect-[4/3] bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center justify-center p-8">
            <img 
              className="opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 max-h-full max-w-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAAAqFAKQkPa5np00OYz8kiJgXWp87Vk8oJWL-TY_KyS8ofyeRJtGoO_YgAHHE7b6KwIQmctDRRJVi-CGzfDrI_UOd5fGC_WZQUv-v-_y8tZ8yWbuCJq3vsTYPl2MYUHzCo3iPA7LPSP1SlDIi-7AHc1ppy8hFXCdgeETjwnWSFFAsnyrCBEn8SAPRDmBoZrlrr5NFyN3gqXIVoc93dtDt08V8Xum94zCs7bdijscc6aJhMwOKf8crn66vIOHHJ8Xn5yJ152LMHMFR" 
              alt="Certification logo"
            />
          </div>
          <div className="group relative aspect-[4/3] bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center justify-center p-8">
            <img 
              className="opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 max-h-full max-w-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMJmo2xDfpHUdWoUfyUImnYUDoEuWyzZK3DfsNzygILQSlC5yG00m5m3EvthOlomUPSxEmimqN1vZ9dPjCnvObtbDqMqS0yXxIlZMRCn-2RPfWEejfT-uDOGaadx1ooP3_kmGmy7jLW0YacsrMPBzrQ7Bm8-KSFs41Zp7ZRIv94Y93cZHA_yq9jr8CRLa_y0Cf7P-lecmddSZVD08z2EBHNzOCa-rjss5P43g-t19QRAOhhFx8MlP3DCS2wuLORaBjeZV0seCrrU8-" 
              alt="Certification logo"
            />
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section>
        <div className="flex items-center gap-4 mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface whitespace-nowrap">Placement Highlights</h2>
          <div className="h-[1px] w-full bg-outline-variant"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {['TECHMAHINDRA', 'ACCENTURE', 'INFOSYS', 'WIPRO', 'TCS', 'COGNIZANT'].map(company => (
            <div key={company} className="font-headline-md text-on-surface-variant select-none grayscale hover:grayscale-0 transition-all cursor-default">{company}</div>
          ))}
        </div>
        <div className="mt-stack-lg grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="p-stack-lg bg-primary/5 rounded-2xl border-l-4 border-primary space-y-2">
            <h5 className="font-headline-sm text-headline-sm text-primary font-bold">500+</h5>
            <p className="font-body-md text-on-surface">Students Placed this Year</p>
          </div>
          <div className="p-stack-lg bg-primary/5 rounded-2xl border-l-4 border-primary space-y-2">
            <h5 className="font-headline-sm text-headline-sm text-primary font-bold">12 LPA</h5>
            <p className="font-body-md text-on-surface">Highest Package Offered</p>
          </div>
          <div className="p-stack-lg bg-primary/5 rounded-2xl border-l-4 border-primary space-y-2">
            <h5 className="font-headline-sm text-headline-sm text-primary font-bold">95%</h5>
            <p className="font-body-md text-on-surface">Placement Success Rate</p>
          </div>
        </div>
      </section>

      {/* Success Cards (Stories) */}
      <section className="pb-24">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {storiesData.map((story, idx) => (
            <div 
              key={story.id}
              className="glass-card p-stack-lg rounded-2xl shadow-sm border border-outline-variant hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              onMouseEnter={() => setHoveredStoryIndex(idx)}
              onMouseLeave={() => setHoveredStoryIndex(null)}
              style={{
                transform: hoveredStoryIndex === idx ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">format_quote</span>
              </div>
              <div className="flex items-center gap-4 mb-stack-md">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src={story.image} 
                    alt={story.name}
                  />
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{story.name}</h4>
                  <p className="text-label-sm text-on-surface-variant">{story.placement}</p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant italic">{story.quote}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Results;
