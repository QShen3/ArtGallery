const express = require("express");
const codeDesc = require("../codeDesc.js");
const User = require("../db.js").user;

const router = express.Router();

const gender = ["male", "female", "unknown"];

router.post("/register", async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.email == undefined || req.body.email == null || req.body.email == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }
    if (req.body.pwd == undefined || req.body.pwd == null || req.body.pwd == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }
    if (req.body.name == undefined || req.body.name == null || req.body.name == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }

    let emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!emailreg.test(req.body.email)) {
        result.resultInfo.code = 400;
        result.resultInfo.desc = codeDec(400);

        res.status(400).jsonp(result);
        return;
    }

    if (req.body.avatar == undefined || req.body.avatar == null || req.body.avatar == "") {
        req.body.avatar = "http://xxx/default/avatar.jpg";
    }
    else if (req.body.avatar.match("http://res.qnime.com") == null) {
        req.body.avatar = "http:/xxx/default/avatar.jpg";
    }
    if (req.body.gender == undefined || req.body.gender == null || req.body.gender == "") {
        req.body.gender = "unknown";
    }
    else if (gender.indexOf(req.body.gender) < 0) {
        req.body.gender = "unknown";
    }

    let user = new User();

});

router.post("/login", async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.id == undefined || req.body.id == null || req.body.id == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }
});

module.exports = router;