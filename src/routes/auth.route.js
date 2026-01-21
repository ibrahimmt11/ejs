const {
  RegisterUser,
  LoginUser,
} = require("../controllers/auth.controller.js");

const authRoute = require("express").Router();

authRoute.post("/register", RegisterUser);
authRoute.post("/login", LoginUser);

module.exports = authRoute;
