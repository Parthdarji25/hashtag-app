require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = 3000;

// MongoDB connection (change if using Atlas)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
// app.use('/public', express.static('public'));
app.use(express.static("public"));
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
