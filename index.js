const express = require("express");
const authRoute = require("./src/routes/auth.route.js");
const { sequelize } = require("./src/models/index.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/auth", authRoute);

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Koneksi ke PostgreSQL berhasil tersambung!");
  } catch (error) {
    console.error("❌ Gagal menyambung ke database:", error);
  }
}

checkConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
