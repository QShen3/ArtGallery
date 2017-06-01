const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const Jimp = require("jimp");
const codeDesc = require("../../codeDesc.js");
const User = require("../../db.js").user;
const Art = require("../../db.js").art;
const userAuth = require("../../auth.js").userAuth;

const router = express.Router();

router.get("/", userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.query.page == undefined || req.query.page == null || req.query.page <= 0) {
        req.query.page = 1;
    }
    if (req.query.pagesize == null || req.query.pagesize == undefined || req.query.pagesize <= 0 || req.query.pagesize > 100) {
        req.query.pagesize = 15;
    }

    let user = await User.findOne({ email: req.cookies.email }).select("collections").populate("collections").exec();
    let count = user.collections.length;

    user.collections = user.collections.slice((parseInt(req.query.page) - 1) * parseInt(req.query.pagesize), (parseInt(req.query.page)) * parseInt(req.query.pagesize));

    for(let i = 0; i < user.collections.length; i++){
        let image = await Jimp.read(user.collections[i].cover);
        user.collections[i]._doc.width = image.bitmap.width;
        user.collections[i]._doc.height = image.bitmap.height;
    }

    result.collections = await Art.populate(user.collections, [{ path: "author", select: "_id email info.galleryName info.name info.avatar" }]);

    result.pager = {};
    result.pager.page = parseInt(req.query.page);
    result.pager.pagesize = parseInt(req.query.pagesize);
    result.pager.pagecount = Math.ceil(count / req.query.pagesize);
    result.pager.count = count;
    result.info.code = 200;
    result.info.desc = codeDesc(200);

    res.status(200).jsonp(result);
});

router.post("/add", userAuth, async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.aid == undefined || req.body.aid == null || req.body.aid == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let user = req.user;

    for (let i = 0; i < user.collections.length; i++) {
        if (user.collections[i].toString() == req.body.aid) {
            user.collections.splice(i, 1);
            user = await user.save();

            result.info.code = 200;
            result.info.desc = codeDesc(200);
            res.status(200).jsonp(result);

            return;
        }
    }
    user.collections.unshift(mongoose.Types.ObjectId(req.body.aid));

    user = await user.save();

    result.info.code = 200;
    result.info.desc = codeDesc(200);
    res.status(200).jsonp(result);
});


module.exports = router;