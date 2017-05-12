const User = require("./db.js").user;

module.exports.userAuth = async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.cookies.auth == undefined || req.cookies.auth == null || req.cookies.auth == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.cookies.email == undefined || req.cookies.email == null || req.cookies.email == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    try{
        let user = User.findOne({email: req.cookies.email});
    }
    catch(err){
        result.info.code = 500;
        result.info.desc = codeDec(500);

        res.status(500).jsonp(result);
        return;
    }
    if (user == null) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).json(result);
        return;
    }
    if (user.auth.authToken != req.cookies.auth) {
        result.info.code = 403;
        result.info.desc = codeDesc(403);

        res.status(403).json(result);
        return;
    }
    req.user = user;
    next();
}