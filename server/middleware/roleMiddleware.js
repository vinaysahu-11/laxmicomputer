const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Not authorized, role missing' });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Access Denied. Required roles: [${allowedRoles.join(', ')}]. Current role: [${req.user.role}]` 
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
