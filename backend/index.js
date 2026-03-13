const express = require("express");
const cors = require("cors");

const tagRoutes = require("./routes/tags");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

app.use("/api", tagRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});