const Message = require("../models/prismaClient").message;

const postCreateMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;

        const newMessage = await Message.create({
            data: {
                senderId: req.user.id,
                receiverId,
                content
            },
            include: {
                sender: {
                    include: {
                        profile: true
                    }
                }
            }
        });

        return res.status(201).json({ message: newMessage });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { senderId } = req.query;

        const messages = await Message.findMany({
            where: {
              OR: [
                { senderId: req.user.id, receiverId: senderId },
                { senderId: senderId, receiverId: req.user.id },
              ],
            },
            include: {
                sender: {
                    include: {
                        profile: true
                    }
                },
            }
          });

        return res.status(200).json({ messages });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    postCreateMessage,
    getMessages
}