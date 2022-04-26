const router = require("express").Router();
const isAuth = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

// POST API /api/login
router.post("/login", userController.authUser);
router.post("/register", userController.registerUser);
