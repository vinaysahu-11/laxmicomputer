const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Placeholder for role-based authorization logic
    void allowedRoles;
    next();
  };
};

module.exports = { authorizeRoles };
