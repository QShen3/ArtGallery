const express = require("express");
const codeDesc = require("../codeDesc.js");
const multer = require("multer");
const User = require("../db.js").user;
const userAuth = require("../auth.js").userAuth;

const router = express.Router();

const gender = ["male", "female", "unknown"];

router.post("/register", multer().single(), async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.email == undefined || req.body.email == null || req.body.email == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.pwd == undefined || req.body.pwd == null || req.body.pwd == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.name == undefined || req.body.name == null || req.body.name == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.galleryName == undefined || req.body.galleryName == null || req.body.galleryName == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!emailreg.test(req.body.email)) {
        result.info.code = 400;
        result.info.desc = codeDec(400);

        res.status(400).jsonp(result);
        return;
    }

    if (req.body.avatar == undefined || req.body.avatar == null || req.body.avatar == "") {
        req.body.avatar = "http://xxx/default/avatar.jpg";
    }
    /*else if (req.body.avatar.match("http://res.qnime.com") == null) {
        req.body.avatar = "http:/xxx/default/avatar.jpg";
    }*/
    if (req.body.gender == undefined || req.body.gender == null || req.body.gender == "") {
        req.body.gender = "unknown";
    }
    else if (gender.indexOf(req.body.gender) < 0) {
        req.body.gender = "unknown";
    }
    if (req.body.age == undefined || req.body.age == null || req.body.age == "") {
        req.body.age = -1;
    }

    let user = new User();
    user.email = req.body.email;
    user.info.name = req.body.name;
    user.info.galleryName = req.body.galleryName;
    user.info.avatar = req.body.avatar;
    user.info.gender = req.body.gender;
    user.info.age = parseInt(req.body.age);
    user.auth.pwd = req.body.pwd;

    try {
        user = await user.save();
    }
    catch (err) {
        result.info.code = 500;
        result.info.desc = codeDec(500);

        res.status(500).jsonp(result);
        return;
    }

    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
});

router.post("/login", multer().single(), async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.email == undefined || req.body.email == null || req.body.email == "") {
        result.info.code = 405;
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.pwd == undefined || req.body.pwd == null || req.body.pwd == "") {
        result.info.code = 405;
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let user = await User.findOne({ email: req.body.email });

    if (user == null) {
        result.info.code = 401;
        result.info.desc = codeDesc(401);

        res.status(405).json(result);
        return;
    }

    if (user.auth.pwd != req.body.pwd) {
        result.info.code = 401;
        result.info.desc = codeDesc(401);

        res.status(405).json(result);
        return;
    }
    user.auth.authToken = randomString();
    user.auth.authDate = new Date();

    try {
        user = await user.save();
    }
    catch (err) {
        result.info.code = 500;
        result.info.desc = codeDec(500);

        res.status(500).jsonp(result);
        return;
    }

    result.info.code = 200;
    result.info.desc = codeDesc(200);
    res.cookie("authToken", user.auth.authToken, { maxAge: 2592000000 });
    res.cookie("email", user.email, { maxAge: 2592000000 })
    res.status(200).jsonp(result);

});

router.get("/info", userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    result._id = req.user._id;
    result.userInfo = req.user.info;
    result.info.code = 200;
    result.info.desc = codeDesc(200);
    res.status(200).jsonp(result);
});

router.post("/update", multer().single(), userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    let user = req.user;

    if (req.body.name) {
        user.info.name = req.body.name;
    }
    if (req.body.galleryName) {
        user.info.galleryName = req.body.galleryName;
    }
    if (req.body.avatar) {
        user.info.avatar = req.body.avatar;
    }
    if (req.body.gender) {
        if (gender.indexOf(req.body.gender) < 0) {
            user.info.gender = "unknown";
        }
        else {
            user.info.gender = req.body.gender;
        }
    }
    if (req.body.age) {
        user.info.age = parseInt(req.body.age);
    }

    user.updateDate = new Date();
    try {
        user = await user.save();
    }
    catch (err) {
        result.info.code = 500;
        result.info.desc = codeDec(500);

        res.status(500).jsonp(result);
        return;
    }

    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
});

router.get("/recent", userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    let user = User.findOne({ email: req.cookies.email }).select("recent").populate("recent", "_id email info").exec();

    result.recent = user.recent;
    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
})

function randomString(len) {
    len = len || 32;
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678';
    let maxPos = chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

module.exports = router;