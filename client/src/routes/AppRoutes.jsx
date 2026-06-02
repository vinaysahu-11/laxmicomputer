import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import StudentLayout from '../layouts/StudentLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Courses from '../pages/public/Courses';
import Faculty from '../pages/public/Faculty';
import Gallery from '../pages/public/Gallery';
import Reviews from '../pages/public/Reviews';
import Results from '../pages/public/Results';
import Admission from '../pages/public/Admission';
import Contact from '../pages/public/Contact';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin Dashboard Pages
import Dashboard from '../pages/admin/Dashboard';
import Students from '../pages/admin/Students';
import Teachers from '../pages/admin/Teachers';
import CoursesAdmin from '../pages/admin/Courses';
import Admissions from '../pages/admin/Admissions';
import Attendance from '../pages/admin/Attendance';
import ResultsAdmin from '../pages/admin/Results';
import Payments from '../pages/admin/Payments';
import GalleryAdmin from '../pages/admin/Gallery';
import ReviewsAdmin from '../pages/admin/Reviews';
import Notifications from '../pages/admin/Notifications';
import Settings from '../pages/admin/Settings';
import Profile from '../pages/admin/Profile';

// Student Portal Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentCourses from '../pages/student/MyCourses';
import StudentClasses from '../pages/student/Classes';
import StudentExams from '../pages/student/Exams';
import StudentAttendance from '../pages/student/Attendance';
import StudentResults from '../pages/student/Results';
import StudentCertificates from '../pages/student/Certificates';
import StudentPayments from '../pages/student/Payments';
import StudentNotifications from '../pages/student/Notifications';
import StudentProfile from '../pages/student/Profile';
import StudentSettings from '../pages/student/Settings';

// Teacher Portal Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherClasses from '../pages/teacher/MyClasses';
import TeacherStudents from '../pages/teacher/Students';
import TeacherAttendance from '../pages/teacher/Attendance';
import TeacherExams from '../pages/teacher/Exams';
import TeacherMaterials from '../pages/teacher/StudyMaterials';
import TeacherAssignments from '../pages/teacher/Assignments';
import TeacherResults from '../pages/teacher/Results';
import TeacherNotifications from '../pages/teacher/Notifications';
import TeacherProfile from '../pages/teacher/Profile';
import TeacherSettings from '../pages/teacher/Settings';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="results" element={<Results />} />
        <Route path="admission" element={<Admission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="courses" element={<CoursesAdmin />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="results" element={<ResultsAdmin />} />
        <Route path="payments" element={<Payments />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Teacher Panel Routes */}
      <Route path="teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="materials" element={<TeacherMaterials />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="results" element={<TeacherResults />} />
        <Route path="notifications" element={<TeacherNotifications />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* Student Panel Routes */}
      <Route path="student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="classes" element={<StudentClasses />} />
        <Route path="exams" element={<StudentExams />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="certificates" element={<StudentCertificates />} />
        <Route path="payments" element={<StudentPayments />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
