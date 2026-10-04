/**
 * Comprehensive Rich Fake / Demo Data for all Public Pages
 * Ensures pages look completely full, vibrant, professional, and functional
 * even if MongoDB is loading, restarting, or has limited initial records.
 */

export const mockCourses = [
  {
    _id: 'mock-course-1',
    title: 'DCA - Diploma in Computer Applications',
    category: 'Diploma',
    duration: '6 Months',
    price: 4500,
    mode: 'offline',
    featured: true,
    rating: 4.9,
    studentsCount: '1,420+',
    instructor: 'Prof. Rajesh Kumar',
    description: 'Master operating systems, MS Office suite (Word, Excel, PowerPoint), fundamentals of database management, internet tools, and multimedia design for government and corporate careers.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv'
  },
  {
    _id: 'mock-course-2',
    title: 'Tally Prime with GST & e-Filing',
    category: 'Accounting',
    duration: '3 Months',
    price: 3500,
    mode: 'offline',
    featured: true,
    rating: 4.95,
    studentsCount: '2,150+',
    instructor: 'CA Vikram Singhania',
    description: 'Hands-on training in computerized accounting, inventory management, purchase/sales orders, GST billing, TDS calculations, balance sheet finalization, and online return filing.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4N6840n2rJ_g2OGE2yxQtT_Y8jT7zMTTW3HCvm6LsOz2xcxStrwy95KONuYtGupeH5-vFQtvLRr_BZawHcrwToaohB5cxJhQxnuWKHIjwHGBXE3Pe-jCBahTF939u_ym_tI5XSRTEvu2L3VWqQRDMDVYoiELIa-ilpN4wNHAzD2PMdLSKg4x6mH0wcZ5gxHNJOz9UrOLOtq0-J0-1MGs-dwX9JB1hwlxR6fPmq_HTCDmaFK1CnjU9o26nZxC0m4FvgJWTgVbm5Th9'
  },
  {
    _id: 'mock-course-3',
    title: 'Full Stack Web Development (MERN)',
    category: 'Coding',
    duration: '6 Months',
    price: 9500,
    mode: 'hybrid',
    featured: true,
    rating: 4.98,
    studentsCount: '890+',
    instructor: 'Dr. Sarah Jenkins',
    description: 'Build full-fledged responsive cloud applications using MongoDB, Express.js, React, Node.js, Tailwind CSS, REST APIs, Git/GitHub, and cloud deployment on Vercel & AWS.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfVGQrnBDkybLOGtMG50XoM9-n_v-XAFJ7be_7vkWH_xaULvMLilfoFS-jEzAGGJ41M3cUcEcGxnA-ZyUo115yHSTuQP8Z6N8kFql7ZVxnAdY99iWA7sZyLzyNVvdo6a26jVl113mzpmF6DKBnngMAoiA8NsVjKXh_sTS3Bfd7hlym9GTKhybKW2S8jLJmfpje3qxudWz2gKAud9lS7BKNWVh7gLDogDUQ2lNOAY_TzmI0RbOcXpwvbogz6ap22kplXMFLJHO34EF'
  },
  {
    _id: 'mock-course-4',
    title: 'PGDCA - Post Graduate Diploma in Computer Applications',
    category: 'Diploma',
    duration: '1 Year',
    price: 8500,
    mode: 'offline',
    featured: true,
    rating: 4.88,
    studentsCount: '1,100+',
    instructor: 'Prof. Rajesh Kumar',
    description: 'University recognized postgraduate program covering advanced software engineering, RDBMS, C/C++ programming, Web Design, System Analysis, and IT Management.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH'
  },
  {
    _id: 'mock-course-5',
    title: 'Python for AI, ML & Data Science',
    category: 'Coding',
    duration: '4 Months',
    price: 6500,
    mode: 'online',
    featured: true,
    rating: 4.92,
    studentsCount: '780+',
    instructor: 'Mark Thompson',
    description: 'Learn modern Python programming, NumPy, Pandas, Matplotlib, Data Wrangling, Scikit-Learn machine learning algorithms, and real-world predictive AI model development.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4B5JSt0obMgRkJSOgn8DdvNti21k1BPEZr9bBZfuP01ynKC5n78E-E2YGotmR2wf5SSCA04sv7HW13_pHyndsBHUfZ8LVgp7SjcL3D24U3A1yugFbPSHNOi881yEhcMBgbZPi9SqP6ZXLMeC1gYVzy4KxgrPnzMROYFVcLmE51Q3zZaGfVQTyfFZZRySRPxVpsBdtAOjUVBESjrDbNJFIbPP21VycZ0V2oC7sK9A81pdxyFV7K30vjgK52_z0Nod-TO_60HKANRFo'
  },
  {
    _id: 'mock-course-6',
    title: 'UI/UX Design & Figma Prototyping',
    category: 'Coding',
    duration: '3 Months',
    price: 5000,
    mode: 'hybrid',
    featured: true,
    rating: 4.94,
    studentsCount: '640+',
    instructor: 'Elena Rodriguez',
    description: 'User research, wireframing, interactive Figma component systems, micro-interactions, responsive web/app layouts, and building an industry-ready Behance/Dribbble portfolio.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1p8Xh5w8U1EPtXjRDESJKLp-uXzyOe_p700AkPDkunZ1J5eF_N8_vGsd3kpa_Ylfjq-4ErweP07oasEYmaMWeJ6s3Mctclxwobdv1iSpwhlHQ64YctbAYENfYKoICMXFalkmjYuv7YBuHnbQwolpP3pPrz-MBkLZy-5zgXYKMliN290sDrZ1ZejNXZ17Kaebw6YYnWiDzJyidM4P5V9l0KXfZaTtIdgq3F06gP00k066ZdQ_eijNtkJQyhrZlyhajvUblavEg93'
  },
  {
    _id: 'mock-course-7',
    title: 'Basic Computer & Digital Literacy',
    category: 'Diploma',
    duration: '2 Months',
    price: 1800,
    mode: 'offline',
    featured: false,
    rating: 4.85,
    studentsCount: '3,200+',
    instructor: 'Priya Kapoor',
    description: 'Fundamental computer training covering Windows 11, hardware basics, email etiquette, safe web browsing, online government portals, and essential keyboard typing skills.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi'
  },
  {
    _id: 'mock-course-8',
    title: 'Advanced MS Excel & MIS Reporting',
    category: 'Accounting',
    duration: '2 Months',
    price: 2200,
    mode: 'offline',
    featured: false,
    rating: 4.96,
    studentsCount: '1,850+',
    instructor: 'Priya Kapoor',
    description: 'Master advanced formulas (XLOOKUP, INDEX/MATCH, Dynamic Arrays), Pivot Tables, Slicers, interactive Executive Dashboards, Power Query data cleaning, and Macro automation.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQkfNwHzVgVZGL87EPlILWV8y-gt9Fnxt_FBO3IlBv9kLzKjt1dP-VXC1kds4HCO8QMaTC3NoHKysTHgUSDuGCUDhqAd9hlbfB-owfx8qbsYWCUsK1amuFnTRAujozXSzwNZKh2VD57dnxkWn2dl12zJ0dbK8c93Vqj5lbd6JsWBlXG_IgnaGv5TAu5HO3el9P9843YNruF6Y13KBLDBaAFFVzdINZGRiDnbt91lJeqWPw08knLf72RhdOolcPKERcrip2aTw-ITU'
  },
  {
    _id: 'mock-course-9',
    title: 'Cyber Security & Ethical Hacking',
    category: 'Coding',
    duration: '4 Months',
    price: 7500,
    mode: 'hybrid',
    featured: false,
    rating: 4.91,
    studentsCount: '450+',
    instructor: 'Ananya Sharma',
    description: 'Network security fundamentals, Linux administration, vulnerability assessment, penetration testing tools (Wireshark, Nmap, Metasploit), and cyber threat intelligence.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_xQJTyXrEjQ1WHVyfWl4w98R4BFC9KrOhUWZTuAM0bKaPbhbhhXgNZnhLX0D-HN6tJZUhchw_YswpuPj9fpzq9D-uNV9cK_oGuKzm7-kJhQjRMoCBUgKbitevPDiA3maV4TMWQ_7RjfJJXUUHJFb0LAeaxT0YOpR0D9Yi726jVBTrQtGZudM3z_lxvOB3-XU-uzosLZjXSKzQpLz2G-Vfz7sXGEJm5RmhztOg3b52x7s2P5WfEjKhfwWCmeugq19kCC8AXCz6MbXZ'
  },
  {
    _id: 'mock-course-10',
    title: 'English & Hindi Speed Typing Master',
    category: 'Diploma',
    duration: '2-3 Months',
    price: 1500,
    mode: 'offline',
    featured: false,
    rating: 4.88,
    studentsCount: '2,900+',
    instructor: 'Prof. Rajesh Kumar',
    description: 'Scientific touch-typing methods to achieve 40+ WPM with 95%+ accuracy for government exam qualifications (SSC, High Court, Clerk, PSSSB) and administrative jobs.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABo02Mx8fb3_Xmig4RV-OEI7MPyzPN9roi4sTvzk5GVH6x8S4x7B3dpujrSj31_c0pDxLUBIvpN1zKUCYbNFFmsC_4y41A4vnaMJKtxyCMJUsAWtMpyrD60C6qUFAi9EYI0NyAIGlmdQxi6R7HK1_Pw9lHnk583m09nwY3Yxxgr0sFsLZZcPCOrzYgvAzjSZXhXmz_bXiJJJbv7PdAMNdxpHOFq7YqL24z0t0cbMVpGjXB4E7ahJ-2GegjNwognIL4oifdEiC1H34L'
  },
  {
    _id: 'mock-course-11',
    title: 'Digital Marketing & Social Media Growth',
    category: 'Coding',
    duration: '3 Months',
    price: 4800,
    mode: 'online',
    featured: false,
    rating: 4.87,
    studentsCount: '580+',
    instructor: 'Rahul Verma',
    description: 'Search Engine Optimization (SEO), Google Search & Display Ads, Meta Ads Manager, Content Marketing, Email automation, and Google Analytics conversion tracking.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1p8Xh5w8U1EPtXjRDESJKLp-uXzyOe_p700AkPDkunZ1J5eF_N8_vGsd3kpa_Ylfjq-4ErweP07oasEYmaMWeJ6s3Mctclxwobdv1iSpwhlHQ64YctbAYENfYKoICMXFalkmjYuv7YBuHnbQwolpP3pPrz-MBkLZy-5zgXYKMliN290sDrZ1ZejNXZ17Kaebw6YYnWiDzJyidM4P5V9l0KXfZaTtIdgq3F06gP00k066ZdQ_eijNtkJQyhrZlyhajvUblavEg93'
  },
  {
    _id: 'mock-course-12',
    title: 'Core Java & Data Structures Algorithms',
    category: 'Coding',
    duration: '4 Months',
    price: 5500,
    mode: 'offline',
    featured: false,
    rating: 4.93,
    studentsCount: '720+',
    instructor: 'Dr. Sarah Jenkins',
    description: 'Object-Oriented Programming (OOP), Collections Framework, Multithreading, Exception Handling, Recursion, Trees, Graphs, and competitive problem-solving on LeetCode.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ'
  }
];

