const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://118.89.111.175/Gallery");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        auth: {
            pwd: { type: String },
            authToken: { type: String },
            authDate: { type: Date }
        },
        info: {
            name: { type: String },
            avatar: { type: String },
            gender: { type: String, default: "unknown" },
            age: { type: Number }
        },
        createDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now }
    }
);
const user = mongoose.model("user", userSchema);

module.exports.user = user;