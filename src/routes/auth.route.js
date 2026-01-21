const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

// Public Routes (Bisa diakses siapa saja)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Routes (Hanya untuk yang punya Token)
// Tambahkan authMiddleware sebelum Controller
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Anda berhasil mengakses data sensitif!",
    userData: req.user, // Ini adalah data dari token (id, email)
  });
});

// Endpoint: POST /api/users/register
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