export const mockFaculty = [
  {
    _id: 'mock-faculty-1',
    name: 'Dr. Sarah Jenkins',
    subject: 'Full Stack Web Development & Cloud',
    qualification: 'MCA, Ph.D. in Computer Science',
    experience: '12 Years',
    bio: 'Lead Full Stack Architect and author. Dr. Jenkins specializes in MERN stack microservices, cloud deployments, and enterprise React workflows with 12+ years of guiding students to global tech placements.',
    email: 'sarah.jenkins@laxmi.com',
    phone: '+91 98765 43211',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-2',
    name: 'Prof. Rajesh Kumar',
    subject: 'Diploma in Computer Applications & Software Engg',
    qualification: 'M.Tech (CSE), MCA, B.Sc (Maths)',
    experience: '15 Years',
    bio: 'Founding academic mentor at Laxmi Computer Education. Prof. Rajesh has trained over 6,000 students in DCA, PGDCA, C/C++, and database systems with unmatched clarity and patient dedication.',
    email: 'rajesh.kumar@laxmi.com',
    phone: '+91 98765 43210',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Gh2GzZoAqcDBJAkfriIGdM0VgXE_pAbhIVKtIqXHgBDTr5hm7zj1TqKZTRFPTfKTGWANQgFpEBey4ZwHwcmoY9jebsly5YVXlUHTEoArN_up6rhSTbgvWUHrD_GPIIDUaImEh76CvrzQLBA-nWQTUuckdl232GvtaJktxMxKymG3jrJ_CfQfbhP_FXcQ2KRAk31m-Vq7YTma12OXkhGXnbXU-DkPAE5nrmAibofkHrWj6wKwv5fm1EONM02vYvLUHaB42YoD91Av',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-3',
    name: 'CA Vikram Singhania',
    subject: 'Tally Prime, GST Taxation & E-Way Billing',
    qualification: 'FCA, M.Com, Certified Tally Professional',
    experience: '10 Years',
    bio: 'Practicing Chartered Accountant and financial instructor. Vikram demystifies corporate taxation, GST audits, inventory reconciliation, and financial balance sheet management with live client books.',
    email: 'vikram.singhania@laxmi.com',
    phone: '+91 98765 43214',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRRMHvhfG9ZBiY-9hTf8eOKFUXF6l2MYXfsA9l9C6l5fX9K4R7Zcps9QQmfcVU-WgdB2L2RTLkezTxhGCnxWblgmIFANVnQLJJICfHNJuSCH7Uo_sOK02Ijbpyy-1C2jYi5bCU_WAoHhI5-bmE6-aVrB29D5F_4tJZVvYpy9O5hjQyNQ-G_fJGfKGEHe7QbGowmmCCp-220KdVZZ7haXB68pl67K-DxqAyfmnbp4u4CRECIejOEllaefbmHz8E2Eiy9k0Xq0sf_mv',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-4',
    name: 'Mark Thompson',
    subject: 'Python, Data Analytics & Artificial Intelligence',
    qualification: 'M.Sc. in Statistics & Data Science',
    experience: '8 Years',
    bio: 'Former data consultant at multinational IT corporations. Mark specializes in practical Python programming, automated web scraping, data modeling, and machine learning pipelines.',
    email: 'mark.t@laxmi.com',
    phone: '+91 98765 43212',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCPsXZ6JwFWuVueUldHpWIO_8epWmYNAOTTM5wa6S_LG__Xwsms-Meq_guYhiGtlGHQ6lNRcU_5oD6KFlCWzKNpq08RuS3HguzvFNOLmE73tBo9Vgmi1pIyg5PhYYQVsxJxb-dEizVfYvVHBTwA8w78-IBvlTFUHYcvB7_cSAWMT_7MjtrxK-vVeq4oFEL3EoHHtMVFDq0rC2G_DNAb26x4zzwFmIIVF0z2qQkTihrpeAxeBCUAEUVS-hoCtdfZ7u4FW2eE-MuUKwP',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-5',
    name: 'Elena Rodriguez',
    subject: 'UI/UX Design, Figma & Design Systems',
    qualification: 'BFA in Interactive Media & Visual Systems',
    experience: '6 Years',
    bio: 'Creative director and product designer. Elena teaches user psychology, interactive prototyping, accessibility standards, and visual brand identity systems.',
    email: 'elena.r@laxmi.com',
    phone: '+91 98765 43213',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7pePi1rnWbPKD25SfoQGYU04C-sE4mXqijIJS-0htGqZ2NcMmgNmVmrl0V8OHOih7pYo7zuL3SFttVnNBMQuw1SDmuUVLy_NItm2Toe8gjk-bPVzjtyg2_7wvvPvh5JWL4iEqovIHksZ2M5KJBX5dxF_4OOlmKLVAAcgKeJ5a0ThV8gVdYScC-cMt3EPVBfR7LP7TRmcC_ZX-mvDZnhR-n9OjyQNJDmAl4wBxkB2eRSFSkO9Y-ASaPNwBgIMT37HvtJ4E4vOHQ6nd',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-6',
    name: 'Ananya Sharma',
    subject: 'Cyber Security, Ethical Hacking & Linux Admin',
    qualification: 'B.Tech (IT), Certified Ethical Hacker (CEH)',
    experience: '7 Years',
    bio: 'Security researcher and forensic auditor. Ananya conducts defensive programming workshops, ethical penetration labs, and Linux administration masterclasses.',
    email: 'ananya.sharma@laxmi.com',
    phone: '+91 98765 43215',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3j812z3y2QdcdfhKmpVvPpvb0pgv6EHPScLLt003Yzcet_nLhqGTBIC_v0Fk9011RDHVmJOMyL-dEcdHev4IgGWOZgmrm8nHTxhrePqMp__gbmZ9lB-bEOleYMp8lFkNkrQTq3-2ztS0lrv3Qr61zGiERaGP87DCEnBH5eTvZ2wQJanrdXCR_nf6WtBkg1KA-wCbOgO-mupc3vCJQjGbNXPxxJUvXuwzlMNezuDb4O_FK4IwxHlo30jTN5wdXJMmDc4eDVdYhAmsE',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-7',
    name: 'Priya Kapoor',
    subject: 'Advanced Excel, MIS & Office Automation',
    qualification: 'M.Sc (IT), Microsoft Office Specialist (MOS)',
    experience: '8 Years',
    bio: 'Corporate productivity trainer with expertise in Power Query, complex analytics dashboards, VBA macros, and automated financial reporting spreadsheets.',
    email: 'priya.kapoor@laxmi.com',
    phone: '+91 98765 43216',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    },
    status: true
  },
  {
    _id: 'mock-faculty-8',
    name: 'Rahul Verma',
    subject: 'Digital Marketing, SEO & Ads Strategy',
    qualification: 'MBA (Marketing), Google Certified Professional',
    experience: '6 Years',
    bio: 'Growth marketing specialist who has managed over 50+ commercial marketing campaigns across search, social media, and programmatic performance advertising.',
    email: 'rahul.verma@laxmi.com',
    phone: '+91 98765 43217',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHQwyplE8esTKElf9LejsdlFmeSmSU4FsvTUfsvHANlI5cVDZvVPZGS900zQK3WdrIsTHCJpukkW_6pWseBdjurncARv4o5RlGsZEv1hbOwIsgf3AV8f6rPhFL-y8Q8WncvaLgeypsRrcFLo0mmOKBCQyb93AIL85iP02jmn-un0dXq6C5tEqmHnrb3Kg-0gO7v2l8xi2HMPK1oFPRiYtAkoEvOZaYupyh6W3lmlWxCQycS83kijTUHU21cqEZQKfePye8gyS26ifO',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    status: true
  }
];

