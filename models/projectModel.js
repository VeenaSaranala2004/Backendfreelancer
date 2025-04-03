const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "in_progress", "completed"),
    defaultValue: "open",
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  freelancerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Project, { foreignKey: "clientId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "clientId" });

sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Project table created"))
  .catch((err) => console.error("❌ Error creating Project table:", err));

module.exports = Project;
