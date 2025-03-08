const Profile = require("../models/prismaClient").profile;
const User = require("../models/prismaClient").user;

const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await Profile.findUnique({
            where: {
                userId: id
            }
        });

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        };

        return res.status(200).json({ profile });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const putUpdateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { displayName, bio, avatarUrl } = req.body;

        const profile = await Profile.findUnique({
            where: {
                userId: id
            }
        });

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedProfile = await Profile.update({
            where: {
                userId: id
            },
            data: {
                displayName,
                bio,
                avatarUrl
            }
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getUserProfile,
    putUpdateUserProfile
}