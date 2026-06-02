import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import FloatingActions from '../components/common/FloatingActions';
import Footer from '../components/footer/Footer';

function MainLayout() {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      <Navbar />
      <FloatingActions />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
