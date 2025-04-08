const ChatMessage = require("../models/chatModel");
const User = require("../models/userModel");

/**
 * Send a chat message
 */
const sendMessage = async (req, res) => {
  try {
    const { senderId, message } = req.body;

    if (!senderId || !message) {
      return res.status(400).json({ error: "Sender ID and message are required" });
    }

    const newMessage = await ChatMessage.create({ senderId, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Retrieve all chat messages
 */
const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.findAll({
      include: [{ model: User, attributes: ["username", "profilePicture"] }],
      order: [["timestamp", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    console.error("❌ Error retrieving messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
