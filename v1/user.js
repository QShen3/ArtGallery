const express =  require("express");
const codeDesc = require("../codeDesc.js");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    var result = {}
    result.info = {}

    if(req.body.id == undefined || req.body.id == null || req.body.id ==""){
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }


});

router.post("/login", async (req, res, next) => {
    var result = {}
    result.info = {}

    if(req.body.id == undefined || req.body.id == null || req.body.id ==""){
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
    }
});

module.exports = router;