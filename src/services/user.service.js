const { User } = require("../models");
const bcrypt = require("bcrypt");

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

module.exports = { registerUser };
