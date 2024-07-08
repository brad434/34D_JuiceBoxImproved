const express = require("express");
const app = express();
const PORT = 3003;

const apiRouter = require("./src/api");
const authRouter = require("./src/auth/authRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
