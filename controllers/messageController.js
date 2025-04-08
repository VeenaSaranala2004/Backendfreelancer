const Message = require("../models/messageModel");

// CREATE MESSAGE
exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message: "Message Sent", data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL MESSAGES
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MESSAGES BY SENDER ID
exports.getMessagesBySender = async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { senderId: req.params.senderId } });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Message Deleted" });
    } else {
      res.status(404).json({ message: "Message Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
