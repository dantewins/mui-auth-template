const {
    Schema,
    model
} = require('mongoose');

module.exports = model("tokens", new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
        unique: true
    },
    secret: {
        type: String,
        unique: true,
        required: true
    },
    usage: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 900
    }
}));