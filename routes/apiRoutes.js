const { Router } =  require("express");
const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");
const messageRouter = require("../routes/messageRoutes");
const profileRouter = require("../routes/profileRoutes");

const apiRoutes = Router();

apiRoutes.use("/auth", authRouter);
apiRoutes.use("/users", userRouter);
apiRoutes.use("/messages", messageRouter);
apiRoutes.use("/profiles", profileRouter);

module.exports = apiRoutes;