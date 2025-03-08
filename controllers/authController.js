const User = require("../models/prismaClient").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../models/prismaClient").profile;

const postSignup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const existingUser = await User.findMany({
            where: {
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            }
        });
    
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username or email already exists" });
        };
    
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        };
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await User.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const newProfile = await Profile.create({
            data: {
                userId: newUser.id,
            }
        })
    
        const payload = {
            sub: newUser.id,
            iat: Math.floor(Date.now() / 1000)
        };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" });
    }
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = {
            sub: user.id,
            iat: Math.floor(Date.now() / 1000)
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({
            success: true,
            user,
            token
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getLogout = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}

const getMe = async (req, res) => {
    try {
        const user = await User.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                profile: true
            }
        })

        res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    postSignup,
    postLogin,
    getLogout,
    getMe
}