export const mockGalleryAlbums = [
  { _id: 'alb-1', name: 'Computer Labs' },
  { _id: 'alb-2', name: 'Workshops & Events' },
  { _id: 'alb-3', name: 'Campus Life' },
  { _id: 'alb-4', name: 'Sports & Cultural Meet' },
  { _id: 'alb-5', name: 'Annual Convocation' }
];

export const mockGalleryItems = [
  {
    _id: 'mock-gal-1',
    albumId: 'alb-1',
    category: 'Computer Labs',
    title: 'High-Tech Computer Lab Workstations',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ'
  },
  {
    _id: 'mock-gal-2',
    albumId: 'alb-2',
    category: 'Workshops & Events',
    title: 'Web Dev & Hackathon 2024 Coding Sprint',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTic1EKcXTeKNPywy9-CUDGH9vtqzkRiBM_cNSNFEXnO3NUDxI453Gk50gqGVr2Rnxi_FJfBZatPmpBYu-FQLIRPcfktuoVc2_S-53CsVZRTjRife5KohovQVBlSpxJfKwO0rflJ_lO7opgiUTzrN1przo70s1qkmlRXmvQ3me0-iAMXHDKZLGffmk_ecFieUGf3X-m-r4t5A9Fd3p27lZBuQ1LQMt3IFDxntnvuQMcVCZR1XY-Dgs4funetXQU167ne6S9Zdmq2yS'
  },
  {
    _id: 'mock-gal-3',
    albumId: 'alb-3',
    category: 'Campus Life',
    title: 'Modern Institute Architecture & Reception',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwNtdsE8Lgdnwc5CX8zQkXO_D066ZLrPdlpE7fd4iDbQl1jfHiIWKh6o9GAjQKrRoCm5UQ_rHFCdHwW-UijrIjIi6-1VLAlkReDelfdz1ErGwTNjRTl-Gtxa3G22nSP-XcvpSCKmZJzSjZf47PHLAO1nz0wfgai_YAWSbgZMRL_ZgETacH3U14gc1K4Ds2bzxihpLd4A367EuFnDKWVkISCgftnXPvhcOQ0V_z8oCOtpdYEDVFVfnyg_448U6qW249Bax_B5BxleYx'
  },
  {
    _id: 'mock-gal-4',
    albumId: 'alb-1',
    category: 'Computer Labs',
    title: 'Hands-on Tally & Programming Practical Session',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaeu7QaF04mrnv8jVsTT7ssLZkNsz55FUDVQqvLGt95rmlFwPli8ksoZVGWinuchYLSbDALnQRrGSlkabnUfyQhhdTNm341lt-ZncfQvisnvLz2lVHviwedC-e_GFgMrfdeqWSxaHIxDv8sa1ii9kRTJczCfD0EfakuQLGV11F9GTAGdX3PiBAWTJk5Joh3sl7LblttYPHHeMJw3hs2ICU9ZoWYBHvYXnsgCOSPuNMvL8cvDYjnyT1CYS-Pwoml15N1TlkLvJM6EPN'
  },
  {
    _id: 'mock-gal-5',
    albumId: 'alb-4',
    category: 'Sports & Cultural Meet',
    title: 'Annual Sports Festival & Athletics Meet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi'
  },
  {
    _id: 'mock-gal-6',
    albumId: 'alb-5',
    category: 'Annual Convocation',
    title: 'Convocation Day - Degree & Diploma Distribution',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy4_CjFlv8KSWSCCD_QvJJnmdFMwJN6tWBey21_5ihaPi8ox5Id9lSiDm2pi5iPxQkhFihQhlyBDES5qseS9pukGtt-OrCUlXE47qrvf8DGiCId3PCMaA1A4DZ53pVj6pzPQd_MBJn1yGd3sEQFCcGstOhlK54qLEoG_MT6PHlYNDkP0Iy6FOW_oABEgDJ9XiSEmTuAjh9MSmyA0dgs1td08aVkeuqQ-s0h82ErfFJkfDOMEpxdhoZVlzpuqpXupQB3FCvExlRHQ9Z'
  },
  {
    _id: 'mock-gal-7',
    albumId: 'alb-2',
    category: 'Workshops & Events',
    title: 'Artificial Intelligence & Career Guidance Seminar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4B5JSt0obMgRkJSOgn8DdvNti21k1BPEZr9bBZfuP01ynKC5n78E-E2YGotmR2wf5SSCA04sv7HW13_pHyndsBHUfZ8LVgp7SjcL3D24U3A1yugFbPSHNOi881yEhcMBgbZPi9SqP6ZXLMeC1gYVzy4KxgrPnzMROYFVcLmE51Q3zZaGfVQTyfFZZRySRPxVpsBdtAOjUVBESjrDbNJFIbPP21VycZ0V2oC7sK9A81pdxyFV7K30vjgK52_z0Nod-TO_60HKANRFo'
  },
  {
    _id: 'mock-gal-8',
    albumId: 'alb-3',
    category: 'Campus Life',
    title: 'Student Discussion Room & Collaborative Projects',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1NlLFSByKP9KeLzOpng4EM19MqIx93MKM_xA19J_KpY7cFGfBrvQPsLthsFrbzOHyPAJ-rhraBdeFwk58zw6TEYIQ2gLu9nf3pMlAITAuFtOl3kunrUZkw5GxeoviP7tix4lx3bcJ6q-8p3wenGSPO6Ci66sUWRPl99QG3ef66uJ3Z5Bhc4b4-DO0pHgdCVlSGRkRKpTR39AJKg2ROqXdX-Gh99H0PotP1F53u31VDhYo_4_C9Evf0n3Jf_7Ya4Iz_vf2KK4u4h_F'
  },
  {
    _id: 'mock-gal-9',
    albumId: 'alb-1',
    category: 'Computer Labs',
    title: 'Software Development & Testing Terminal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1p8Xh5w8U1EPtXjRDESJKLp-uXzyOe_p700AkPDkunZ1J5eF_N8_vGsd3kpa_Ylfjq-4ErweP07oasEYmaMWeJ6s3Mctclxwobdv1iSpwhlHQ64YctbAYENfYKoICMXFalkmjYuv7YBuHnbQwolpP3pPrz-MBkLZy-5zgXYKMliN290sDrZ1ZejNXZ17Kaebw6YYnWiDzJyidM4P5V9l0KXfZaTtIdgq3F06gP00k066ZdQ_eijNtkJQyhrZlyhajvUblavEg93'
  },
  {
    _id: 'mock-gal-10',
    albumId: 'alb-5',
    category: 'Annual Convocation',
    title: 'Certificate Award Ceremony with Academic Dignitaries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPH414X8hqqdwLkKMVftpQxSDSWxO5oAZQTUf73XqRiu41uCQVrs_xkeZxgQun9WRqlLTgd5eaWfr6OcUrHl-2xF9EJb3UWhdfAR4zhbQxRxMBteuqTldVWK5-oyvUzTs36D3NTgSAcYDienv7u5e61xYA4aY9DxtqW0k4liNGZvwe5GaEYu_cCIOjBHhtJr4dGznzZDrbpAdtSlYHjoxVaRmi2nWfVTMj6rQ3tp6DYsQvWD-mhfdQ41_p4eYUduuqtY6e_zBcOokA'
  },
  {
    _id: 'mock-gal-11',
    albumId: 'alb-2',
    category: 'Workshops & Events',
    title: 'Industry Guest Lecture on Cloud Architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXXx3sVVS3z9Fy73EbePMflCNCEHKwQC_izq_90WBD565HBXaKpAdbVCjYecKD8ADi0T5RiKzmLB7BUcUlMz2l9s4Q57fAtmNfbPSsLykqN1tDK0SX6GLoZm0Qn3gpyn70_Js-yu_kxmM4AZ0m_7tUFHSE9wvyZLpDmbrmN4sptihTSo78vvSTigbmatf11tMjsznDGFaPl2yU6ZgJy-5ngVooATzABFRxsET-w_34RvwQju9fVI1n4IRYWLvt8BbwdH8n8tSSxZLp'
  },
  {
    _id: 'mock-gal-12',
    albumId: 'alb-3',
    category: 'Campus Life',
    title: 'Interactive Smart Classroom with Digital Projector',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQkfNwHzVgVZGL87EPlILWV8y-gt9Fnxt_FBO3IlBv9kLzKjt1dP-VXC1kds4HCO8QMaTC3NoHKysTHgUSDuGCUDhqAd9hlbfB-owfx8qbsYWCUsK1amuFnTRAujozXSzwNZKh2VD57dnxkWn2dl12zJ0dbK8c93Vqj5lbd6JsWBlXG_IgnaGv5TAu5HO3el9P9843YNruF6Y13KBLDBaAFFVzdINZGRiDnbt91lJeqWPw08knLf72RhdOolcPKERcrip2aTw-ITU'
  }
];

