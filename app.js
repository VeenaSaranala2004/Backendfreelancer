require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const swaggerDocs = require("./swagger");



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);
app.use("/api", messageRoutes);
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
