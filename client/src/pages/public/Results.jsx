import React, { useState } from 'react';

const Results = () => {
  const [hoveredStoryIndex, setHoveredStoryIndex] = useState(null);

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
      <section>
        <div className="flex items-end justify-between mb-stack-lg">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Student Achievements</h2>
            <div className="h-1 w-24 bg-primary-container rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Main Topper Card */}
          <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm hover:shadow-lg transition-all duration-300">
            <img 
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjD_Ggbz0mBTXN0xORRdC12DmV3to_Wh2DOTdgRxey6t2HDQeg-8nExbyDhu1vNLotgpXcOXEZuecvQcY0fADaf4Sld6RWfSdZEAnhwPv1hA0ThLQ4MEBkNek3ZT17eAI6Nsmc_BuKIlsbNoJgdZ4tZRfT5LRPrHy-W_DL3IAO2nYKAoeOHCA9h2qqbs0uwyTzK0-V0qSzNjE8zDplxt-_msE_fq1H1iVFH4JvldxqMhncR97vGWJCDkEq1weQJdon8zkk7WUIrSma" 
              alt="Ananya Sharma"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-stack-lg text-on-primary">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-label-sm mb-2 inline-block">ACADEMIC TOPPER</span>
              <h3 className="font-headline-md text-headline-md">Ananya Sharma</h3>
              <p className="font-body-sm text-body-sm opacity-90">Full Stack Web Development - Grade: A+</p>
            </div>
          </div>

          {/* Secondary Topper Grid */}
          <div className="md:col-span-6 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            <div className="p-stack-lg bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Rahul Varma</h4>
                <p className="text-on-surface-variant text-body-sm">Data Science - Grade: A+</p>
              </div>
            </div>
            <div className="p-stack-lg bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Sneha Patil</h4>
                <p className="text-on-surface-variant text-body-sm">UI/UX Design - Grade: A</p>
              </div>
            </div>
            <div className="p-stack-lg bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shrink-0">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Vikram Singh</h4>
                <p className="text-on-surface-variant text-body-sm">Python Pro - Grade: A+</p>
              </div>
            </div>
            <div className="p-stack-lg bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                <span className="material-symbols-outlined text-3xl">military_tech</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Priya Das</h4>
                <p className="text-on-surface-variant text-body-sm">Cyber Security - Grade: A</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <h5 className="font-headline-sm text-headline-sm text-primary">500+</h5>
            <p className="font-body-md text-on-surface">Students Placed this Year</p>
          </div>
          <div className="p-stack-lg bg-primary/5 rounded-2xl border-l-4 border-primary space-y-2">
            <h5 className="font-headline-sm text-headline-sm text-primary">12 LPA</h5>
            <p className="font-body-md text-on-surface">Highest Package Offered</p>
          </div>
          <div className="p-stack-lg bg-primary/5 rounded-2xl border-l-4 border-primary space-y-2">
            <h5 className="font-headline-sm text-headline-sm text-primary">95%</h5>
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
                  <h4 className="font-label-md text-label-md text-on-surface">{story.name}</h4>
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
