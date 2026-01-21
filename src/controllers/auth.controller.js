export const RegisterUser = (req, res) => {
  const { username, email, password, fullname } = req.body;

  res.json({
    message: "Register user",
    data: { username, email, password, fullname },
  });
};

export const LoginUser = (req, res) => {
  res.json({
    message: "Login user",
  });
};
