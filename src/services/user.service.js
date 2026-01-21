const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Simpan ke database melalui Model
  return await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });
};

const loginUser = async (email, password) => {
  // Cari user berdasarkan email (Model)
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email tidak terdaftar");

  // Bandingkan password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  // Jika cocok, buat token JWT (Gunakan JWT_SECRET dari Config)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { user, token };
};

module.exports = { registerUser, loginUser };
