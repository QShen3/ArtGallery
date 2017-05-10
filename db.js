const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ArtGallery");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        name: { type: String },
        auth: {
            authToken: { type: String },
            authDate: { type: Date }
        },
        info: {
            avatar: { type: String },
            gender: { type: String, default: "unknown" },
            birthday: { type: Date }
        },
        createDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now }
    }
);
const user = mongoose.model("user", userSchema);

module.exports.user = user;