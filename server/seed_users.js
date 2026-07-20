const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Gallery = require('./models/Gallery');
const Album = require('./models/Album');
const Review = require('./models/Review');
const Result = require('./models/Result');
const Notification = require('./models/Notification');
const Payment = require('./models/Payment');
const Admission = require('./models/Admission');
const Settings = require('./models/Settings');
const Contact = require('./models/Contact');
const SuccessStory = require('./models/SuccessStory');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/institute-management-system';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // ====================
    // 1. SEED USER ACCOUNTS
    // ====================

    // Create admin
    const adminEmail = 'admin@laxmi.com';
    await User.deleteMany({ email: adminEmail });
    let admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: '1234567890',
      role: 'admin',
      studentId: '',
      teacherId: '',
      status: 'active'
    });
    console.log('Admin created successfully: admin@laxmi.com / 1234567890');

    // Clean up old student/teacher logs in User table to enforce role collections
    await User.deleteMany({ role: { $in: ['student', 'teacher'] } });
    console.log('Cleaned up legacy student/teacher records from Users collection.');

    // ====================
    // 2. SEED DEFAULT COURSES
    // ====================
    
    await Course.deleteMany({});
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      console.log('Course database is empty. Seeding default curriculum courses...');
      
      const defaultCourses = [
        {
          title: 'Basic Computer',
          description: 'Fundamental course covering operating systems, file management, and hardware basics for everyday digital tasks.',
          category: 'Diploma',
          mode: 'offline',
          price: 1500,
          duration: '3 Months',
          instructor: 'Prof. Rajesh Kumar',
          featured: true,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi',
          status: 'active'
        },
        {
          title: 'DCA',
          description: 'Diploma in Computer Applications covering core software suites, basic web technologies, and database concepts.',
          category: 'Diploma',
          mode: 'offline',
          price: 3500,
          duration: '6 Months',
          instructor: 'Prof. Rajesh Kumar',
          featured: true,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv',
          status: 'active'
        },
        {
          title: 'PGDCA',
          description: 'Advanced postgraduate diploma focusing on systems analysis, advanced programming, and professional IT management.',
          category: 'Diploma',
          mode: 'hybrid',
          price: 8000,
          duration: '1 Year',
          instructor: 'Prof. Rajesh Kumar',
          featured: true,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH',
          status: 'active'
        },
        {
          title: 'Tally Prime',
          description: 'Master computerized accounting, GST filing, payroll management, and inventory tracking using Tally Prime.',
          category: 'Accounting',
          mode: 'offline',
          price: 2500,
          duration: '3 Months',
          instructor: 'Dr. Sarah Jenkins',
          featured: true,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4N6840n2rJ_g2OGE2yxQtT_Y8jT7zMTTW3HCvm6LsOz2xcxStrwy95KONuYtGupeH5-vFQtvLRr_BZawHcrwToaohB5cxJhQxnuWKHIjwHGBXE3Pe-jCBahTF939u_ym_tI5XSRTEvu2L3VWqQRDMDVYoiELIa-ilpN4wNHAzD2PMdLSKg4x6mH0wcZ5gxHNJOz9UrOLOtq0-J0-1MGs-dwX9JB1hwlxR6fPmq_HTCDmaFK1CnjU9o26nZxC0m4FvgJWTgVbm5Th9',
          status: 'active'
        },
        {
          title: 'MS Office',
          description: 'Comprehensive training in Word, Excel, PowerPoint, and Outlook for professional productivity and documentation.',
          category: 'Diploma',
          mode: 'offline',
          price: 1200,
          duration: '2 Months',
          instructor: 'Dr. Sarah Jenkins',
          featured: false,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQkfNwHzVgVZGL87EPlILWV8y-gt9Fnxt_FBO3IlBv9kLzKjt1dP-VXC1kds4HCO8QMaTC3NoHKysTHgUSDuGCUDhqAd9hlbfB-owfx8qbsYWCUsK1amuFnTRAujozXSzwNZKh2VD57dnxkWn2dl12zJ0dbK8c93Vqj5lbd6JsWBlXG_IgnaGv5TAu5HO3el9P9843YNruF6Y13KBLDBaAFFVzdINZGRiDnbt91lJeqWPw08knLf72RhdOolcPKERcrip2aTw-ITU',
          status: 'active'
        },
        {
          title: 'English & Hindi Typing',
          description: 'Build exceptional speed and accuracy in both English and Hindi typing with our specialized software and tutors.',
          category: 'Diploma',
          mode: 'offline',
          price: 1000,
          duration: '1-3 Months',
          instructor: 'Mark Thompson',
          featured: false,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABo02Mx8fb3_Xmig4RV-OEI7MPyzPN9roi4sTvzk5GVH6x8S4x7B3dpujrSj31_c0pDxLUBIvpN1zKUCYbNFFmsC_4y41A4vnaMJKtxyCMJUsAWtMpyrD60C6qUFAi9EYI0NyAIGlmdQxi6R7HK1_Pw9lHnk583m09nwY3Yxxgr0sFsLZZcPCOrzYgvAzjSZXhXmz_bXiJJJbv7PdAMNdxpHOFq7YqL24z0t0cbMVpGjXB4E7ahJ-2GegjNwognIL4oifdEiC1H34L',
          status: 'active'
        },
        {
          title: 'Internet & Security',
          description: 'Learn effective web searching, email management, online safety, and how to use digital government services.',
          category: 'Diploma',
          mode: 'online',
          price: 800,
          duration: '1 Month',
          instructor: 'Elena Rodriguez',
          featured: false,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_xQJTyXrEjQ1WHVyfWl4w98R4BFC9KrOhUWZTuAM0bKaPbhbhhXgNZnhLX0D-HN6tJZUhchw_YswpuPj9fpzq9D-uNV9cK_oGuKzm7-kJhQjRMoCBUgKbitevPDiA3maV4TMWQ_7RjfJJXUUHJFb0LAeaxT0YOpR0D9Yi726jVBTrQtGZudM3z_lxvOB3-XU-uzosLZjXSKzQpLz2G-Vfz7sXGEJm5RmhztOg3b52x7s2P5WfEjKhfwWCmeugq19kCC8AXCz6MbXZ',
          status: 'active'
        },
        {
          title: 'Programming Basics',
          description: 'Introduction to logic, algorithms, and fundamental coding concepts using Python or C++ to kickstart your dev career.',
          category: 'Coding',
          mode: 'online',
          price: 3500,
          duration: '4 Months',
          instructor: 'Mark Thompson',
          featured: true,
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfVGQrnBDkybLOGtMG50XoM9-n_v-XAFJ7be_7vkWH_xaULvMLilfoFS-jEzAGGJ41M3cUcEcGxnA-ZyUo115yHSTuQP8Z6N8kFql7ZVxnAdY99iWA7sZyLzyNVvdo6a26jVl113mzpmF6DKBnngMAoiA8NsVjKXh_sTS3Bfd7hlym9GTKhybKW2S8jLJmfpje3qxudWz2gKAud9lS7BKNWVh7gLDogDUQ2lNOAY_TzmI0RbOcXpwvbogz6ap22kplXMFLJHO34EF',
          status: 'active'
        }
      ];

      for (const course of defaultCourses) {
        await Course.create(course);
      }
      console.log('Default curriculum courses seeded successfully!');
    } else {
      console.log('Courses database already has records');
    }

    // ====================
    // 3. SEED ALBUMS & GALLERY
    // ====================
    await Album.deleteMany({});
    await Gallery.deleteMany({});

    console.log('Seeding default albums...');
    const labsAlbum = await Album.create({
      name: 'Labs',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ'
    });
    
    const eventsAlbum = await Album.create({
      name: 'Events',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTic1EKcXTeKNPywy9-CUDGH9vtqzkRiBM_cNSNFEXnO3NUDxI453Gk50gqGVr2Rnxi_FJfBZatPmpBYu-FQLIRPcfktuoVc2_S-53CsVZRTjRife5KohovQVBlSpxJfKwO0rflJ_lO7opgiUTzrN1przo70s1qkmlRXmvQ3me0-iAMXHDKZLGffmk_ecFieUGf3X-m-r4t5A9Fd3p27lZBuQ1LQMt3IFDxntnvuQMcVCZR1XY-Dgs4funetXQU167ne6S9Zdmq2yS'
    });

    const campusAlbum = await Album.create({
      name: 'Campus',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwNtdsE8Lgdnwc5CX8zQkXO_D066ZLrPdlpE7fd4iDbQl1jfHiIWKh6o9GAjQKrRoCm5UQ_rHFCdHwW-UijrIjIi6-1VLAlkReDelfdz1ErGwTNjRTl-Gtxa3G22nSP-XcvpSCKmZJzSjZf47PHLAO1nz0wfgai_YAWSbgZMRL_ZgETacH3U14gc1K4Ds2bzxihpLd4A367EuFnDKWVkISCgftnXPvhcOQ0V_z8oCOtpdYEDVFVfnyg_448U6qW249Bax_B5BxleYx'
    });

    const sportsAlbum = await Album.create({
      name: 'Sports Meet',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi'
    });

    console.log('Albums seeded successfully. Seeding gallery items...');

    const defaultGallery = [
      {
        albumId: labsAlbum._id,
        title: 'Modern Computer Lab Session',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ'
      },
      {
        albumId: eventsAlbum._id,
        title: 'Web Dev Hackathon 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTic1EKcXTeKNPywy9-CUDGH9vtqzkRiBM_cNSNFEXnO3NUDxI453Gk50gqGVr2Rnxi_FJfBZatPmpBYu-FQLIRPcfktuoVc2_S-53CsVZRTjRife5KohovQVBlSpxJfKwO0rflJ_lO7opgiUTzrN1przo70s1qkmlRXmvQ3me0-iAMXHDKZLGffmk_ecFieUGf3X-m-r4t5A9Fd3p27lZBuQ1LQMt3IFDxntnvuQMcVCZR1XY-Dgs4funetXQU167ne6S9Zdmq2yS'
      },
      {
        albumId: campusAlbum._id,
        title: 'Main Campus Building',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwNtdsE8Lgdnwc5CX8zQkXO_D066ZLrPdlpE7fd4iDbQl1jfHiIWKh6o9GAjQKrRoCm5UQ_rHFCdHwW-UijrIjIi6-1VLAlkReDelfdz1ErGwTNjRTl-Gtxa3G22nSP-XcvpSCKmZJzSjZf47PHLAO1nz0wfgai_YAWSbgZMRL_ZgETacH3U14gc1K4Ds2bzxihpLd4A367EuFnDKWVkISCgftnXPvhcOQ0V_z8oCOtpdYEDVFVfnyg_448U6qW249Bax_B5BxleYx'
      }
    ];

    await Gallery.insertMany(defaultGallery);
    console.log('Gallery items seeded successfully!');

    // ====================
    // 4. SEED REVIEWS
    // ====================
    await Review.deleteMany({});
    const defaultReviews = [
      {
        studentName: 'Aryan Malhotra',
        reviewText: 'The DCA course completely transformed my career path. Outstanding faculty support and labs.',
        rating: 5,
        courseName: 'DCA',
        studentPhoto: '',
        status: 'Approved'
      },
      {
        studentName: 'Siddharth Sen',
        reviewText: 'Excellent environment for learning computer basics and accounting. Highly recommended.',
        rating: 5,
        courseName: 'Tally Prime',
        studentPhoto: '',
        status: 'Approved'
      }
    ];
    await Review.insertMany(defaultReviews);
    console.log('Reviews seeded successfully!');

    // ====================
    // 4b. SEED SUCCESS STORIES
    // ====================
    await SuccessStory.deleteMany({});
    const defaultSuccessStories = [
      {
        studentName: 'Meera',
        title: "Meera's Journey to Front-End Developer",
        description: 'Meera successfully transitioned from a beginner to a professional Front-End Developer within 6 months. Her dedication to learning React and responsive design landed her a job at a top tech company.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_JxcCJ-xe5iuCZ70T2x_T5X4cb1OVvyY0HfKvaqhbULj0IuvvL8vos3U2YbUmxMKWn4jnzIAAYpoxx0K2Rmua9W_5lNHLQWRD_fJmd24a66anjuZsNYYMtysTiAa81VbqRKLMzyVLeqX7hf00bAWYF3X_URQbW8MjOMrlshd5AmwfVeyRRVQaOdv_O-VNjey2MtSe99DHxRrRxvmqr_MQhNuM3r4-UB33sEwFT6GIqqIUrVJrCnuUX_YEXq36MUndv0mrof59ln8',
        status: true
      },
      {
        studentName: 'Rohan',
        title: "How Tally Transformed Rohan's Business",
        description: 'Rohan, a local business owner, learned Tally Prime to automate and manage his business accounts. This course helped him streamline his billing process and reduce tax filing errors.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASL3fk9lmwNiVkfq34gf40ohrCuWk_pXtzvxrUKDMhRMDLdH9vB7gsYugT-ZxxTILxtM4dJgu4zM13-987jlCz-cV_4kXnOXn-FikaDaZ-EEyzH4D4uq13YM01M-XazIHWO3REglHnzZE-UzSK7akqRw_BDHs7c9qN1MbXnCb6tyFymuLg67L7WPJNV4ODgpWn3_TG11GbCxPqEFCrhMSLQNICiz2OwHE67t_F-lfArm5Il1yOFwIIqrg7zmMRyCOGGWpN4cNF2uts',
        status: true
      }
    ];
    await SuccessStory.insertMany(defaultSuccessStories);
    console.log('Success stories seeded successfully!');

    // ====================
    // 5. SEED RESULTS
    // ====================
    await Result.deleteMany({});
    const defaultResults = [
      {
        studentName: 'Liam Henderson',
        courseName: 'Basic Computer',
        examName: 'Annual Term 2024',
        percentage: 98,
        grade: 'A+'
      },
      {
        studentName: 'Sophia Martinez',
        courseName: 'Tally Prime',
        examName: 'Certification Term 2024',
        percentage: 96,
        grade: 'A+'
      }
    ];
    await Result.insertMany(defaultResults);
    console.log('Results seeded successfully!');

    // ====================
    // 6. SEED NOTIFICATIONS
    // ====================
    await Notification.deleteMany({});
    const defaultNotifications = [
      {
        title: 'New Batch Enrollment Open',
        content: 'Enrollments are now open for the upcoming Java and Data Science classes starting next week.',
        category: 'all'
      },
      {
        title: 'Computer Lab Timings Extension',
        content: 'The central computer lab will remain open until 9:00 PM for project preparation.',
        category: 'student'
      }
    ];
    await Notification.insertMany(defaultNotifications);
    console.log('Notifications seeded successfully!');

    // ====================
    // 7. SEED PAYMENTS
    // ====================
    await Payment.deleteMany({});
    const defaultPayments = [
      {
        invoiceId: 'INV-8821',
        studentName: 'Jane Doe',
        course: 'Python Mastery',
        amount: 1200,
        status: 'Paid',
        date: 'Oct 24, 2026',
        dueDate: 'Nov 10, 2026'
      },
      {
        invoiceId: 'INV-8819',
        studentName: 'Michael Smith',
        course: 'DCA',
        amount: 950,
        status: 'Pending',
        date: 'Oct 23, 2026',
        dueDate: 'Nov 10, 2026'
      },
      {
        invoiceId: 'INV-8815',
        studentName: 'Alex Rivera',
        course: 'PGDCA',
        amount: 2400,
        status: 'Overdue',
        date: 'Oct 21, 2026',
        dueDate: 'Nov 05, 2026'
      },
      {
        invoiceId: 'INV-8810',
        studentName: 'Sarah Lee',
        course: 'MS Office',
        amount: 850,
        status: 'Paid',
        date: 'Oct 20, 2026',
        dueDate: 'Nov 01, 2026'
      }
    ];
    await Payment.insertMany(defaultPayments);
    console.log('Payments seeded successfully!');

    // ====================
    // 8. SEED ADMISSIONS
    // ====================
    await Admission.deleteMany({});
    const defaultAdmissions = [
      {
        studentName: 'Liam Henderson',
        email: 'liam.h@email.com',
        phone: '9876543210',
        course: 'Python for Data Science',
        batch: 'Jan 2024 (Weekend)',
        address: 'Sector 5, Mohali',
        message: 'Looking for scholarship details.',
        status: 'pending'
      },
      {
        studentName: 'Sarah Lee',
        email: 's.lee@email.com',
        phone: '9876543211',
        course: 'UI/UX Design',
        batch: 'Feb 2024 (Evening)',
        address: 'Drive-in Road, Ahmedabad',
        message: 'Interested in portfolio guidance.',
        status: 'pending'
      },
      {
        studentName: 'Michael Chen',
        email: 'm.chen@email.com',
        phone: '9876543212',
        course: 'Full Stack Web Dev',
        batch: 'Jan 2024 (Morning)',
        address: 'Gomti Nagar, Lucknow',
        message: 'I want to shift to backend later.',
        status: 'approved'
      },
      {
        studentName: 'Aria Montgomery',
        email: 'aria.m@email.com',
        phone: '9876543213',
        course: 'UI/UX Design',
        batch: 'Feb 2024 (Evening)',
        address: 'Andheri West, Mumbai',
        message: 'Prefers online mode.',
        status: 'rejected'
      }
    ];
    await Admission.insertMany(defaultAdmissions);
    console.log('Admissions seeded successfully!');

    // ====================
    // 9. SEED SETTINGS
    // ====================
    await Settings.deleteMany({});
    await Settings.create({
      academyName: 'EduAcademy Excellence',
      academyEmail: 'contact@eduacademy.com',
      academyAddress: '742 Evergreen Terrace, Tech Valley, CA 90210',
      academyPhone: '+1 (555) 123-4567',
      academyWebsite: 'www.eduacademy.com',
      darkMode: false,
      autoBackups: true,
      publicAccess: true
    });
    console.log('Settings seeded successfully!');

    // ====================
    // 10. SEED CONTACTS
    // ====================
    await Contact.deleteMany({});
    const defaultContacts = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Course Fee Inquiry',
        message: 'Hello, I want to know about the installment plan for DCA course.',
        status: 'unread'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Typing Batches',
        message: 'Are there any evening typing slots available for English typing?',
        status: 'read'
      }
    ];
    await Contact.insertMany(defaultContacts);
    console.log('Contacts seeded successfully!');

    // ====================
    // 11. SEED TEACHERS
    // ====================
    await Teacher.deleteMany({});
    const defaultTeachers = [
      {
        name: 'Dr. Sarah Jenkins',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c',
        qualification: 'MCA, Ph.D. in Computer Science',
        subject: 'Full Stack Web Dev',
        experience: '12 Years',
        bio: 'Senior Full Stack Architect and researcher. Dr. Jenkins has over a decade of industry experience designing robust cloud applications and teaching advanced frameworks.',
        email: 'teacher@laxmi.com',
        password: '1234567890',
        teacherId: 'TCH-2026-001',
        phone: '+91 98765 43211',
        socialLinks: {
          facebook: 'facebook.com/sarahjenkins',
          twitter: 'twitter.com/sarahjenkins',
          linkedin: 'linkedin.com/in/sarahjenkins'
        },
        status: true
      },
      {
        name: 'Mark Thompson',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCPsXZ6JwFWuVueUldHpWIO_8epWmYNAOTTM5wa6S_LG__Xwsms-Meq_guYhiGtlGHQ6lNRcU_5oD6KFlCWzKNpq08RuS3HguzvFNOLmE73tBo9Vgmi1pIyg5PhYYQVsxJxb-dEizVfYvVHBTwA8w78-IBvlTFUHYcvB7_cSAWMT_7MjtrxK-vVeq4oFEL3EoHHtMVFDq0rC2G_DNAb26x4zzwFmIIVF0z2qQkTihrpeAxeBCUAEUVS-hoCtdfZ7u4FW2eE-MuUKwP',
        qualification: 'M.Sc. in Statistics & Data Science',
        subject: 'Python for Data Science',
        experience: '8 Years',
        bio: 'Former senior data analyst at Techcorp. Mark specializes in Python data wrangling, machine learning, and AI model orchestration.',
        email: 'mark.t@laxmi.com',
        password: '1234567890',
        teacherId: 'TCH-2026-002',
        phone: '+91 98765 43212',
        socialLinks: {
          facebook: 'facebook.com/markthompson',
          twitter: 'twitter.com/markthompson',
          linkedin: 'linkedin.com/in/markthompson'
        },
        status: true
      },
      {
        name: 'Elena Rodriguez',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7pePi1rnWbPKD25SfoQGYU04C-sE4mXqijIJS-0htGqZ2NcMmgNmVmrl0V8OHOih7pYo7zuL3SFttVnNBMQuw1SDmuUVLy_NItm2Toe8gjk-bPVzjtyg2_7wvvPvh5JWL4iEqovIHksZ2M5KJBX5dxF_4OOlmKLVAAcgKeJ5a0ThV8gVdYScC-cMt3EPVBfR7LP7TRmcC_ZX-mvDZnhR-n9OjyQNJDmAl4wBxkB2eRSFSkO9Y-ASaPNwBgIMT37HvtJ4E4vOHQ6nd',
        qualification: 'BFA in Interactive Systems & UI Design',
        subject: 'UI/UX Design',
        experience: '6 Years',
        bio: 'Lead product designer specializing in modern Figma workflows, system guidelines, and user experience analysis.',
        email: 'elena.r@laxmi.com',
        password: '1234567890',
        teacherId: 'TCH-2026-003',
        phone: '+91 98765 43213',
        socialLinks: {
          facebook: 'facebook.com/elenarodriguez',
          twitter: 'twitter.com/elenarodriguez',
          linkedin: 'linkedin.com/in/elenarodriguez'
        },
        status: true
      }
    ];
    await Teacher.insertMany(defaultTeachers);
    console.log('Teachers seeded successfully!');

    // ====================
    // 12. SEED STUDENTS
    // ====================
    await Student.deleteMany({});
    const defaultStudents = [
      {
        name: 'Rahul Sharma',
        photo: '',
        rollNumber: 'STU-2026-001',
        studentId: 'STU-2026-001',
        course: 'Full Stack Web Dev',
        batch: 'Jan 2024 (Morning)',
        email: 'student@laxmi.com',
        password: '1234567890',
        phone: '+91 99999 88881',
        address: '102, Shanti Nagar, Sector 4, Mumbai, MH',
        joiningDate: new Date('2024-01-15'),
        status: true
      },
      {
        name: 'Priya Patel',
        photo: '',
        rollNumber: 'STU-2026-002',
        studentId: 'STU-2026-002',
        course: 'UI/UX Design',
        batch: 'Feb 2024 (Evening)',
        email: 'priya.patel@example.com',
        password: '1234567890',
        phone: '+91 99999 88882',
        address: '405, Orchid Residency, Drive In Road, Ahmedabad, GJ',
        joiningDate: new Date('2024-02-10'),
        status: true
      },
      {
        name: 'Vikram Singh',
        photo: '',
        rollNumber: 'STU-2026-003',
        studentId: 'STU-2026-003',
        course: 'Python for Data Science',
        batch: 'Jan 2024 (Weekend)',
        email: 'vikram.singh@example.com',
        password: '1234567890',
        phone: '+91 99999 88883',
        address: '12, Greenfield Enclave, Phase 2, Mohali, PB',
        joiningDate: new Date('2024-01-20'),
        status: true
      }
    ];
    const seededStudents = await Student.insertMany(defaultStudents);
    console.log('Students seeded successfully!');

    // ====================
    // 13. SEED ATTENDANCE RECORDS
    // ====================
    await Attendance.deleteMany({});
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const defaultAttendance = [
      // Today
      {
        studentId: seededStudents[0]._id, // Rahul Sharma
        course: seededStudents[0].course,
        batch: seededStudents[0].batch,
        date: today,
        status: 'Present'
      },
      {
        studentId: seededStudents[1]._id, // Priya Patel
        course: seededStudents[1].course,
        batch: seededStudents[1].batch,
        date: today,
        status: 'Present'
      },
      {
        studentId: seededStudents[2]._id, // Vikram Singh
        course: seededStudents[2].course,
        batch: seededStudents[2].batch,
        date: today,
        status: 'Absent'
      },
      // Yesterday
      {
        studentId: seededStudents[0]._id, // Rahul Sharma
        course: seededStudents[0].course,
        batch: seededStudents[0].batch,
        date: yesterday,
        status: 'Present'
      },
      {
        studentId: seededStudents[1]._id, // Priya Patel
        course: seededStudents[1].course,
        batch: seededStudents[1].batch,
        date: yesterday,
        status: 'Absent'
      },
      {
        studentId: seededStudents[2]._id, // Vikram Singh
        course: seededStudents[2].course,
        batch: seededStudents[2].batch,
        date: yesterday,
        status: 'Present'
      }
    ];

    await Attendance.insertMany(defaultAttendance);
    console.log('Attendance records seeded successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB. Seeding finished!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
