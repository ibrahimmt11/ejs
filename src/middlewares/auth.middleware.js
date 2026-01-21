const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "admin");
    req.user = verified;
    next();
  } catch (error) {
    // Cek apakah errornya karena expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "Fail",
        message: "Token sudah kadaluarsa, silakan login ulang",
      });
    }

    res.status(403).json({ message: "Token tidak valid" });
  }
};

module.exports = authMiddleware;
