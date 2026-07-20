import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RoleRoute({ allowedRoles = [] }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Prevent infinite redirect loops by routing users to their allowed portals
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
    if (user.role === 'student') return <Navigate to="/student" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
