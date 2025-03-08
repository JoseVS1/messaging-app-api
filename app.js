const express = require("express");
const apiRouter = require("./routes/apiRoutes");
const passport = require("passport");
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

const PORT = process.env.PORT || 3000;

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})