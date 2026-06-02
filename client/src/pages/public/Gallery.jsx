import React, { useState } from 'react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Photos');

  const galleryItems = [
    {
      id: 1,
      category: 'Computer Lab',
      tag: 'Facilities',
      title: 'Advanced Computer Lab',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKcYu74odn4ut88Prz3qCCwZa8mF8QmSLxD9tqgmcJcCKE7TTsHYr44_iseNdSuJ5O36BCor6A100KWYqsDIOOwqFvy_6fEhALSJUXMrxhDroWLQULDcMK9bs2Rtfp-LLtuG-f0zGL-LJMHO8xg-lors9GFuaDHwgkTaVHIKdh98UURiDKBtVGMAmS2NdGxiAVklz44qp-XI7lTHhPVZYffRqERCzcELCjm1mdJFRTTk2v7dxOu1-LcU596KURX0_WwOOQHEMBV9VJ',
      gridClass: 'md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento'
    },
    {
      id: 2,
      category: 'Student Activities',
      tag: 'Student Life',
      title: 'Collaborative Learning',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJB3y_1_UaeDbaFZAY04wdWcyyrfzeBAFamQYXevzao9IqjWz2IRlFCgFRWT1jdoBwcPKUwPVO9MYNNy3Zer02aHTM9vCCWmuVKsZi1OwOIZpZGYxMQ6YAO_SxJUBL0YiXzNFVanDAmcMq4w1I8Zk2WOHYyHRNo5giOkp9xVIU6ITTmVtuF8sHZ8grE67dYauSPeZpFOUs0gW_g6WOcFhQVZ7GUBItKBE-COzfFa-Y69mTscys3_FLrVas9xTolo47Yj2v3eS6EZ8j',
      gridClass: 'md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento'
    },
    {
      id: 3,
      category: 'Events & Seminars',
      tag: 'Events',
      title: 'Tech Workshops',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQFvOdE3Fp8cijtuJr5ZTQSHjSz97MDR8JFs2v8uOLqpXkmIVom6RbPcQC0eM8Tp_7qD8ocMmoIhkFuxKOiumtT6g8Vb6nm-0dw5b8_FGToez7HjAYGOf0I4OVHKfasV878sQ021t-4YSjAUkCx1TkFFve9UTg8nsqHxHgAjrqVani1hcwVsXga_InaEZEwSnEvpIT56jHF2BO0OoPmoNfFRtSs3HdNo1gGurqD7Ed8cszEBGhHcQM41UUoWhrbkEq-OUTkQCqH7U8',
      gridClass: 'md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall'
    },
    {
      id: 4,
      category: 'Student Activities',
      tag: 'Achievements',
      title: 'Graduation Day',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ubxcetqj5XX5Cd56QJN-BB5touB3Tr7cw6YNc8hwdcJZmZleWzrgjpDj0yrCszhhNxGPJQjjFN5hoRbMcZZPR2kKC7wuHS6pcStGy1W0i1HyD-pGSUZt4rlhzdmHzM5naQoPsRJjiFjyM2_xNXGOAzwEFmw23_AF1wszSIGg4IifSk6gKOBHIAXNtjE5Hy93skvSXfqKeyWG00ou3XPebQ5Ot9pf71QCMy3IXtsduDmAD1pTF3Ym_PZ07vFl-E-6_nKehhds2cSG',
      gridClass: 'group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-square'
    },
    {
      id: 5,
      category: 'Computer Lab',
      tag: 'Facilities',
      title: 'Cloud Infrastructure',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD458iYFc2QGYz1IgG1MkGoii3E_lGIsDYbf9hRutuO9nSBD4uctMr9l8vkVA6TKMS-xMplPFMlrFniEFvP8gwwU--oZWr03Zd4a-V5NKLU0T6Qxo4NO709SklujezlUhQ_pKu0hBDK_1iugNO-QneJhfdw9R9DUdJOXivDm_LLStuxSX3MQfuUldacpjIO2u5DEBchQtNBd9BaY7lgPN7YtmhUCGnmeo3uh-sCooYmYwgoI29jNG6A2rveJEEy0p-gpMssgjFFfPsT',
      gridClass: 'group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-square'
    },
    {
      id: 6,
      category: 'Computer Lab',
      tag: 'Resources',
      title: 'Digital Resource Center',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6nvveYSIwmeAOGYw3T9KQSt0om2fp-g3C2YBP3VmiUx5KPihZiKxVkMA_1BgaiuJmTedfTC0qun4ZtQEUCrVw4nPygRSvH6A6eJWi8BTO1YHF_miHA2379GINdmpe5DpPScWTjWsLa4qiLtA3FaOpeKAF6cawdwK8oLxmBsC7rLHqEThlBTPjtZgDNBL2SBgiOdPubbvnH5U0t6H539ZCvq4RDCsKOR3war5FlExAnUbxYrurWoxB1UTmCV9UfgLVhvMFTaxn6f5',
      gridClass: 'md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall'
    },
    {
      id: 7,
      category: 'Events & Seminars',
      tag: 'Campus',
      title: 'Our Modern Campus',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMeHB3qYGRQLYojIgr6Pn0wq84wQVjkgd7Nzk7BWHo5tm9sMfdp7Ak4-PTB7dKKDpL8oW6xlFUc-g-uTICdwRDvgpNz3lSETjRwXdLXHGb-_9ptgwfMMJqaUN6dNf1gBfRyZHKDViQV6az7Y7Rjo59XOAEYTDOytdsBYcxpn3_Dl37WDDO0cY_2FLOsM4m7stjN8NeUvDqjddzvWc49uUv9mVTBwheLvkx364gAMzNkdseJPS7NBN7xIXbPMLEydSJ4YSC3y3-qgIJ',
      gridClass: 'md:col-span-12 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 h-64'
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg pb-stack-lg">
      <header className="mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl mb-stack-sm text-primary">Academy Gallery</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Witness the excellence of Laxmi Computer Education through our state-of-the-art facilities, vibrant campus life, and successful milestones.</p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-stack-sm mb-stack-lg">
        {['All Photos', 'Computer Lab', 'Student Activities', 'Events & Seminars'].map(cat => (
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

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {galleryItems.map((item) => {
          const isVisible = selectedCategory === 'All Photos' || item.category === selectedCategory;
          if (!isVisible) return null;

          // Special rendering for graduation and server card block that sit inside col-span-4 flex flex-col
          // To keep bento intact under direct mapping, let's render them as normal elements, or keep exact layout structure.
          // Wait! The grid has direct items 1, 2, 3, (4 and 5 nested inside a flex column), 6, 7.
          // Let's look at the original code structure:
          // Item 1: md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento
          // Item 2: md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento
          // Item 3: md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall
          // Item 4 & 5 container: md:col-span-4 flex flex-col gap-gutter
          // Item 6: md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall
          // Item 7: md:col-span-12 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 h-64
          // To guarantee that the grid doesn't break, let's write out the HTML exactly as it is, and apply simple React opacity/display filter to keep the DOM structure absolutely identical!
          return null; 
        })}

        {/* Item 1 */}
        <div 
          className="md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Computer Lab' ? 'block' : 'none' }}
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKcYu74odn4ut88Prz3qCCwZa8mF8QmSLxD9tqgmcJcCKE7TTsHYr44_iseNdSuJ5O36BCor6A100KWYqsDIOOwqFvy_6fEhALSJUXMrxhDroWLQULDcMK9bs2Rtfp-LLtuG-f0zGL-LJMHO8xg-lors9GFuaDHwgkTaVHIKdh98UURiDKBtVGMAmS2NdGxiAVklz44qp-XI7lTHhPVZYffRqERCzcELCjm1mdJFRTTk2v7dxOu1-LcU596KURX0_WwOOQHEMBV9VJ" 
            alt="Advanced Computer Lab"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-lg">
            <span className="text-white font-label-sm uppercase tracking-wider mb-2">Facilities</span>
            <h3 className="text-white font-headline-sm">Advanced Computer Lab</h3>
          </div>
        </div>

        {/* Item 2 */}
        <div 
          className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Student Activities' ? 'block' : 'none' }}
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJB3y_1_UaeDbaFZAY04wdWcyyrfzeBAFamQYXevzao9IqjWz2IRlFCgFRWT1jdoBwcPKUwPVO9MYNNy3Zer02aHTM9vCCWmuVKsZi1OwOIZpZGYxMQ6YAO_SxJUBL0YiXzNFVanDAmcMq4w1I8Zk2WOHYyHRNo5giOkp9xVIU6ITTmVtuF8sHZ8grE67dYauSPeZpFOUs0gW_g6WOcFhQVZ7GUBItKBE-COzfFa-Y69mTscys3_FLrVas9xTolo47Yj2v3eS6EZ8j" 
            alt="Collaborative Learning"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-lg">
            <span className="text-white font-label-sm uppercase tracking-wider mb-2">Student Life</span>
            <h3 className="text-white font-headline-sm">Collaborative Learning</h3>
          </div>
        </div>

        {/* Item 3 */}
        <div 
          className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Events & Seminars' ? 'block' : 'none' }}
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQFvOdE3Fp8cijtuJr5ZTQSHjSz97MDR8JFs2v8uOLqpXkmIVom6RbPcQC0eM8Tp_7qD8ocMmoIhkFuxKOiumtT6g8Vb6nm-0dw5b8_FGToez7HjAYGOf0I4OVHKfasV878sQ021t-4YSjAUkCx1TkFFve9UTg8nsqHxHgAjrqVani1hcwVsXga_InaEZEwSnEvpIT56jHF2BO0OoPmoNfFRtSs3HdNo1gGurqD7Ed8cszEBGhHcQM41UUoWhrbkEq-OUTkQCqH7U8" 
            alt="Tech Workshops"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-lg">
            <span className="text-white font-label-sm uppercase tracking-wider mb-2">Events</span>
            <h3 className="text-white font-headline-sm">Tech Workshops</h3>
          </div>
        </div>

        {/* Item 4 & 5 Column Container */}
        <div 
          className="md:col-span-4 flex flex-col gap-gutter"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Student Activities' || selectedCategory === 'Computer Lab' ? 'flex' : 'none' }}
        >
          {/* Item 4 */}
          <div 
            className="group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-square"
            style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Student Activities' ? 'block' : 'none' }}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ubxcetqj5XX5Cd56QJN-BB5touB3Tr7cw6YNc8hwdcJZmZleWzrgjpDj0yrCszhhNxGPJQjjFN5hoRbMcZZPR2kKC7wuHS6pcStGy1W0i1HyD-pGSUZt4rlhzdmHzM5naQoPsRJjiFjyM2_xNXGOAzwEFmw23_AF1wszSIGg4IifSk6gKOBHIAXNtjE5Hy93skvSXfqKeyWG00ou3XPebQ5Ot9pf71QCMy3IXtsduDmAD1pTF3Ym_PZ07vFl-E-6_nKehhds2cSG" 
              alt="Graduation Day"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-md">
              <h3 className="text-white font-headline-sm">Graduation Day</h3>
            </div>
          </div>

          {/* Item 5 */}
          <div 
            className="group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-square"
            style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Computer Lab' ? 'block' : 'none' }}
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD458iYFc2QGYz1IgG1MkGoii3E_lGIsDYbf9hRutuO9nSBD4uctMr9l8vkVA6TKMS-xMplPFMlrFniEFvP8gwwU--oZWr03Zd4a-V5NKLU0T6Qxo4NO709SklujezlUhQ_pKu0hBDK_1iugNO-QneJhfdw9R9DUdJOXivDm_LLStuxSX3MQfuUldacpjIO2u5DEBchQtNBd9BaY7lgPN7YtmhUCGnmeo3uh-sCooYmYwgoI29jNG6A2rveJEEy0p-gpMssgjFFfPsT" 
              alt="Cloud Infrastructure"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-md">
              <h3 className="text-white font-headline-sm">Cloud Infrastructure</h3>
            </div>
          </div>
        </div>

        {/* Item 6 */}
        <div 
          className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 aspect-bento-tall"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Computer Lab' ? 'block' : 'none' }}
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp6nvveYSIwmeAOGYw3T9KQSt0om2fp-g3C2YBP3VmiUx5KPihZiKxVkMA_1BgaiuJmTedfTC0qun4ZtQEUCrVw4nPygRSvH6A6eJWi8BTO1YHF_miHA2379GINdmpe5DpPScWTjWsLa4qiLtA3FaOpeKAF6cawdwK8oLxmBsC7rLHqEThlBTPjtZgDNBL2SBgiOdPubbvnH5U0t6H539ZCvq4RDCsKOR3war5FlExAnUbxYrurWoxB1UTmCV9UfgLVhvMFTaxn6f5" 
            alt="Digital Resource Center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-stack-lg">
            <span className="text-white font-label-sm uppercase tracking-wider mb-2">Resources</span>
            <h3 className="text-white font-headline-sm">Digital Resource Center</h3>
          </div>
        </div>

        {/* Item 7 */}
        <div 
          className="md:col-span-12 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 h-64"
          style={{ display: selectedCategory === 'All Photos' || selectedCategory === 'Events & Seminars' ? 'block' : 'none' }}
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMeHB3qYGRQLYojIgr6Pn0wq84wQVjkgd7Nzk7BWHo5tm9sMfdp7Ak4-PTB7dKKDpL8oW6xlFUc-g-uTICdwRDvgpNz3lSETjRwXdLXHGb-_9ptgwfMMJqaUN6dNf1gBfRyZHKDViQV6az7Y7Rjo59XOAEYTDOytdsBYcxpn3_Dl37WDDO0cY_2FLOsM4m7stjN8NeUvDqjddzvWc49uUv9mVTBwheLvkx364gAMzNkdseJPS7NBN7xIXbPMLEydSJ4YSC3y3-qgIJ" 
            alt="Our Modern Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-container/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
            <h3 className="text-white font-headline-lg text-center">Our Modern Campus</h3>
            <p className="text-white/80 font-body-md">Empowering your future with world-class facilities</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gallery;
