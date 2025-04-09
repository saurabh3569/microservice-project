require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { PORT } = require("./constant/env.constant");

const app = express();

connectDB();

app.use(express.json());

app.use("/users", require("./routes/user.routes"));

app.listen(PORT, () => {
  console.log(`🚀 User Service listening at http://localhost:${PORT}`);
});
