const express = require("express");
const codeDesc = require("../codeDesc.js");
const COS = require("cos-nodejs-sdk-v5");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const cos = new COS({
    AppId: '1252071327',
    SecretId: 'AKIDER2hDhws8YXbBfAKrH65ovrxYcVfROdx',
    SecretKey: 'sWCnzuleuZXiIqF98ip82wE0SpHraK1R',
});

router.post("/upload", multer().single("file"), async (req, res, next) => {
    var result = {}
    result.info = {}

    if (req.body.name == undefined || req.body.name == null || req.body.name == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }
    if (req.file == undefined || req.file == null || req.file == "") {
        result.info.code = 405
        result.info.desc = codeDesc(405);

        res.status(405).json(result);
        return;
    }

    let tempName = randomString();
    fs.writeFileSync(tempName + ".temp", req.file.buffer);

    let data;
    try {
        data = await upload(req.body.name, "./" + tempName + ".temp");
    }
    catch (err) {
        console.log(err);
        result.info.code = 500
        result.info.desc = codeDesc(500);

        res.status(500).json(result);
        return;
    }

    result.url = data.Location;
    result.info.code = 200;
    result.info.desc = codeDesc(200);
    res.status(200).jsonp(result);

    fs.rmdir("./" + tempName + ".temp", (err, status) => {
        if(err){
            console.log(err);
        }
    });
});

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

function upload(name, file) {
    return new Promise((resolve, reject) => {
        cos.sliceUploadFile({
            Bucket: 'test',
            Region: 'cn-south',
            Key: name,
            FilePath: file
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
module.exports = router;