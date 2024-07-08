const express = require("express");
const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use("/api", require("./api"));
// app.use("/auth", require("./src/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
