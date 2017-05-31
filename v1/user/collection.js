const express = require("express");
const codeDesc = require("../../codeDesc.js");
const multer = require("multer");
const User = require("../../db.js").user;
const userAuth = require("../../auth.js").userAuth;

const router = express.Router();

router.get("/", userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    let user = User.findOne({ email: req.cookies.email }).select("collection").populate("collection").exec();

})

module.exports = router;