const {
    Schema,
    model
} = require('mongoose');

module.exports = model("users", new Schema({
    role: {
        type: String,
        default: "user"
    },
    contactName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    lastResetPassword: Date,
    verifiedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}));