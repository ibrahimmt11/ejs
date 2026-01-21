const userService = require("../services/user.service.js");

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      message: "User berhasil didaftarkan!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.status(200).json({
      status: "Success",
      message: "Login Berhasil",
      token: token,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ status: "Fail", message: error.message });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "admin",
    { expiresIn: 60 },
  );

  return { user, token };
};

module.exports = { register, login };
