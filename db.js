const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://118.89.111.175/ArtGallery");

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
            galleryName: { type: String },
            avatar: { type: String },
            gender: { type: String, default: "unknown" },
            age: { type: Number }
        },
        collection: [
            { type: mongoose.Schema.Types.ObjectId, ref: "arts" }
        ],
        recent: [
            { type: mongoose.Schema.Types.ObjectId, ref: "users" }
        ],
        createDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: Date.now }
    }
);
const user = mongoose.model("user", userSchema);

const artSchema = new mongoose.Schema(
    {
        title: { type: String },
        profile: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        style: { type: String },
        cover: { type: String },
        urls: { type: [String] },
        createDate: { type: Date, default: Date.now }
    }
);
const art = mongoose.model("arts", artSchema);

module.exports.user = user;
module.exports.art = art;