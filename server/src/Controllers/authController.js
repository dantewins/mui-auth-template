const argon = require("argon2");
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto');
const asyncHandler = require("express-async-handler");

const Users = require("../Models/Users");
const Tokens = require("../Models/Tokens");
const Sessions = require("../Models/Sessions");

const utilController = require("./utilController");

const argonOpts = { type: argon.argon2id, hashLength: 40 };

const signup = asyncHandler(async (req, res) => {
    const { phoneNumber, contactName, email, password } = req.body;

    if (!phoneNumber || !contactName || !email || !password) {
        return res.status(400).json({ message: "All fields are required", status: "error" });
    }

    try {
        const hashedPassword = await argon.hash(password, argonOpts);
        const user = new Users({ contactName, phoneNumber, email, password: hashedPassword });
        await user.save();

        const secret = crypto.randomBytes(64).toString("hex");
        const token = new Tokens({ user_id: user._id, secret, usage: "verify_account" });
        await token.save();

        const sent = await utilController.sendEmail(email, "Verification link", `<a href="${process.env.URL}/auth/verify?secret=${token.secret}">Verify now</a>`);
        if (!sent) {
            return res.status(500).json({ message: "Failed to send verification email", status: "error" });
        }

        return res.status(201).json({ message: "Verification email sent successfully", status: "success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Email is already registered", status: "error" });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", status: "error" });
    }

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        const matches = await argon.verify(user.password, password, argonOpts);
        if (!matches || !user.verified) {
            return res.status(401).json({ message: "Invalid credentials or account not verified", status: "error" });
        }

        req.session.regenerate((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Session regeneration failed", status: "error" });
            }
            const userData = { ...user.toObject(), password: undefined, __v: undefined };
            req.session.user = userData;

            // Send response with redirect URL
            res.status(200).json(userData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during login", status: "error" });
    }
});

const logout = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to logout", status: "error" });
        }
        res.status(200).json({ message: "Successfully logged out", status: "success" });
    });
});

const getCurrentUser = (req, res) => {
    if (!req.session.user) return res.status(403).json(null);

    return res.json(req.session.user);
};

const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(406).send({ message: "One or more fields are empty", status: "error" });

        let user = await Users.findOne({ email });
        if (!user) return res.status(400).send({ message: "No account is linked with this email", status: "error" });

        let token = await Tokens.findOne({ user_id: user._id, usage: "reset_password" });
        if (token) return res.status(400).send({ message: "An email has already been sent", status: "error" });

        token = await new Tokens({
            user_id: user._id,
            secret: crypto.randomBytes(64).toString("hex"),
            usage: "reset_password"
        }).save();

        const compiledTemplate = await ejs.renderFile(path.join(__dirname, '../../public') + "/content.ejs", { name: user.username, companyName: process.env.COMPANY_NAME, link: `${process.env.URL}/auth/reset-password?secret=${token.secret}` });

        const sent = await utilController.sendEmail(email, "Reset Password Now!", compiledTemplate);
        if (!sent) return res.status(500).send({ message: "The email has failed to send", status: "error" });

        return res.status(201).send({ message: "An email has been sent with instructions to reset your password", status: "success" });
    } catch (err) {
        res.status(500).send({ message: "Something went wrong while trying to send you your email", status: "error" });

        console.log(err);
    }
});

const validateResetLink = asyncHandler(async (req, res) => {
    try {
        const { secret } = req.body;

        const token = await Tokens.findOne({ secret, usage: "reset_password" });

        if (!token) return res.status(401).send({ message: "Link has either expired or is invalid" });

        return res.sendStatus(203);
    } catch (err) {
        res.status(500).send({ message: "Something went wrong while trying to validate your reset password link", status: "error" });

        console.log(err);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { secret, password, cPassword } = req.body;

        const token = await Tokens.findOne({ secret, usage: "reset_password" });

        if (!secret || !password || !cPassword) return res.status(406).send({ message: "One or more fields are empty", status: "error" });
        if (password !== cPassword) return res.status(400).send({ message: "Passwords do not match", status: "error" });

        const user = await Users.findOne({ _id: token.user_id });
        if (!user) return res.status(401).send({ message: "The account connected to this link cannot be found" });

        await token.deleteOne();

        const timeDiff = user?.lastResetPassword ? user?.lastResetPassword.setHours(user?.lastResetPassword.getHours() + 24) - new Date() : -1;
        const oneHour = 60 * 60 * 1000;
        const oneMinute = 1000 * 60;
        if (timeDiff > 0) return res.status(400).send({ message: `You must wait another ${Math.floor(timeDiff / oneHour)} hours and ${Math.floor((timeDiff % oneHour) / oneMinute)} minutes to reset your password`, status: "error" });

        user.password = await argon.hash(password, argonOpts);
        user.lastResetPassword = new Date();

        await user.save();

        await Sessions.deleteMany({ 'session.user._id': user._id });

        return res.status(203).send({ message: "Your password has been resetted", status: "success" });
    } catch (err) {
        res.status(500).send({ message: "Something went wrong while trying to reset your password", status: "error" });

        console.log(err);
    }
});

const verify = asyncHandler(async (req, res) => {
    try {
        const { secret } = req.body;

        const token = await Tokens.findOne({ secret, usage: "verify_account" });

        if (!token) return res.status(401).send({ message: "Link has either expired or is invalid" });

        const user = await Users.findOne({ _id: token.user_id });

        user.verified = true;
        user.verifiedAt = new Date();

        await user.save();

        await token.deleteOne();

        return res.status(203).send({ message: "Your account has successfully been verified", status: "success" });
    } catch (err) {
        res.status(500).send({ message: "Something went wrong while trying to verify your account", status: "error" });

        console.log(err);
    }
});

module.exports = {
    signup,
    login,
    logout,
    getCurrentUser,
    verify,
    forgotPassword,
    validateResetLink,
    resetPassword
};