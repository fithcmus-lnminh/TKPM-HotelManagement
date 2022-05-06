export const isManager = (req, res, next) => {
  if (req.user && req.user.role === "Manager") {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  }
};
