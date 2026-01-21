const express = require("express");
const authRoute = require("./src/routes/auth.route.js");
const { sequelize } = require("./src/models/index.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
