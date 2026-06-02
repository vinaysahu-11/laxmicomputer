import { Navigate, Outlet } from 'react-router-dom';

function RoleRoute({ allowedRoles = [] }) {
  const userRole = 'admin'; // Placeholder for future role state

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
