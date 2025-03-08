const User = require("../models/prismaClient").user;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findMany({});

        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    getUser
}