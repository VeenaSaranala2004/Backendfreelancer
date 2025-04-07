require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    dialectOptions: {
        ssl: {
            require: true, // Enable SSL if Railway requires it
            rejectUnauthorized: false,
        },
    },
});

sequelize
    .authenticate()
    .then(() => console.log("✅ Database connected"))
    .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
