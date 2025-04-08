require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    logging: console.log, // ✅ Log SQL queries
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // ✅ Required if using cloud DB like Railway
        },
    },
});

sequelize.authenticate()
    .then(() => console.log("✅ Database connected"))
    .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