export const mockReviews = [
  {
    _id: 'mock-rev-1',
    studentName: 'Aryan Malhotra',
    courseName: 'DCA',
    rating: 5,
    reviewText: 'The DCA course completely transformed my career path. Outstanding faculty support, modern labs, and 100% practical training. I secured an office assistant role within a month of graduating!',
    studentPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBebdQjkBTW9p0eOFYDhaxpK94z3q6fE2VByeCeInta_TVRKEkJE1n4P3TrAv91r8R6rK2zDa8Nl3qNZiiCGOLIMVxp0TSRE1GEJ5yq6u7RcP-Njx4s7eeiDZIUYBpYlqWjtB22a75a8tNaOhJwLEf-EzIMPKxlEeoORDm4xNvkuKr17a1ny64rCdcNYUsmKpR6SMx2vYYrearo5KcBYfkgIDwMKLMU4RqP2mkwrcIb3Uzafd_CCBgyIKC78INcnbAuZeQ4XWFsogQJ'
  },
  {
    _id: 'mock-rev-2',
    studentName: 'Siddharth Sen',
    courseName: 'Tally Prime',
    rating: 5,
    reviewText: 'Excellent environment for learning computer accounting and GST filing. CA Vikram sir explains complex tax concepts in simple words. Now handling accounts at a renowned retail chain.',
    studentPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_t9b4Lfyy5-6mDyJxuWQ7whBtWC__L4fG0pbE1CJ0Zb2fDBHDi-IAlQ2Zfj3stuHHqid_AQxJv-Uz1SZHEmk4kdifKczCcp4ESsSiLkrr0F4MalixYSWAM1EOv6GqYdmsBgyN0bxWGxSx81_U-kuV2tX12_EUGEfmkx0cmZym43bV1Lq-RHvgVl3iiGJd2DxY_1Fkhf8_9JX6frPxHIZE_U5B9zKx6aZSFl6Y_v6BdlDKOyFW8DxNENFJje2cObvivstwyb_4FcVZ'
  },
  {
    _id: 'mock-rev-3',
    studentName: 'Priya Sharma',
    courseName: 'Full Stack Web Dev',
    rating: 5,
    reviewText: 'Dr. Sarah Jenkins is an incredible mentor. The hands-on project building in React and Node.js helped me build a portfolio that landed me a full-time software developer position at TCS!',
    studentPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqBjlainYHAmXTl_orlM-w6e3fKDILxrWPrFqWAfDXc51PmObb6MKxjaSnV-wrA6hEFiUZIDqlD3JhXcXaYGrL3MisIm2Tymb8wwVstzc8pdaJ7hl7yvN--rnMuB71pvn9bj_KHUaCGtr9dFp6T-j43FxpHGKDLbqbcS631W5t5D1u2rrG4vV9y5CLONCCyMMhEvScDPr2lvqqEIhOzDkt18jBim6csOSAQrM6ZyBqFL8_jrsJDU5gd59fNJo6it3FPY0m2H9by2ZB'
  },
  {
    _id: 'mock-rev-4',
    studentName: 'Manpreet Singh',
    courseName: 'Python for Data Science',
    rating: 5,
    reviewText: 'Before joining, I was terrified of coding. The teachers start from the absolute ground level and progress to advanced machine learning algorithms. The lab facilities are top-notch.',
    studentPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Gh2GzZoAqcDBJAkfriIGdM0VgXE_pAbhIVKtIqXHgBDTr5hm7zj1TqKZTRFPTfKTGWANQgFpEBey4ZwHwcmoY9jebsly5YVXlUHTEoArN_up6rhSTbgvWUHrD_GPIIDUaImEh76CvrzQLBA-nWQTUuckdl232GvtaJktxMxKymG3jrJ_CfQfbhP_FXcQ2KRAk31m-Vq7YTma12OXkhGXnbXU-DkPAE5nrmAibofkHrWj6wKwv5fm1EONM02vYvLUHaB42YoD91Av'
  },
  {
    _id: 'mock-rev-5',
    studentName: 'Simran Kaur',
    courseName: 'UI/UX Design',
    rating: 5,
    reviewText: 'Figma and design systems were taught with real-world case studies. Elena maam reviewed every wireframe and gave personal feedback. I am now working remotely with an agency in Bangalore.',
    studentPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH'
  },
  {
    _id: 'mock-rev-6',
    studentName: 'Rohan Verma',
    courseName: 'PGDCA',
    rating: 5,
    reviewText: 'The 1-year PGDCA course is comprehensive and recognized for government exams. The faculty is very cooperative and provided extra lab hours whenever required.',
    studentPhoto: ''
  },
  {
    _id: 'mock-rev-7',
    studentName: 'Neha Gupta',
    courseName: 'MS Office & Excel',
    rating: 5,
    reviewText: 'Advanced Excel formulas, VLOOKUP, XLOOKUP, and Pivot Tables were covered in high detail. It helped me clear my banking clerical typing test with flying colors.',
    studentPhoto: ''
  },
  {
    _id: 'mock-rev-8',
    studentName: 'Gurpreet Singh',
    courseName: 'English & Hindi Typing',
    rating: 5,
    reviewText: 'Achieved 48 WPM typing speed with 98% accuracy in just 2 months. The specialized software and tutor guidance make all the difference. Highly recommended institute!',
    studentPhoto: ''
  }
];

