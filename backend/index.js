const express = require("express");
const cors = require("cors");

const tagRoutes = require("./routes/tags");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use("/api", tagRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});