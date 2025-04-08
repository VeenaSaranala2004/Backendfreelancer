const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const router = express.Router();

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Send a chat message
 *     description: Allows a user to send a message.
 *     tags:
 *       - Chat
 *     parameters:
 *       - in: body
 *         name: message
 *         schema:
 *           type: object
 *           required:
 *             - senderId
 *             - message
 *           properties:
 *             senderId:
 *               type: integer
 *               description: ID of the sender.
 *             message:
 *               type: string
 *               description: The chat message content.
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/send", sendMessage);

/**
 * @swagger
 * /chat/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all chat messages.
 *     tags:
 *       - Chat
 *     responses:
 *       200:
 *         description: A list of chat messages
 */
router.get("/messages", getMessages);

module.exports = router;
