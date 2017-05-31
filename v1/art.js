const express = require("express");
const codeDesc = require("../codeDesc.js");
const multer = require("multer");
const Art = require("../db.js").art
const userAuth = require("../auth.js").userAuth;

const router = express.Router();

router.get("/list", (req, res, next) => {
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
    ).limit(parseInt(req.query.pagesize)).sort("createDate").populate("art", "email info").exec();

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

router.post("/add", (req, res, next) => {
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
    if (req.body.urls == undefined || req.body.urls == null || req.body.urls == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let art = new Art();
})

module.exports = router;