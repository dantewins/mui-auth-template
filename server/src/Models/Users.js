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
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    businessName: String,
    shippingAddress1: String,
    shippingAddress2: String,
    shippingCity: String,
    shippingState: String,
    shippingZipCode: String,
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