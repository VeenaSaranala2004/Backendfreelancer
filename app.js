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

// ✅ Sync database before starting the server
sequelize.sync({ force: false, logging: console.log }) // Logging SQL queries
    .then(() => {
        console.log("✅ Tables synced successfully.");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Error syncing tables:", err);
    });
