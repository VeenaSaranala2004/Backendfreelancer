const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "id",
    },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skills: {
    type: DataTypes.TEXT, // Store as a JSON string
    allowNull: true,
    get() {
      return this.getDataValue("skills") ? JSON.parse(this.getDataValue("skills")) : [];
    },
    set(value) {
      this.setDataValue("skills", JSON.stringify(value));
    },
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Profile table created"))
  .catch((err) => console.error("❌ Error creating Profile table:", err));

module.exports = Profile;
