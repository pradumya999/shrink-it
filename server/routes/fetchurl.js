require("dotenv").config();
const express = require("express");
const userModel = require("../models/user.model.js");
const urlModel = require("../models/url.model.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/fetch", async function(req, res){
    const cookie = req.headers.cookie.split("=", 2);
    if(cookie[0] === "auth-token"){
        try{
            const username = await jwt.verify(cookie[1], process.env.JWT_SECRET);
            const user = await userModel.findOne({username: username});
            const urls = await urlModel.find(
                {userID: user._id},
                { originalURL: 1, urlkey: 1, clicks: 1, _id: 0 }
            );
            res.status(200).send(urls);
        } catch(e){
            res.status(404).json({
                check: false,
                msg: "user not found"
            });
        }
    } else{
        const anonID = cookie[1];
        try{
            const urls = await urlModel.find(
            {anonID: anonID},
            { originalURL: 1, urlkey: 1, clicks: 1, _id: 0 }
            );
            res.status(200).send(urls);
        } catch(e){
            res.status(404).json({
                check: false,
                msg: "database error"
            });
        }
    }
});

module.exports = router;