export const mockSuccessStories = [
  {
    _id: 'mock-story-1',
    studentName: 'Meera Rajput',
    title: "Meera's Journey: From Beginner to Frontend Engineer",
    description: 'Meera successfully transitioned from a beginner to a professional Front-End Developer within 6 months. Her dedication to learning React and responsive design landed her a job at a top tech company.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_JxcCJ-xe5iuCZ70T2x_T5X4cb1OVvyY0HfKvaqhbULj0IuvvL8vos3U2YbUmxMKWn4jnzIAAYpoxx0K2Rmua9W_5lNHLQWRD_fJmd24a66anjuZsNYYMtysTiAa81VbqRKLMzyVLeqX7hf00bAWYF3X_URQbW8MjOMrlshd5AmwfVeyRRVQaOdv_O-VNjey2MtSe99DHxRrRxvmqr_MQhNuM3r4-UB33sEwFT6GIqqIUrVJrCnuUX_YEXq36MUndv0mrof59ln8',
    status: true
  },
  {
    _id: 'mock-story-2',
    studentName: 'Rohan Bhatia',
    title: "How Tally Prime & GST Transformed Rohan's Career",
    description: 'Rohan learned computerized accounting and automated GST filing at Laxmi Computer Education. Within 3 months, he secured an accounts officer position at a leading audit firm in Chandigarh.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASL3fk9lmwNiVkfq34gf40ohrCuWk_pXtzvxrUKDMhRMDLdH9vB7gsYugT-ZxxTILxtM4dJgu4zM13-987jlCz-cV_4kXnOXn-FikaDaZ-EEyzH4D4uq13YM01M-XazIHWO3REglHnzZE-UzSK7akqRw_BDHs7c9qN1MbXnCb6tyFymuLg67L7WPJNV4ODgpWn3_TG11GbCxPqEFCrhMSLQNICiz2OwHE67t_F-lfArm5Il1yOFwIIqrg7zmMRyCOGGWpN4cNF2uts',
    status: true
  },
  {
    _id: 'mock-story-3',
    studentName: 'Karan Mehra',
    title: 'From Non-IT Background to Data Analyst at TechCorp',
    description: 'Karan mastered Python data libraries, SQL queries, and PowerBI dashboards. Hear his personal story on clearing multi-round technical interviews.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTic1EKcXTeKNPywy9-CUDGH9vtqzkRiBM_cNSNFEXnO3NUDxI453Gk50gqGVr2Rnxi_FJfBZatPmpBYu-FQLIRPcfktuoVc2_S-53CsVZRTjRife5KohovQVBlSpxJfKwO0rflJ_lO7opgiUTzrN1przo70s1qkmlRXmvQ3me0-iAMXHDKZLGffmk_ecFieUGf3X-m-r4t5A9Fd3p27lZBuQ1LQMt3IFDxntnvuQMcVCZR1XY-Dgs4funetXQU167ne6S9Zdmq2yS',
    status: true
  },
  {
    _id: 'mock-story-4',
    studentName: 'Pooja Verma',
    title: 'How DCA Helped Pooja Crack the Government Clerk Exam',
    description: 'Pooja shares how typing speed coaching and government-recognized diploma certification at Laxmi Institute helped her secure Rank #4 in the state selection exam.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ',
    status: true
  }
];

