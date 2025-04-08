const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const ChatMessage = sequelize.define("ChatMessage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(ChatMessage, { foreignKey: "senderId", onDelete: "CASCADE" });
ChatMessage.belongsTo(User, { foreignKey: "senderId" });

sequelize
  .sync({ force: false })
  .then(() => console.log("✅ ChatMessage table created"))
  .catch((err) => console.error("❌ Error creating ChatMessage table:", err));

module.exports = ChatMessage;
