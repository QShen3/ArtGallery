const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require("cookie-parser");


const user = require("./v1/user.js");
const res = require("./v1/res.js");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParse());

app.use("/", express.static("./"));

app.use("/v1/user", user);
app.use("/v1/res", res);

var server = app.listen(80, function () {
    
    var host = server.address().address
    var port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});