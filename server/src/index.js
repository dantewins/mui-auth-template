const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const corsOptions = require("./Configs/corsOptions");
const connectDB = require("./Configs/dbConn");

const { logger, logEvents } = require("./Middleware/logger");
const errorHandler = require("./Middleware/errorHandler");

const authRoutes = require("./Routes/authRoutes");

require("dotenv").config();

const app = express();
const PORT = 3001;

connectDB();

app.set('trust proxy', 1);
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: 'auto'
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "sessions",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 1
    })
}));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log("Loaded database!");
    app.listen(PORT, () => {
        console.log(`Server initialized on port: http://localhost:${PORT}`);
    });
})

mongoose.connection.on("error", err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
})

