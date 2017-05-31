const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const codeDesc = require("../codeDesc.js");

const Art = require("../db.js").art
const User = require("../db.js").user;
const userAuth = require("../auth.js").userAuth;

const router = express.Router();

router.get("/list", async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.query.uid == undefined || req.query.uid == null || req.query.uid == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.query.page == undefined || req.query.page == null || req.query.page <= 0) {
        req.query.page = 1;
    }
    if (req.query.pagesize == null || req.query.pagesize == undefined || req.query.pagesize <= 0 || req.query.pagesize > 100) {
        req.query.pagesize = 15;
    }

    let count = await Art.find({ author: mongoose.Types.ObjectId(req.query.uid) }).count().exec();
    let docs = await Art.find({ author: mongoose.Types.ObjectId(req.query.uid) }).skip(
        (parseInt(req.query.page) - 1) * req.query.pagesize
    ).limit(parseInt(req.query.pagesize)).sort("createDate").populate("author", "_id email info.galleryName info.name info.avatar").exec();

    result.info.code = 200;
    result.info.desc = codeDesc(200);

    result.pager = {};
    result.pager.page = parseInt(req.query.page);
    result.pager.pagesize = parseInt(req.query.pagesize);
    result.pager.pagecount = Math.ceil(count / req.query.pagesize);
    result.pager.count = count;
    result.lists = docs;

    res.status(200).jsonp(result);

    if (req.cookies.email) {
        let user = await User.findOne({ email: req.cookies.email }).exec();
        for (let i = 0; i < user.recent.length; i++) {
            if (user.recent[i].toString() == req.query.uid) {
                user.recent.splice(i, 1);
                break;
            }
        }
        user.recent.unshift(mongoose.Types.ObjectId(req.query.uid));
        if (user.recent.length > 20) {
            user.recent.splice(20, 1);
        }

        user = await user.save();
    }

});

router.post("/add", multer().single(), userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.title == undefined || req.body.title == null || req.body.title == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.profile == undefined || req.body.profile == null || req.body.profile == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.style == undefined || req.body.style == null || req.body.style == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.body.urls == undefined || req.body.urls == null || req.body.urls == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    let urls = req.body.urls.split(",");

    let art = new Art();

    art.title = req.body.title;
    art.profile = req.body.profile;
    art.style = req.body.style;
    //art.author = mongoose.Types.ObjectId(req.user._id);
    art.author = req.user._id;
    art.cover = urls[0];
    art.urls = urls;

    try {
        art = await art.save();
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

router.post("/delete", multer().single(), userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.id == undefined || req.body.id == null || req.body.id == "") {
        result.info.code = 405;
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let doc = await Art.findById(req.body.id);

    if (doc.author.toString() != req.user._id.toString()) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).json(result);
        return;
    }
    try {
        doc = await Art.findByIdAndRemove(req.body.id);
    }
    catch (err) {
        result.info.code = 405;
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
});

router.post("/update", multer().single(), userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.id == undefined || req.body.id == null || req.body.id == "") {
        result.info.code = 405;
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let doc = await Art.findById(req.body.id);

    if(doc == null){
        result.info.code = 400;
        result.info.desc = codeDesc(400);

        res.status(400).json(result);
        return;
    }

    if (doc.author.toString() != req.user._id.toString()) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).json(result);
        return;
    }

    if (req.body.title) {
        doc.title = req.body.title;
    }
    if (req.body.profile) {
        doc.profile = req.body.profile;
    }
    if (req.body.style) {
        doc.style = req.body.style;
    }
    if (req.body.urls) {
        doc.urls = req.body.urls.split(",");
        doc.cover = doc.urls[0];
    }

    try {
        doc = await doc.save();
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

router.get("/search", async (req, res, next) => {
    var result = {}
    result.info = {}

    let query = Art.find();

    if (req.query.page == undefined || req.query.page == null || req.query.page <= 0) {
        req.query.page = 1;
    }
    if (req.query.pagesize == null || req.query.pagesize == undefined || req.query.pagesize <= 0 || req.query.pagesize > 100) {
        req.query.pagesize = 15;
    }

    if (req.query.uid) {
        query = query.where({ author: mongoose.Types.ObjectId(req.query.uid) });
    }
    if (req.query.key) {
        query = query.or([{ title: new RegExp(req.query.key) }, { profile: new RegExp(req.query.key) }]);
    }
    if (req.query.style) {
        query = query.where({ style: new RegExp(req.query.style) });
    }

    let count = await query.count().exec();
    let docs = await query.find().skip(
        (parseInt(req.query.page) - 1) * req.query.pagesize
    ).limit(parseInt(req.query.pagesize)).populate("author", "_id email info.galleryName info.name info.avatar").exec();

    result.info.code = 200;
    result.info.desc = codeDesc(200);

    result.pager = {};
    result.pager.page = parseInt(req.query.page);
    result.pager.pagesize = parseInt(req.query.pagesize);
    result.pager.pagecount = Math.ceil(count / req.query.pagesize);
    result.pager.count = count;
    result.lists = docs;

    res.status(200).jsonp(result);
});

router.get("/latest", async (req, res, next) => {
    var result = {}
    result.info = {}

    let docs = await Art.find().sort("-createDate").limit(20).populate("author", "_id email info.galleryName info.name info.avatar").exec();

    result.lists = docs;
    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
});

module.exports = router;