export const mockResults = [
  {
    _id: 'mock-res-1',
    studentName: 'Liam Henderson',
    courseName: 'DCA - Diploma in Computer Applications',
    examName: 'Annual Examination 2024',
    percentage: 98.6,
    grade: 'A+'
  },
  {
    _id: 'mock-res-2',
    studentName: 'Sophia Martinez',
    courseName: 'Tally Prime with GST',
    examName: 'Professional Certification 2024',
    percentage: 97.4,
    grade: 'A+'
  },
  {
    _id: 'mock-res-3',
    studentName: 'Amanpreet Singh',
    courseName: 'Full Stack Web Development',
    examName: 'Capstone Project Evaluation 2024',
    percentage: 96.8,
    grade: 'A+'
  },
  {
    _id: 'mock-res-4',
    studentName: 'Divya Sharma',
    courseName: 'PGDCA',
    examName: 'State Board Assessment 2024',
    percentage: 95.5,
    grade: 'A+'
  },
  {
    _id: 'mock-res-5',
    studentName: 'Harpreet Kaur',
    courseName: 'Python for AI & Data Science',
    examName: 'Algorithm & Machine Learning Term',
    percentage: 94.8,
    grade: 'A'
  },
  {
    _id: 'mock-res-6',
    studentName: 'Rajat Bhardwaj',
    courseName: 'English & Hindi Speed Typing',
    examName: 'National Typing Speed Challenge',
    percentage: 94.2,
    grade: 'A'
  },
  {
    _id: 'mock-res-7',
    studentName: 'Anjali Verma',
    courseName: 'Advanced Excel & MIS Reporting',
    examName: 'Corporate Analytics Exam',
    percentage: 93.5,
    grade: 'A'
  },
  {
    _id: 'mock-res-8',
    studentName: 'Sahil Kapoor',
    courseName: 'UI/UX Design & Figma',
    examName: 'Design Portfolio Jury Review',
    percentage: 92.8,
    grade: 'A'
  }
];

