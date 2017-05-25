const User = require("./db.js").user;
const codeDesc = require("./codeDesc.js");

module.exports.userAuth = async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.cookies.authToken == undefined || req.cookies.authToken == null || req.cookies.authToken == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).jsonp(result);
        return;
    }
    if (req.cookies.email == undefined || req.cookies.email == null || req.cookies.email == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).jsonp(result);
        return;
    }

    let user;
    try{
        user = await User.findOne({email: req.cookies.email}).exec();
    }
    catch(err){
        result.info.code = 500;
        result.info.desc = codeDesc(500);

        res.status(500).jsonp(result);
        return;
    }
    if (user == null) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).jsonp(result);
        return;
    }
    if (user.auth.authToken != req.cookies.authToken) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).jsonp(result);
        return;
    }
    req.user = user;
    next();
}