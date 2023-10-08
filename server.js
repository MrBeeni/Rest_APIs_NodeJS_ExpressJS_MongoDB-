require("dotenv").config();
require("./config/db");
const express = require("express");
const user = require("./routes/userRoutes");
const post = require("./routes/postRoutes");

const app = express();
app.use(express.json());
const port = "4000";

app.use("/api", user);
app.use("/api", post);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