export const mockPlacements = [
  {
    id: 1,
    name: 'Kiran Gupta',
    company: 'Google',
    role: 'Associate Software Engineer',
    package: '12.5 LPA',
    quote: '"The hands-on training at LAXMI changed my perspective on coding. I went from a beginner to a confident developer in just 6 months. Truly life-changing!"',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3j812z3y2QdcdfhKmpVvPpvb0pgv6EHPScLLt003Yzcet_nLhqGTBIC_v0Fk9011RDHVmJOMyL-dEcdHev4IgGWOZgmrm8nHTxhrePqMp__gbmZ9lB-bEOleYMp8lFkNkrQTq3-2ztS0lrv3Qr61zGiERaGP87DCEnBH5eTvZ2wQJanrdXCR_nf6WtBkg1KA-wCbOgO-mupc3vCJQjGbNXPxxJUvXuwzlMNezuDb4O_FK4IwxHlo30jTN5wdXJMmDc4eDVdYhAmsE'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    company: 'Microsoft',
    role: 'Cloud Operations Analyst',
    package: '10.2 LPA',
    quote: '"Laxmi Education doesn\'t just teach syntax; they teach problem-solving. The placement cell helped me land my dream job at my first interview."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRRMHvhfG9ZBiY-9hTf8eOKFUXF6l2MYXfsA9l9C6l5fX9K4R7Zcps9QQmfcVU-WgdB2L2RTLkezTxhGCnxWblgmIFANVnQLJJICfHNJuSCH7Uo_sOK02Ijbpyy-1C2jYi5bCU_WAoHhI5-bmE6-aVrB29D5F_4tJZVvYpy9O5hjQyNQ-G_fJGfKGEHe7QbGowmmCCp-220KdVZZ7haXB68pl67K-DxqAyfmnbp4u4CRECIejOEllaefbmHz8E2Eiy9k0Xq0sf_mv'
  },
  {
    id: 3,
    name: 'Riya Sen',
    company: 'Amazon',
    role: 'Data Quality Specialist',
    package: '9.0 LPA',
    quote: '"The curriculum is exactly what the industry demands. The mentors are patient and highly knowledgeable. Best decision for my career!"',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHQwyplE8esTKElf9LejsdlFmeSmSU4FsvTUfsvHANlI5cVDZvVPZGS900zQK3WdrIsTHCJpukkW_6pWseBdjurncARv4o5RlGsZEv1hbOwIsgf3AV8f6rPhFL-y8Q8WncvaLgeypsRrcFLo0mmOKBCQyb93AIL85iP02jmn-un0dXq6C5tEqmHnrb3Kg-0gO7v2l8xi2HMPK1oFPRiYtAkoEvOZaYupyh6W3lmlWxCQycS83kijTUHU21cqEZQKfePye8gyS26ifO'
  },
  {
    id: 4,
    name: 'Gaurav Gill',
    company: 'TCS (Tata Consultancy Services)',
    role: 'System Engineer',
    package: '7.2 LPA',
    quote: '"The mock interviews, technical lab assessments, and aptitude sessions gave me the confidence to easily clear the TCS National Qualifier Test."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Gh2GzZoAqcDBJAkfriIGdM0VgXE_pAbhIVKtIqXHgBDTr5hm7zj1TqKZTRFPTfKTGWANQgFpEBey4ZwHwcmoY9jebsly5YVXlUHTEoArN_up6rhSTbgvWUHrD_GPIIDUaImEh76CvrzQLBA-nWQTUuckdl232GvtaJktxMxKymG3jrJ_CfQfbhP_FXcQ2KRAk31m-Vq7YTma12OXkhGXnbXU-DkPAE5nrmAibofkHrWj6wKwv5fm1EONM02vYvLUHaB42YoD91Av'
  },
  {
    id: 5,
    name: 'Sneha Chhabra',
    company: 'Wipro Technologies',
    role: 'Project Engineer',
    package: '6.5 LPA',
    quote: '"Practical project assignments in Web Technologies and Java helped me demonstrate live working software in my technical round."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH'
  },
  {
    id: 6,
    name: 'Tarun Walia',
    company: 'Infosys',
    role: 'Operations Executive',
    package: '5.8 LPA',
    quote: '"From computer fundamentals to complex accounting and database queries, Laxmi Education prepared me thoroughly for corporate life."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBebdQjkBTW9p0eOFYDhaxpK94z3q6fE2VByeCeInta_TVRKEkJE1n4P3TrAv91r8R6rK2zDa8Nl3qNZiiCGOLIMVxp0TSRE1GEJ5yq6u7RcP-Njx4s7eeiDZIUYBpYlqWjtB22a75a8tNaOhJwLEf-EzIMPKxlEeoORDm4xNvkuKr17a1ny64rCdcNYUsmKpR6SMx2vYYrearo5KcBYfkgIDwMKLMU4RqP2mkwrcIb3Uzafd_CCBgyIKC78INcnbAuZeQ4XWFsogQJ'
  }
];
