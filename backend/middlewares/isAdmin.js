export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  }
};
