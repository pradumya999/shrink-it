const urlModel = require("../models/url.model.js");

async function limiter(req, res, next){
    const cookie = req.headers.cookie.split("=", 2);
    if(cookie[0] === "auth-token") next();
    else{
        const anonID = cookie[1];

        const urls = await urlModel.find({
            anonID: anonID
        });

        if(urls.length >= 3){
            res.status(403).json({
                check: false,
                msg: "limit exceeded, kindly sign-up to shrink more links"
            });
        } else next();
    }
}

module.exports = limiter;