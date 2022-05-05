export const isAdminOrManager = (req, res, next) => {
  if ((req.user && req.user.role === "User") || !req.user) {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  } else next();
};
